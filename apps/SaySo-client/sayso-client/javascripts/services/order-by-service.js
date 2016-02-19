angular.module('sayso')
    .factory('orderByService', [function() {
        var orderBy;

        function popularityComparator(arg0, arg1) {
            return arg1.likesCount - arg0.likesCount;
        }

        function viewsComparator(arg0, arg1) {
            return arg1.viewsCount - arg0.viewsCount;
        }

        orderBy = [{
            text: 'Popularity',
            comparator: popularityComparator
        }, {
            text: 'Views',
            comparator: viewsComparator
        }];

        return {
            getOrderBy: function() {
                return orderBy.slice(0);
            }
        };
    }]);