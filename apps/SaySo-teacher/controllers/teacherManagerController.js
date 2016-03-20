var app = angular.module('teacherApp');

app.controller('teacherManager', ['$scope', '$http', 'notificationService', function($scope, $http, notificationService) {
    $scope.videoId = '';
    $scope.subtitles = {};
    $scope.savingSubtitles = false;

    $scope.saveSubtitles = function() {
        var videoId = $scope.videoId;
        var subtitles = $scope.subtitles;

        if (!videoId || !subtitles) {
            return;
        }

        $scope.savingSubtitles = true;

        $http.post('/dbapi/addSubtitle', {
            youtubeId: videoId,
            subtitles: subtitles
        }).then(function() {
            notificationService.success('subtitle saved');
        }, function(err) {
            var data = err.data;

            var header = 'failed in saving subtitle';
            var body = '';

            if (data &&
                data.message &&
                data.errors) {

                header = data.message;

                var errors = data.errors;
                if (errors) {
                    _.keys(errors).forEach(function (key) {
                        body += key + ': ' + errors[key].message;
                    });
                }
            }

            notificationService.error(header, body);
        }).finally(function() {
            $scope.savingSubtitles = false;
        });
    }
}]);