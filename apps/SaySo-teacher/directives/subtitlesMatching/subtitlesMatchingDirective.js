var app = angular.module('teacherApp');

app.directive('subtitlesMatching', function() {
    return {
        restrict: 'E',
        scope: {
            subtitles: '='
        },
        templateUrl: '/apps/SaySo-teacher/directives/subtitlesMatching/subtitlesMatching.html',
        controller: 'subtitlesMatchingController'
    }
});