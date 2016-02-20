var app = angular.module('teacherApp', ['ngResource', 'ngRoute', 'xeditable']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        controller:  'teacherManager',
        templateUrl: '/apps/SaySo-teacher/Partials/teacherManager.html'
    })
    .otherwise('/')
}]);