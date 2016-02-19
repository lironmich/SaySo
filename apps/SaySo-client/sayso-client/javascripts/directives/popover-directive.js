angular.module('sayso')
    .directive('popover', ['videoService', function(videoService) {
        return {
            templateUrl: 'apps/SaySo-client/sayso-client/partials/popover.html',
            restrict: 'E',
            scope: {
                movie: '=',
                close: '&'
            },
            controllerAs: 'popover',
            bindToController: true,
            controller: function() {
                this.tabs = [{
                    text: 'WatchSO'
                }, {
                    text: 'ChooseSO'
                }, {
                    text: 'ArrangeSO'
                }, {
                    text: 'SaySO'
                }];

                this.activeTab = this.tabs[1];
                this.subtitles = 'he';
                this.translation = 'en';

                this.hide = function(evt) {
                    if(!evt || evt.target.classList.contains('popover')) {
                        this.close();
                    }
                };

                // Pause Video
                this.pause = function() {
                    videoService.pause('sayso');
                };

                // Resume Video
                this.resume = function() {
                    videoService.play('sayso');
                };
            }
        }
    }]);