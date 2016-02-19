var app = angular.module('teacherApp');

app.controller('videoSearchController', ['$scope', function($scope) {
    $scope.$watch('searchText', function(newValue) {
        if (!newValue) {
            $scope.videoId = '';
            return;
        }

        var videoId;

        if (newValue.indexOf("http") >= 0) {
            videoId = newValue.split('v=')[1];
        } else {
            videoId = newValue;
        }

        $scope.videoId = videoId;
    })
}]);