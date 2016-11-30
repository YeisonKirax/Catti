angular.module('mean.proyectos').controller('ProyectosController', ['$scope','$stateParams','$window','$modal', 'Global', 'Proyectos', '$state', function ($scope, $stateParams,$window, $modal, Global, Proyectos, $state) {
    $scope.global = Global;


    $scope.modalCreate = function(size){
        var modalInstance = $modal.open({
            templateUrl: 'views/proyectos/create.html',
            controller: function($scope, $modalInstance){
                $scope.ok = function(){
                    if(createProyectoForm.$valid){
                        $modalInstance.close();
                    }
                };
                $scope.cancel = function(){
                    $modalInstance.dismiss('cancel');
                };
            },
            size: size


        });

        modalInstance.result.then(function(selectedItem){},function(){
            $log.info('modal dismissed at: ' + new Date());
        })
    };

    $scope.create = function() {
        var proyecto = new Proyectos({
            name: this.name,
            description: this.description

        });

        proyecto.$save(function() {
            $window.alert('Se ha creado el proyecto satisfactoriamente');
            $window.location.href ='views/admins/index.html'
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
            $window.alert('Se ha actualizado el proyecto satisfactoriamente');
            $window.location.href ='views/admins/index.html'

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
