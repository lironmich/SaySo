var app = angular.module('teacherApp');

app.directive('youtubePlayer', function() {
    return {
        restrict: 'E',
        scope: {
            videoId: '='
        },
        templateUrl: '/apps/SaySo-teacher/directives/youtubePlayer/youtubePlayer.html',
        controller: 'youtubePlayerController'
    }
});
