angular.module('sayso')
    .directive('card', [function() {
        return {
            templateUrl: 'apps/SaySo-client/sayso-client/partials/card.html',
            restrict: 'E',
            scope: {
                image: '@',
                category: '@',
                title: '@',
                language: '@',
                level: '@',
                likes: '@',
                views: '@'
            }
        }
    }]);