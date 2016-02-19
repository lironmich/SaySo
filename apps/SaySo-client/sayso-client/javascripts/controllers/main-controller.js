angular.module('sayso')
    .controller('mainController', [
        '$scope', '$location', '$routeParams', 'orderByService', 'categoriesService', 'moviesService', 'videoService',
        function MainController($scope, $location, $routeParams, orderByService, categoriesService, moviesService, videoService) {
            var vm = this;

            // Set Initial Values
            this.orderByOptions = orderByService.getOrderBy();
            this.orderBySelectedOption = $routeParams.orderBy ? this.orderByOptions.filter(function(orderByOption) {
                return $routeParams.orderBy.toLowerCase() === orderByOption.text.toLowerCase();
            }).shift() : null;
            this.categories = [];
            this.selectedCategories = $routeParams.categories ? $routeParams.categories.split(',') : [];
            this.movies = [];
            this.isPopoverVisible = !!$routeParams.popover;
            this.popoverMovie = null;
            this.isListVisible = !!$routeParams.list;
            this.search = $routeParams.search;

            // Autoplay video if popover is opened
            if(this.isPopoverVisible) {
                videoService.play('sayso');
            }

            // Get Categories
            categoriesService.getCategories().then(function(categories) {
                vm.categories = categories;
            });

            // Get Movies
            moviesService.getMovies().then(function(movies) {
                var movieName;
                movieName = $routeParams.popover;
                vm.movies = vm.selectedCategories.length === 0 ? movies : movies.filter(function(movie) {
                    return vm.selectedCategories.indexOf(movie.category) >= 0;
                });
                if(vm.orderBySelectedOption) {
                    vm.movies = vm.movies.sort(vm.orderBySelectedOption.comparator);
                }
                if (vm.isPopoverVisible) {
                    vm.popoverMovie = movies.reduce(function(found, movie) {
                        if (!found && (movie.movieName === movieName)) {
                            found = movie;
                        }
                        return found;
                    }, null);
                }
            });

            // Search
            this.searchKeyPress = function(event) {
                if (event.keyCode === 13) { // Enter
                    $location.search('search', vm.search || undefined);
                }
            };

            this.searchBlur = function() {
                $location.search('search', vm.search || undefined);
            };

            // Selected Category
            this.isCategorySelected = function(category) {
                return this.selectedCategories.indexOf(category.text) >= 0;
            };

            // Select Order
            this.orderBy = function(orderByOption) {
                $location.search('orderBy', orderByOption.text);
                this.hideList();
            };

            // Toggle Category
            this.toggleCategory = function(category) {
                var idx = this.selectedCategories.indexOf(category.text);
                if (idx < 0) {
                    this.selectedCategories.push(category.text);
                } else {
                    this.selectedCategories.splice(idx, 1);
                }
                $location.search('categories', this.selectedCategories.join() || undefined);
                this.hideList();
            };

            // Show Popover
            this.showPopover = function(movie) {
                this.isPopoverVisible = true;
                this.popoverMovie = movie;
                $location.search('popover', movie.movieName);
            };

            // Hide Popover
            this.closePopover = function() {
                this.isPopoverVisible = false;
                this.popoverMovie = null;
                $location.search('popover', undefined);
            };

            // Show Order/Categories list (mobile)
            this.showList = function() {
                this.isListVisible = true;
                $location.search('list', 'open');
            };

            // Hide Order/Categories list (mobile)
            this.hideList = function() {
                this.isListVisible = false;
                $location.search('list', undefined);
            };
        }
    ]);