angular.module('mean.contactosA').controller('ContactosAController', ['$scope','$stateParams','$window', 'Global', 'ContactosA','Proyectos','$state', function ($scope, $stateParams,$window,Global, ContactosA,Proyectos,$state) {
    $scope.global = Global;

    $scope.remove = function(contacto) {
        if (contacto) {
            contacto.$remove();

            for (var i in $scope.contactos) {
                if ($scope.contactos[i] === contacto) {
                    $scope.contactos.splice(i, 1);

                }
            }
        }
        else {
            $scope.contacto.$remove();
            $state.go('ContactosADMIN');
        }
    };

    $scope.update = function() {
        var contacto = $scope.contacto;
        if (!contacto.updated) {
            contacto.updated = [];
        }
        contacto.updated.push(new Date().getTime());
        contacto.$update(function() {
            $window.alert('Se ha actualizado el contacto satisfactoriamente');
            $window.location.href = 'views/admins/index.html'

        });
    };

    $scope.find = function() {
        ContactosA.query(function(contactos) {
            $scope.contactos = contactos;

        });
    };

    $scope.findOne = function() {
        ContactosA.get({
            contactoID: $stateParams.contactoID
        }, function(contacto) {
            $scope.contacto = contacto;
        });
    };
    $scope.findP = function() {
        Proyectos.query(function(proyectos) {
            $scope.proyectos = proyectos;

        });
    };



}]);
