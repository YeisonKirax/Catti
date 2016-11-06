//Articles service used for articles REST endpoint
angular.module('mean.contactos').factory("Contactos", ['$resource', function($resource) {
    return $resource('api/llamadas/contactos/:contactoID', {
        contactoID: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);
