angular.module('sayso', ['ngRoute', 'ngSanitize'])
    .constant('MOVIES_URL', 'data/movies.json')
    .constant('SUBTITLES_URL', 'data/subtitles/movie.orig.json')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'mainController',
                controllerAs: 'main',
                templateUrl: 'partials/main.html'
            })
            .otherwise('/');
    }]);