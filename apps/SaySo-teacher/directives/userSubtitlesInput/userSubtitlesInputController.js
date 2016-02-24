var app = angular.module('teacherApp');

app.controller('userSubtitlesInputController', ['$scope', '$http', '$q', 'srtParserService', function($scope, $http, $q, srtParserService) {
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

        subtitles.text= [ /* {source, target, transcript, from, to }*/ ];
    };

    var fillSubtitlesFromGoogleTranslates = function(sourceJson, targetJson) {
        var subtitlesText = [];

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
                transcript: '',
                from: fromSecond,
                to: toSeconds
            })
        }

        $scope.subtitles.text = subtitlesText;
    };

    var isFileReaderSupported = function() {
        return (window.File &&
            window.FileReader &&
            window.FileList &&
            window.Blob);
    }

    var getFileExtension = function(file) {
        var split = file.name.split('.');
        return split[split.length - 1];
    }

    var canReadFile = function(file) {
        if (!isFileReaderSupported()) {
            alert('File reader is not supported in this browser');
            return false;
        }

        if (!file ||
            getFileExtension(file) !== "srt") {
            alert('You need to choose srt file');
            return false;
        }

        return true;
    };

    var isSubtitleLangsExists = function() {
        var sourceLang = $scope.subtitles.sourceLang;
        var targetLang = $scope.subtitles.targetLang;

        return sourceLang && targetLang;
    };

    var readSrtFile = function(action) {
        var file = $scope.srtFile;
        if (!canReadFile(file) ||
            !isSubtitleLangsExists()){
            return;
        }

        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            var srtString = e.target.result;

            var srtSubtitles = srtParserService.fromSrt(srtString, true, true);

            var subtitlesText = [];

            srtSubtitles.forEach(function(subtitle) {
                subtitlesText.push({
                    source: subtitle.text,
                    target: '',
                    transcript: '',
                    from: subtitle.startTime / 1000,
                    to: subtitle.endTime / 1000
                })
            });

            action(subtitlesText);
        };

        fileReader.readAsText(file);
    };

    clearSubtitles();

    $scope.manualSubtitle = {};

    $scope.fillSubtitlesFromYoutube = function() {
        var youtubeSubtitlesUrl = $scope.youtubeSubtitlesUrl;

        if (!youtubeSubtitlesUrl ||
            !isSubtitleLangsExists()) {
            return;
        }

        var sourcePromise = getGoogleTranslateSubtitlesPromise(youtubeSubtitlesUrl, $scope.subtitles.sourceLang);
        var targetPromise = getGoogleTranslateSubtitlesPromise(youtubeSubtitlesUrl, $scope.subtitles.targetLang);

        $q.all([sourcePromise, targetPromise]).then(function(data){
            if (!data || !data[0] || !data[1]){
                return;
            }

            fillSubtitlesFromGoogleTranslates(data[0], data[1]);
        })
    };

    $scope.loadFromSrtFile = function() {
        var action = function(subtitlesText) {
            $scope.$applyAsync(function() {
                $scope.subtitles.text = subtitlesText;
            });
        };

        readSrtFile(action);
    };

    $scope.mergeFromSrtFile = function() {
        var action = function(subtitlesText) {
            $scope.$applyAsync(function() {
                $scope.subtitles.text.forEach(function(sourceSubtitle) {
                    subtitlesText.forEach(function (targetSubtitle) {
                        if (Math.abs(sourceSubtitle.from - targetSubtitle.from) < 0.5) {
                            sourceSubtitle.target = targetSubtitle.source;
                        }
                    });
                });
            });
        };

        readSrtFile(action);
    };

    $scope.addManualSubtitle = function() {
        var subtitle = $scope.manualSubtitle;

        if (!isFinite(subtitle.from) ||
            !isFinite(subtitle.to)) {

            alert('from, to: should be numbers');
            return;
        }

        $scope.$applyAsync(function() {
            var clone = _.extend({}, subtitle);
            $scope.subtitles.text.push(clone);
        });
    }
}]);