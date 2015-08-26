DeveloperTestApp
    .controller('MenuCtrl', function ($scope, $rootScope, $stateParams, $http, URL, Data) {

        $scope.selectedSlugCollection = Data.getSelectedSlugCollection();

        $scope.$on('slug', function(event, args) {
            $scope.selectedSlugCollection = Data.getSelectedSlugCollection();
        });

        $http.jsonp(URL.data + '?callback=JSON_CALLBACK').then(function(answer, status, headers, config) {
            Data.setCollections(answer.data.collections);
            $scope.collections = Data.getCollections();
            $rootScope.$broadcast('data');
        }, function(data, status, headers, config) {
            console.log("can not load JSON");
            console.log(data);
        });
    });
