angular.module('sayso')
    .directive('video', ['videoService', function(videoService) {
        return {
            restrict: 'E',
            scope: false,
            link: function(scope, element, attr) {
                videoService.register(attr.mediagroup, element);
            }
        }
    }]);