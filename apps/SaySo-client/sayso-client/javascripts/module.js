angular.module('sayso', ['ngRoute', 'ngSanitize'])
    .constant('MOVIES_URL', '/dbapi/moviesPerLanguages')
    .constant('SUBTITLES_URL', '/dbapi/subtitles')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'mainController',
                controllerAs: 'main',
                templateUrl: 'apps/SaySo-client/sayso-client/partials/main.html'
            })
            .otherwise('/');
    }]);