var app = angular.module('teacherApp');

app.controller('subtitlesDisplayController', ['$scope', 'NgTableParams', function($scope, NgTableParams) {

    $scope.getTableIndex = function($index) {
        var tableParams = $scope.tableParams;
        return (tableParams.page() - 1) * tableParams.count() + $index;
    };

    $scope.deleteSubtitle = function($index) {
        var tableIndex = $scope.getTableIndex($index);
        $scope.subtitles.text.splice(tableIndex, 1);
    };

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
        $scope.subtitles.text.sort(function(text1, text2) {
           return text1.from - text2.from;
        });

        $scope.tableParams.reload();
    })
}]);