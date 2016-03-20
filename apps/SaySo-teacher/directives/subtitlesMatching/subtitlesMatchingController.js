var app = angular.module('teacherApp');

app.controller('subtitlesMatchingController', ['$scope', 'NgTableParams', function($scope, NgTableParams) {

    $scope.assignedKey = null;//not valid yet
    var numOfColorsPerPrimary = 4;

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
        var multipleColorBy = Math.floor(255/(numOfColorsPerPrimary-1)); //85 for 4 colors, 64 for 5 colors

        var red = multipleColorBy * (number % numOfColorsPerPrimary); // 85 * (number % 4) , so between 0 and 255

        number = Math.round(number / numOfColorsPerPrimary); // (number / 4)
        var green = multipleColorBy * (number % numOfColorsPerPrimary); // 85 * (number % 4)

        number = Math.round(number / numOfColorsPerPrimary);
        var blue = multipleColorBy * (number % numOfColorsPerPrimary);

        if (red > 250 && green > 250 && blue > 250) {
            red = 210; green = 210; blue = 210;//safety for case of problem with already existing values
        } else if (red > 250 && green > 250) {
            green = 210; //Against yellow color which is hard to see
        }

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
        var myPrime = 47;
        var maxKey = Math.pow(numOfColorsPerPrimary, 3); //64 for 4 colors, 125 for 5 colors
        var newKey;

        if ($scope.assignedKey === null) {
            newKey = Math.floor(Math.random() * (maxKey - 1)); // between 0 and 62 (63 is white so not allowed because text font is white)
        } else {
            newKey = (($scope.assignedKey % maxKey) + myPrime) % maxKey;
        }

        if (newKey === (maxKey - 1) || (newKey === 29 && numOfColorsPerPrimary === 4)) {
            // 63 which is white is not allowed because text font is white, so get next one
            // 29 is not allow (in case of 0-63) because it's a green that comes after almost similar green
            newKey = (newKey + myPrime) % maxKey;
        }

        var rand = Math.random().toString().slice(2); //remove the '0.' and 3 extra digits to keep space for the relevant color code
        if (rand.length > 5) {
            rand = rand.slice(3);
        }
        $scope.assignedKey = (maxKey * parseInt(rand)) + newKey;
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