var app = angular.module('teacherApp');

app.service('notificationService', [function() {
    this.success = function (header, body) {
        toastr.success(header, body)
    };

    this.warning = function (header, body) {
        toastr.warning(header, body)
    };

    this.error = function (header, body) {
        toastr.error(header, body)
    };
}]);