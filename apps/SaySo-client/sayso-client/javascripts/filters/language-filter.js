angular.module('sayso')
    .filter('language', function() {
        var map = {
            'he': 'Hebrew',
            'en': 'English',
            'es': 'Spanish',
            'fr': 'French',
            'ru': 'Russian'

        };

        return function(input) {
            return map[input];
        }
    });