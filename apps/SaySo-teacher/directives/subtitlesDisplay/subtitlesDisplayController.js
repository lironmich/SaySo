var app = angular.module('teacherApp');

app.controller('subtitlesDisplayController', ['$scope', 'NgTableParams', function($scope, NgTableParams) {
    $scope.tableParams = new NgTableParams({
        page: 1,
        count: 10
    }, {
        getData: function($defer, params) {
            var text = $scope.subtitles.text;

            var filteredText = text.slice(
                (params.page() - 1) * params.count(),
                 params.page() * params.count()
            );

            $defer.resolve(filteredText);
        },
        total: $scope.subtitles.text.length
    });

    $scope.$watchCollection('subtitles.text', function() {
        $scope.tableParams.reload();
    })
}]);