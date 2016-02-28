var app = angular.module('teacherApp');

app.controller('subtitlesMatchingController', ['$scope', 'NgTableParams', function($scope, NgTableParams) {

    var findMatchesEntry = function(propertyName) {
        if (propertyName === 'source') {
            return 0;
        }

        if (propertyName === 'target') {
            return 1;
        }

        return 2;
    };

    var convertNumberToColor = function(number) {
        var red = number % 256;
        number = Math.round(number / 256);

        var green = number % 256;
        number = Math.round(number / 256);

        var blue = number % 256;

        return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    };

    var getAssignedKey = function(matchDict, propertyName, index) {
        var keys = _.keys(matchDict);

        for(var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var matchesEntry = findMatchesEntry(propertyName);

            if (_.contains(matchDict[key][matchesEntry], index)) {
                return parseInt(key);
            }
        }

        return null;
    };

    $scope.generateAssignedKey = function() {
        var rand = Math.random().toString().slice(2);
        $scope.assignedKey = parseInt(rand) ;
    };

    $scope.generateAssignedKey();

    $scope.getTableIndex = function($index) {
        var tableParams = $scope.tableParams;
        return (tableParams.page() - 1) * tableParams.count() + $index;
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

    $scope.getWords = function(text) {
        if (!text) {
            return [];
        }

        return text.trim().split(' ');
    };

    $scope.assignKey = function(propertyName, parentIndex, index) {
        var tableIndex = $scope.getTableIndex(parentIndex);
        var text = $scope.subtitles.text[tableIndex];

        /*  assigned key => [source indexes, target indexes, transcript indexes]
            int => [int[], int[], int] */
        text.match = text.match || {};

        var matchDict = text.match;

        var key = $scope.assignedKey;
        matchDict[key] = matchDict[key] || [[], [], []];

        var matchesEntry = findMatchesEntry(propertyName);

        var prevAssignedKey = getAssignedKey(matchDict, propertyName, index);

        // Add the new key
        if (key !== prevAssignedKey) {
            matchDict[key][matchesEntry].push(index);
        }

        // Remove previous key
        if (prevAssignedKey) {
            var prevValue = matchDict[prevAssignedKey][matchesEntry];
            matchDict[prevAssignedKey][matchesEntry] = _.filter(prevValue, function(value) {
                return value !== index;
            });
        }
    };

    $scope.getWordStyle = function(propertyName, parentIndex, index) {
        var tableIndex = $scope.getTableIndex(parentIndex);
        var text = $scope.subtitles.text[tableIndex];

        var matchDict = text.match;
        if (!matchDict) {
            return {};
        }

        var assignedKey = getAssignedKey(matchDict, propertyName, index);
        if (!assignedKey) {
            return {};
        }

        var color = convertNumberToColor(assignedKey);

        var style = {};
        style['background-color'] = color;

        return style;
    }
}]);