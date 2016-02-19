var myApp = angular.module('teacherApp', ['ngResource', 'ngRoute']);

myApp.controller('tableManage', ['$scope', '$http', function($scope, $http) {

    $http.get('/dbapi/movies').success(function(response){
        console.log('$scope.list at getMovies ');
        $scope.movielist = response;
    })

    console.log("Hello World from tableManage");
}]);


/*
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
*/



//$scope, $http) {

//$http.get('/cliplist')

//exports.appctrl = appctrl;