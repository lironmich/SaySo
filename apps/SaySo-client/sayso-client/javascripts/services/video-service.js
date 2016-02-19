angular.module('sayso')
    .factory('videoService', [function() {
        var repository = [];

        return {
            play: function(id) {
                var video;
                if(!repository[id]) {
                    repository[id] = {};
                }
                repository[id].isPlaying = true;
                video = repository[id] && repository[id].video;
                video && video[0].play();
            },
            pause: function(id) {
                var video;
                if(!repository[id]) {
                    repository[id] = {};
                }
                repository[id].isPlaying = true;
                video = repository[id] && repository[id].video;
                video && video[0].pause();
            },
            onTimeUpdate: function(id, callback) {
                var video;
                if(!repository[id]) {
                    repository[id] = {
                        isPlaying: false
                    };
                }
                video = repository[id];
                video.onTimeUpdate = callback;

                if(video = video.video) {
                    video.on('timeupdate', function() {
                        callback(video[0].currentTime);
                    });
                }
            },
            register: function(id, video) {
                if(!repository[id]) {
                    repository[id] = {
                        isPlaying: false
                    };
                }
                repository[id].video = video;
                if(repository[id].onTimeUpdate) {
                    video.on('timeupdate', function() {
                        repository[id].onTimeUpdate(repository[id].video[0].currentTime);
                    });
                }
                if(repository[id].isPlaying) {
                    video[0].play();
                }
            }
        };
    }]);