var app = angular.module('teacherApp');

app.directive('subtitlesMatching', function() {
    return {
        restrict: 'E',
        scope: {
            subtitles: '='
        },
        link: function(scope) {
          $('body').on('keydown', function(e) {
              if (!e.ctrlKey) {
                return;
              }

              scope.$applyAsync(function() {
                  scope.generateAssignedKey();
              });
          })
        },
        templateUrl: '/apps/SaySo-teacher/directives/subtitlesMatching/subtitlesMatching.html',
        controller: 'subtitlesMatchingController'
    }
});