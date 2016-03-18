angular.module('sayso')
    .factory('subtitlesService', [
        '$http', '$q', '$cacheFactory', '$log', 'SUBTITLES_URL',
        function($http, $q, $cacheFactory, $log, SUBTITLES_URL) {

            var cache = $cacheFactory('subtitlesService');

            /**
             * Wraps each word in subtitles, transcription and translation strings with &lt;span&gt;
             * that has a class corresponding to group name according to mapping
             *
             * @param {Array<String>} l array of subtitles, transcription and translation strings
             * @param {Array<Array<Array<Number>>>} m mapping between subtitles and translation
             * @returns {Array<String>} array of subtitles, transcription and translation strings
             */
            function markup(l, m) {
                var ll,
                    translation;

                ll = l.map(function(sentence) {
                    return sentence.split(/\s+/gim)
                });

                m.forEach(function(couple, group) {
                    couple[0].forEach(function(idx) {
                        translation = couple[1].reduce(function(arr, i) {
                            arr.push(ll[2][i]);
                            return arr;
                        }, []).join(' ');
                        [0, 1].forEach(function(i) {
                            ll[i][idx] = '<span class="group group' + group + '">' +
                                ll[i][idx] +
                                '<span class="show-on-hover">' + translation + '</span>' +
                                '</span>';
                        });
                    });
                    couple[1].forEach(function(idx) {
                        ll[2][idx] = '<span class="group' + group + '">' + ll[2][idx] + '</span>';
                    });
                });

                return ll.map(function(l) {
                    return l.join(' ');
                });
            }

            function loadSubtitles(youtubeId, language, translation) {
                var deferred = $q.defer();
                $http
                    .get(SUBTITLES_URL, {
                        params: {
                            youtubeId: youtubeId,
                            sourceLang: language,
                            targetLang: translation
                        }
                    })
                    .then(function(response) {
                        var data = response.data;
                        var subtitles = _.pluck(data, 'subtitles');

                        if (!subtitles || subtitles.length !== 1) {
                            console.log('subtitles not found');
                            return;
                        }

                        deferred.resolve(subtitles[0].text.map(function(block) {
                            return formatBlock(block);
                        }));
                    })
                    .catch(function(err) {
                        $log.error('Failed to load subtitles due to the following error: ' + err.message);
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function findByTime(data, time) {
                var value;
                return data && data.some(function(block) {
                        return block.t[0] <= time && time <= block.t[1] && (value = block);
                    }) && value;
            }

            function formatBlock(block) {
                var t = [block.from, block.to];
                var l = [block.source, block.transcript, block.target];
                var m = _.values(block.match);

                return {
                    t: t,
                    l: markup(l, m),
                    m: m
                };
            }

            function getSubtitles(youtubeId, language, translation, time) {
                var deferred = $q.defer();

                var cacheId = youtubeId + language + translation;
                var data = cache.get(cacheId);

                if (data && data.then) {
                    data.then(function(d) {
                        cache.put(cacheId, d);
                        deferred.resolve(findByTime(d, time));
                    }).catch(function(err) {
                        deferred.reject(err);
                    });
                } else if (data) {
                    deferred.resolve(findByTime(data, time));
                } else {
                    cache.put(cacheId, loadSubtitles(youtubeId, language, translation).then(function(d) {
                        cache.put(cacheId, d);
                        deferred.resolve(findByTime(d, time));
                    }));
                }

                return deferred.promise;
            }

            return {
                getSubtitles: getSubtitles
            };
        }
    ]);