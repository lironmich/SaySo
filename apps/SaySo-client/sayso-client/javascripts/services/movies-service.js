angular.module('sayso')
    .factory('moviesService', ['$http', '$q', '$log', 'MOVIES_URL', function($http, $q, $log, MOVIES_URL) {
        var defer;

        defer = $q.defer();

        $http
            .get(MOVIES_URL)
            .then(function(response) {
                defer.resolve(response.data);
            })
            .catch(function(err) {
                $log.error('Failed to load movies due to the following error: ' + err.message);
                defer.reject(err);
            });

        return {
            getMovies: function() {
                return defer.promise;
            }
        };
    }]);