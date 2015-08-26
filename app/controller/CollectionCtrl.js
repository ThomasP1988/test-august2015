DeveloperTestApp
    .controller('CollectionCtrl', function ($scope, $stateParams, $http, URL, Data, $filter, $rootScope) {

        $scope.selectedSlugCollection = !!$stateParams.collection ? $stateParams.collection : null;
        Data.setSelectedSlugCollection($scope.selectedSlugCollection);
        $scope.collections = Data.getCollections();

        $rootScope.$broadcast('slug');

        $scope.selectedPricing;
        $scope.sliderValue;
        $scope.lengthPricing;
        $scope.activeItem;

        $scope.$watch('selectedSlugCollection', function(newNames, oldNames) {
            refreshCollection();
        });

        $scope.$on('data', function(event, args) {
            refreshCollection();
        });

        $scope.slider = {
            'options': {
                start: function (event, ui) {

                },
                stop: function (event, ui) {
                    $scope.selectedPricing = $scope.sortedPricing[$scope.sliderValue];
                    $scope.$digest();
                }
            }
        }

        $scope.sortPricing = function(pricings, bouquet) {
            $scope.sortedPricing = sortPricings(pricings);
            $scope.lengthPricing = pricings.length - 1;
            $scope.activeItem = bouquet.id;
            $scope.selectedPricing = $scope.sortedPricing[0];
            $scope.sliderValue = 0;
        }

        $scope.getLowerPrice = function(bouquet) {
            console.log(bouquet);
            var sortedPrices = sortPricings(bouquet.pricings);
            return sortedPrices[0].amount;
        }

        function refreshCollection() {
            $scope.collectionToShow = !!$scope.selectedSlugCollection ? Data.getCollectionBySlug($scope.selectedSlugCollection) : Data.getAllCollections();
        }

        function sortPricings(pricings) {
            return $filter('orderBy')(pricings, 'quantity', false);
        }
    });