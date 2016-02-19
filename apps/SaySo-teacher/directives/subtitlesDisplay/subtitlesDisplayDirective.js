var app = angular.module('teacherApp');

app.directive('subtitlesDisplay', function() {
    return {
        restrict: 'E',
        scope: {
            subtitles: '='
        },
        templateUrl: '/apps/SaySo-teacher/directives/subtitlesDisplay/subtitlesDisplay.html',
        controller: 'subtitlesDisplayController'
    }
});