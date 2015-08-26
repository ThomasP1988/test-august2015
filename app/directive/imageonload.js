DeveloperTestApp
.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                console.log("image loaded");
            });
        }
    };
});