var DeveloperTestApp = angular.module('DeveloperTestApp', ['ui.router', 'ui.slider']);

DeveloperTestApp
    .constant('URL', {
    'data': 'data/data.json'
});

DeveloperTestApp
    .config(function ($urlRouterProvider, $stateProvider, $httpProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('menu', {
                name: 'menu',
                url: "/",
                views: {
                    'main' :{
                        controller: 'MenuCtrl',
                        templateUrl: "menu.html"
                    }
                }
            })
            .state('menu.collection', {
                name: 'menu.collection',
                url: "c/:collection",
                views: {
                    'content' :{
                        controller: 'CollectionCtrl',
                        templateUrl: "collection.html"
                    }
                }
            })
            ;
    });

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
DeveloperTestApp
    .service('Data', function() {
        var collections;

        var selectedSlugCollection;

        this.getCollections = function() {
            return this.collections;
        }

        this.getSelectedSlugCollection = function() {
            return this.selectedSlugCollection;
        }

        this.setCollections = function(collections) {
            this.collections = collections;
        }

        this.setSelectedSlugCollection = function(selectedSlugCollection) {
            this.selectedSlugCollection = selectedSlugCollection;
        }

        this.getCollectionBySlug = function(slug) {
            var collectionToReturn;
            angular.forEach(this.collections, function(value, key) {
                if(value.slug == slug) {
                    collectionToReturn = value.skus;
                }
            });
            return collectionToReturn;
        }

        this.getAllCollections = function() {
            var allCollections = [];
            angular.forEach(this.collections, function(value, key) {
                allCollections = allCollections.concat(value.skus);
            });
            return allCollections;
        }
    });
