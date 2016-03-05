var app = angular.module('teacherApp', ['ngResource', 'ngRoute', 'ngTable', 'xeditable', 'file-model']);

app.constant('SUBTITLES_URL', '/dbapi/subtitles')
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller:  'teacherManager',
        templateUrl: '/apps/SaySo-teacher/Partials/teacherManager.html'
    }).otherwise('/')
}]);