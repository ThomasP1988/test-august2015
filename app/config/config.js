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
