//Articles service used for articles REST endpoint
angular.module('mean.llamadas').factory("Llamadas", ['$resource', function($resource) {
    return $resource('api/llamadas/:llamadaID', {
        llamadaID: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);
