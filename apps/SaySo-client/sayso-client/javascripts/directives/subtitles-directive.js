angular.module('sayso')
    .directive('subtitles', ['videoService', 'subtitlesService', function(videoService, subtitlesService) {
        return {
            templateUrl: 'apps/SaySo-client/sayso-client/partials/subtitles.html',
            restrict: 'E',
            scope: {
                youtubeId: '=',
                subtitles: '=',
                translation: '='
            },
            link: function(scope, element, attr) {
                scope.click = function($event) {
                    if ($event.target.parentElement.offsetWidth - $event.offsetX < 30) {
                        scope.transcription = !scope.transcription;
                    }
                };

                // Initial values
                scope.transcription = false;

                // Subscribe to time changes
                videoService.onTimeUpdate(attr.mediagroup, function(time) {
                    subtitlesService.getSubtitles(scope.youtubeId, scope.subtitles, scope.translation, time)
                        .then(function(data) {
                            scope.l = data.l;
                        });
                });
            }
        }
    }]);