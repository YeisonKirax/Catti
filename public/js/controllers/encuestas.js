angular.module('mean.encuestas').controller('EncuestasController', ['$scope','$stateParams','$window', 'Global', 'Encuestas','Proyectos', '$state', function ($scope, $stateParams,$window, Global,Encuestas, Proyectos, $state) {
    $scope.global = Global;

    $scope.create = function() {
        var encuesta = new Encuestas({
            nombre: this.nombre,
            url: this.url,
            proyectoname: this.proyectoname
        });

        encuesta.$save(function() {
            $window.alert('Se ha creado la encuesta satisfactoriamente');
            $window.location.href ='views/admins/index.html'
        });

        this.nombre = "";
        this.url = "";
        this.proyectoname= "";

    };

    $scope.remove = function(encuesta) {
        if (encuesta) {
            encuesta.$remove();

            for (var i in $scope.encuestas) {
                if ($scope.encuestas[i] === encuesta) {
                    $scope.encuestas.splice(i, 1);

                }
            }
        }
        else {
            $scope.encuesta.$remove();
            $state.go('Encuestas');
        }
    };


    $scope.update = function() {
        var encuesta = $scope.encuesta;
        if (!encuesta.updated) {
            encuesta.updated = [];
        }
        encuesta.updated.push(new Date().getTime());
        encuesta.$update(function() {
            $window.alert('Se han actualizado los datos de la encuesta satisfactoriamente');
            $window.location.href ='views/admins/index.html'

        });
    };

    $scope.find = function() {
        Encuestas.query(function(encuestas) {
            $scope.encuestas = encuestas;

        });
    };

    $scope.findP = function() {
        Proyectos.query(function(proyectos) {
            $scope.proyectos = proyectos;

        });
    };
    $scope.findOne = function() {
        Encuestas.get({
            encuestaID: $stateParams.encuestaID
        }, function(encuesta) {
            $scope.encuesta = encuesta;
        });
    };



}]);
