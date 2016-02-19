angular.module('sayso')
    .filter('language', function() {
        var map = {
            'he': 'Hebrew',
            'en': 'English',
            'es': 'Spanish'
        };

        return function(input) {
            return map[input];
        }
    });