angular.module('mean.contactos').controller('ContactosController', ['$scope','$stateParams', 'Global', 'Contactos', '$state', function ($scope, $stateParams,  Global, Contactos, $state) {
    $scope.global = Global;



    $scope.update = function() {
        var contacto = $scope.contacto;
        if (!contacto.updated) {
            contacto.updated = [];
        }
        contacto.updated.push(new Date().getTime());
        contacto.$update(function() {
        $state.go('iniciarLlamada')

        });
    };

    $scope.find = function() {
        Contactos.query(function(contactos) {
            $scope.contactos = contactos;

        });
    };

    $scope.findOne = function() {
        Contactos.get({
            contactoID: $stateParams.contactoID
        }, function(contacto) {
            $scope.contacto = contacto;
        });
    };



}]);
