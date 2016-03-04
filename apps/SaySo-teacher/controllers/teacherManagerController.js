var app = angular.module('teacherApp');

app.controller('teacherManager', ['$scope', '$http', function($scope, $http) {
    $scope.videoId = '';
    $scope.subtitles = {};

    $scope.saveSubtitles = function() {
        var videoId = $scope.videoId;
        var subtitles = $scope.subtitles;

        if (!videoId || !subtitles) {
            return;
        }

        $http.post('/dbapi/addSubtitle', {
            youtubeId: videoId,
            subtitles: subtitles
        });
    }
}]);