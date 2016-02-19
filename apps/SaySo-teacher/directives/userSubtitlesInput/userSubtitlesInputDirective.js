var app = angular.module('teacherApp');

app.directive('userSubtitlesInput', function() {
    return {
        restrict: 'E',
        scope: {
            videoId: '=',
            subtitles: '='
        },
        templateUrl: '/apps/SaySo-teacher/directives/userSubtitlesInput/userSubtitlesInput.html',
        controller: 'userSubtitlesInputController'
    }
});