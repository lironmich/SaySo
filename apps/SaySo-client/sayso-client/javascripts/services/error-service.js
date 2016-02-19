angular.module('sayso')
    .factory('$exceptionHandler', ['$log', function($log) {
        return function(exception, cause) {
            /**
             * Exclude JSON parsing error from standard error handling process
             * due to AngularJS decision to not handle this case as issue.
             *
             * @see https://github.com/angular/angular.js/issues/11549
             */
            if (exception.stack.indexOf('at Object.parse (native)') >= 0) {
                exception.message = 'JSON parsing error - ' + exception.message;
            } else {
                exception.message += ' (caused by "' + cause + '")';
                $log.error(exception);
            }
        };
    }]);