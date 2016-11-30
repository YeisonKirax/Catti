//Articles service used for articles REST endpoint

angular.module('mean.usuarios').factory("Usuarios", ['$resource', function($resource) {
    return $resource('api/usuarios/:usuarioID', {
        usuarioID: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);
