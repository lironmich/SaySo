var app = angular.module('teacherApp');

app.controller('userSubtitlesInputController', ['$scope', '$http', '$q', 'srtParserService', 'notificationService', 'SUBTITLES_URL', function($scope, $http, $q, srtParserService, notificationService, SUBTITLES_URL) {
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
            notificationService.error("Invalid url: " + url);
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
            var targetText = targetTexts[i];

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
    };

    var getFileExtension = function(file) {
        var split = file.name.split('.');
        return split[split.length - 1];
    };

    var canReadFile = function(file) {
        if (!isFileReaderSupported()) {
            notificationService.error('File reader is not supported in this browser');
            return false;
        }

        if (!file ||
            getFileExtension(file) !== "srt") {
            notificationService.error('You need to choose srt file');
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

    $scope.fillSubtitlesFromDB = function() {
        var sourceLang = $scope.subtitles.sourceLang;
        var targetLang = $scope.subtitles.targetLang;

        $http.get(SUBTITLES_URL, {
            params: {
                youtubeId: $scope.videoId,
                sourceLang: sourceLang,
                targetLang: targetLang
            }
        }).then(function(response) {
            var data = response.data;
            var subtitles = _.pluck(data, 'subtitles');

            if (!subtitles || subtitles.length !== 1) {
                notificationService.error('subtitle not found', 'not matching subtitles for this youtube video and languages');
                return;
            }

            $scope.$applyAsync(function() {
                $scope.subtitles.text = subtitles[0].text;
            });
        });
    };

    $scope.fillSubtitlesFromYoutube = function() {
        var youtubeSubtitlesUrl = $scope.youtubeSubtitlesUrl;

        if (!youtubeSubtitlesUrl ||
            !isSubtitleLangsExists()) {
            notificationService.error('youtube subtitles and languages should be filled');
            return;
        }

        var sourcePromise = getGoogleTranslateSubtitlesPromise(youtubeSubtitlesUrl, $scope.subtitles.sourceLang);
        var targetPromise = getGoogleTranslateSubtitlesPromise(youtubeSubtitlesUrl, $scope.subtitles.targetLang);

        $q.all([sourcePromise, targetPromise]).then(function(data){
            if (!data || !data[0] || !data[1]){
                return;
            }

            fillSubtitlesFromGoogleTranslates(data[0], data[1]);
        });
    };

    /* Notice, this function is totally cleaning all subtitles and keeps only the source-subtitles from the current srt file */
    $scope.uploadSourceFromSrtFile = function() {
        var action = function(subtitlesText) {
            $scope.$applyAsync(function() {
                $scope.subtitles.text = subtitlesText;
            });
        };

        readSrtFile(action);
    };

    $scope.uploadTargetFromSrtFile = function() {
        var action = function(newSubtitlesText) {
            $scope.$applyAsync(function() {
                $scope.subtitles.text.forEach(function(sourceSubtitle) {
                    newSubtitlesText.forEach(function (newTargetSubtitle) {
                        if (Math.abs(sourceSubtitle.from - newTargetSubtitle.from) < 0.5) {
                            sourceSubtitle.target = newTargetSubtitle.source;
                        }
                    });
                });
            });
        };

        readSrtFile(action);
    };

    /* the $scope.subtitles.text is an array, and for each element it has the variables:
    *    .source ,  .target,  .transcript  , .from (in seconds) and .to  (in seconds)*/

    $scope.uploadTranscriptFromSrtFile = function uploadTranscriptFromSrtFile() {
        var action = function(newSubtitlesText) {
            $scope.$applyAsync(function() {
                $scope.subtitles.text.forEach(function(sourceSubtitle) {
                    newSubtitlesText.forEach(function (newTranscriptSubtitle) {
                        if (Math.abs(sourceSubtitle.from - newTranscriptSubtitle.from) < 0.5) {
                            sourceSubtitle.transcript = newTranscriptSubtitle.source;
                        }
                    });
                });
            });
        };

        readSrtFile(action);
    }

    $scope.addManualSubtitle = function() {
        var subtitle = $scope.manualSubtitle;

        if (!isFinite(subtitle.from) ||
            !isFinite(subtitle.to)) {
            notificationService.error('fields from and to', 'should be numbers');
            return;
        }

        if (!subtitle.source) {
            notificationService.error('field source', 'should exist');
            return;
        }

        $scope.$applyAsync(function() {
            var clone = _.extend({}, subtitle);
            $scope.subtitles.text.push(clone);
        });
    }
}]);