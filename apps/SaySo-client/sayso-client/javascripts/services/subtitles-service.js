angular.module('sayso')
    .factory('subtitlesService', [
        '$http', '$q', '$cacheFactory', '$log', 'SUBTITLES_URL','appConfig',
        function($http, $q, $cacheFactory, $log, SUBTITLES_URL,appConfig) {

            var cache = $cacheFactory('subtitlesService');

            /**
             * Converts string "00:00:00,000 --> 00:01:05,123" to array of numbers [0, 65.123]
             *
             * @param {String} t string representation of time range
             * @returns {Array} array of numbers representing start time and end time
             */
            function time(t) {
                return t.replace(/,/g, '.').split(' --> ').map(function(time) {
                    return time
                        .split(':')
                        .reverse()
                        .reduce(function(previousValue, currentValue, index) {
                            return previousValue + (parseFloat(currentValue) * Math.pow(60, index));
                        }, 0);
                });
            }

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

            function loadSubtitles(query, language, translation) {
                var deferred = $q.defer();
                $http
                    .get(appConfig.basePath + SUBTITLES_URL + query)
                    .then(function(response) {
                        deferred.resolve(response.data.map(function(block) {
                            return formatBlock(block,language, translation);
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

            function formatBlock(block, language, translation) {
                var t, l, m, w;

                if (block.t && block.l && block.m) {
                    return {
                        t: time(block.t),
                        l: markup(block.l, block.m),
                        m: block.m
                    };
                } else if (Object.keys(block).length === 4 && block.couplings) {
                    t = Object.keys(block[language])[0];
                    l = [
                        block[language][t],
                        block[language + '_tr_' + translation][t],
                        block[translation][t]
                    ];
                    w = [l[0].replace(/[^\w\sא-ת]|_/g, '').split(/\s+/gm), l[2].replace(/[^\w\sא-ת]|_/g, '').split(/\s+/gm)];
                    m = block.couplings.map(function(triple) {
                        return w.map(function(words, idx) {
                            return triple[idx].split(/\s+/gm).map(function(word) {
                                return words.indexOf(word.replace(/[^\w\sא-ת]|_/g, ''))
                            });
                        });
                    });
                    return {
                        t: time(t),
                        l: markup(l, m),
                        m: m
                    };
                } else {
                    $log.warn('Block ' + JSON.stringify(block) + ' does not match any of supported formats and will be ignored');
                    return {
                        t: [-1, -1],
                        l: ['', '', ''],
                        m: []
                    }
                }
            }

            function getSubtitles(name, language, translation, time) {
                var deferred,
                    query,
                    data;

                deferred = $q.defer();
                query = '?n=' + name + '&l=' + language + ',' + translation;
                data = cache.get(query);

                if (data && data.then) {
                    data.then(function(d) {
                        cache.put(query, d);
                        deferred.resolve(findByTime(d, time));
                    }).catch(function(err) {
                        deferred.reject(err);
                    });
                } else if (data) {
                    deferred.resolve(findByTime(data, time));
                } else {
                    cache.put(query, loadSubtitles(query, language, translation).then(function(d) {
                        cache.put(query, d);
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