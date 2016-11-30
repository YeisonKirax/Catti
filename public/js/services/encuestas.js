//Articles service used for articles REST endpoint
angular.module('mean.encuestas').factory("Encuestas", ['$resource', function($resource) {
    return $resource('api/encuestas/:encuestaID', {
        encuestaID: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);
