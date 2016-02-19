var app = angular.module('teacherApp');

app.controller('teacherManager', ['$scope', '$http', function($scope, $http) {
    $scope.videoId = '';
    $scope.subtitles = {};
}]);