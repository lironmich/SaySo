angular.module('sayso')
    .factory('categoriesService', ['$q', 'moviesService', function($q, moviesService) {
        var defer;

        defer = $q.defer();

        moviesService
            .getMovies()
            .then(function(data) {
                defer.resolve(data.reduce(function(categories, movie) {
                    if (categories.indexOf(movie.category) < 0) {
                        categories.push(movie.category);
                    }
                    return categories;
                }, []).map(function(category) {
                    return {
                        text: category
                    };
                }));
            })
            .catch(function(err) {
                defer.reject(err);
            });

        return {
            getCategories: function() {
                return defer.promise;
            }
        };
    }]);