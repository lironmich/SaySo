angular.module('flashCardsApp', ['ngResource', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                controller:  'cardlist',
                templateUrl: 'apps/flashCards-client/Partials/CardsList.html'
            })
            .when('/cardview:id', {
                controller:  'cardview',
                templateUrl: 'apps/flashCards-client/Partials/CardView.html'
            })
            .otherwise('/')
    }]);
