angular.module('sayso', ['ngRoute', 'ngSanitize','appConfig'])
    .constant('MOVIES_URL', '/rdata/movies')
    .constant('SUBTITLES_URL', '/rdata/subtitle')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'mainController',
                controllerAs: 'main',
                templateUrl: 'apps/SaySo-client/sayso-client/partials/main.html'
            })
            .otherwise('/');
    }]);