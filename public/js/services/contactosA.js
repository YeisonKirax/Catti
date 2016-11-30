//Articles service used for articles REST endpoint
angular.module('mean.contactosA').factory("ContactosA", ['$resource', function($resource) {
    return $resource('api/contactos/:contactoID', {
        contactoID: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);
