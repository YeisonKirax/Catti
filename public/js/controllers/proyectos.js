angular.module('mean.proyectos').controller('ProyectosController', ['$scope','$stateParams', 'Global', 'Proyectos', '$state', function ($scope, $stateParams,  Global, Proyectos, $state) {
    $scope.global = Global;

    $scope.create = function() {
        var proyecto = new Proyectos({
            name: this.name,
            description: this.description
        });

        proyecto.$save(function(response) {
            $state.go('viewProyecto',{proyectoID: response.id})
        });

        this.name = "";
        this.description = "";
    };

    $scope.remove = function(proyecto) {
        if (proyecto) {
            proyecto.$remove();

            for (var i in $scope.proyectos) {
                if ($scope.proyectos[i] === proyecto) {
                    $scope.proyectos.splice(i, 1);

                }
            }
        }
        else {
            $scope.proyecto.$remove();
            $state.go('Proyectos');
        }
    };


    $scope.update = function() {
        var proyecto = $scope.proyecto;
        if (!proyecto.updated) {
            proyecto.updated = [];
        }
        proyecto.updated.push(new Date().getTime());
        proyecto.$update(function() {
        $state.go('viewProyecto',{proyectoID: proyecto.id})

        });
    };

    $scope.find = function() {
        Proyectos.query(function(proyectos) {
            $scope.proyectos = proyectos;

        });
    };

    $scope.findOne = function() {
        Proyectos.get({
            proyectoID: $stateParams.proyectoID
        }, function(proyecto) {
            $scope.proyecto = proyecto;
        });
    };



}]);
