var app = angular.module('teacherApp');

app.controller('userSubtitlesInputController', ['$scope', '$http', '$q', function($scope, $http, $q) {
    var xmlToJsonConverter = new X2JS();

    var getGoogleTranslateSubtitlesPromise = function(youtubeSubtitlesUrl, toLang) {
        var url = youtubeSubtitlesUrl;

        url = url.replace(/fmt=srv\d/, "fmt=srv1");

        if (url.indexOf('fmt=srv1') < 0 ){
            url += '&fmt=srv1'
        }

        url += '&tlang=' + toLang;

        return $http.get(url).then(function(response){
            var xmlString = response.data;
            return xmlToJsonConverter.xml_str2json(xmlString);
        }, function () {
            alert("Invalid url: " + url);
        });
    };

    var clearSubtitles = function() {
        var subtitles = $scope.subtitles;

        subtitles.sourceLang= '';
        subtitles.targetLang= '';
        subtitles.text= [ /* {source, target, from, to }*/ ];
    };

    var fillSubtitlesFromGoogleTranslates = function(sourceLang, targetLang, sourceJson, targetJson) {
        clearSubtitles();

        var subtitles = $scope.subtitles;

        subtitles.sourceLang = sourceLang;
        subtitles.targetLang = targetLang;

        var subtitlesText = subtitles.text;

        var sourceTexts = sourceJson.transcript.text;
        var targetTexts = targetJson.transcript.text;

        for (var i = 0; i < sourceTexts.length; i++) {
            var sourceText = sourceTexts[i];
            var targetText = targetTexts[i]

            var fromSecond = parseFloat(sourceText._start);
            var toSeconds = fromSecond + parseFloat(sourceText._dur);

            subtitlesText.push({
                source: sourceText.__text,
                target: targetText.__text,
                from: fromSecond,
                to: toSeconds
            })
        };

        $scope.subtitles = subtitles;
    };

    clearSubtitles();

    $scope.$watchGroup(['youtubeSubtitlesUrl', 'subtitles.sourceLang', 'subtitles.targetLang'], function() {
        var youtubeSubtitlesUrl = $scope.youtubeSubtitlesUrl;
        var sourceLang = $scope.subtitles.sourceLang;
        var targetLang = $scope.subtitles.targetLang;

        if (!youtubeSubtitlesUrl ||
            !sourceLang ||
            !targetLang) {
            return;
        }

        var sourcePromise = getGoogleTranslateSubtitlesPromise(youtubeSubtitlesUrl, sourceLang);
        var targetPromise = getGoogleTranslateSubtitlesPromise(youtubeSubtitlesUrl, targetLang);

        $q.all([sourcePromise, targetPromise]).then(function(data){
            if (!data || !data[0] || !data[1]){
                return;
            }

            fillSubtitlesFromGoogleTranslates(sourceLang, targetLang, data[0], data[1]);
        })
    })
}]);