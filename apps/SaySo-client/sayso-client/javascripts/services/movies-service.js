angular.module('sayso')
    .factory('moviesService', ['$http', '$q', '$log', 'MOVIES_URL', 'subtitlesService', function($http, $q, $log, MOVIES_URL) {



        return {
            getMovies: function(sourceLanguage, targetLanguage) {
                var defer = $q.defer();

                $http
                    .get(MOVIES_URL, {
                        params: {
                            sourceLang: sourceLanguage,
                            targetLang: targetLanguage
                        }
                    })
                    .then(function(response) {

                        defer.resolve(response.data);
                    })
                    .catch(function(err) {
                        $log.error('Failed to load movies due to the following error: ' + err.message);
                        defer.reject(err);
                    });

                return defer.promise;
            }
        };
    }]);