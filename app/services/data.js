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
