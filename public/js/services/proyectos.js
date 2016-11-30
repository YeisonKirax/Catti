//Articles service used for articles REST endpoint
angular.module('mean.proyectos').factory("Proyectos", ['$resource', function($resource) {
    return $resource('api/proyectos/:proyectoID', {
        proyectoID: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);
