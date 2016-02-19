var app = angular.module('teacherApp');

app.controller('youtubePlayerController', ['$scope', function($scope) {
    $scope.$watch('videoId', function(newValue) {
        $scope.videoUrl = 'https://www.youtube.com/embed/' + newValue;
    });
}]);
