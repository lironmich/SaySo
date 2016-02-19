var app = angular.module('teacherApp');

app.directive('videoSearch', function() {
    return {
        restrict: 'E',
        scope: {
            videoId: '='
        },
        templateUrl: '/apps/SaySo-teacher/directives/videoSearch/videoSearch.html',
        controller: 'videoSearchController'
    }
});
