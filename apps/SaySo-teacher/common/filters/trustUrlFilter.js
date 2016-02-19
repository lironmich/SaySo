var app = angular.module('teacherApp');

app.filter('trustUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);