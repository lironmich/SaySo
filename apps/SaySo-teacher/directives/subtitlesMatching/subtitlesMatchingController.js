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

    var getPropertyNameIfChanged = function(text1, text2, propertyName) {
        if (text1[propertyName] !== text2[propertyName]) {
            return propertyName;
        }

        return null;
    };

    var getChangedPropertyName = function(text1, text2) {
        return getPropertyNameIfChanged(text1, text2, 'source') ||
            getPropertyNameIfChanged(text1, text2, 'target') ||
            getPropertyNameIfChanged(text1, text2, 'transcript')
    };

    var onSubtitlesTextChanged = function(newValue, oldValue) {
        for (var i = 0; i < newValue.length; i++) {
            var newText = newValue[i];
            var oldText = oldValue[i];

            var changedPropertyName = getChangedPropertyName(newText, oldText);
            if (!changedPropertyName) {
                continue;
            }

            var matchDict = newText.match;
            var matchesEntry = findMatchesEntry(changedPropertyName);

            _.values(matchDict).forEach(function(value) {
                value[matchesEntry] = [];
            });
        }
    };

    var _assingKey =

    $scope.$watch('subtitles.text', function(newValue, oldValue) {
        if (!newValue) {
            return;
        }

        if (oldValue &&
            newValue.length === oldValue.length) {

            onSubtitlesTextChanged(newValue, oldValue);
        }

        $scope.tableParams.reload();
    }, true);

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

    var assignKey = function(text, propertyName, index) {
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

    $scope.assignKey = function(propertyName, parentIndex, index) {
        var tableIndex = $scope.getTableIndex(parentIndex);
        var text = $scope.subtitles.text[tableIndex];

        assignKey(text, propertyName, index);
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
    };

    $scope.getAssignedKeyStyle = function() {
        var assignedKey = $scope.assignedKey;
        var color = convertNumberToColor(assignedKey);

        var style = {};
        style['background-color'] = color;

        return style;
    };

    $scope.autoMatchTranscriptToSource = function(direction) {
        var subtitlesText = $scope.subtitles.text;

        for (var i = 0; i < subtitlesText.length; i++) {
            var text = subtitlesText[i];

            var sourceWords = $scope.getWords(text.source);
            var transcriptWords = $scope.getWords(text.transcript);

            if (sourceWords.length !== transcriptWords.length) {
                continue;
            }

            text.match = null;

            for (var j = 0; j < sourceWords.length; j++) {
                var index = direction ? j : sourceWords.length - 1 - j;

                $scope.generateAssignedKey();

                assignKey(text, 'source', j);
                assignKey(text, 'transcript', index);
            }
        }
    };
}]);