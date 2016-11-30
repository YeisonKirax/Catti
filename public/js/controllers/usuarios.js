angular.module('mean.usuarios').controller('UsuariosController', ['$scope','$stateParams','$window', 'Global', 'Usuarios', '$state','$http', function ($scope, $stateParams,$window,  Global, Usuarios, $state,$http) {
    $scope.global = Global;

    $scope.create = function() {
        var usuario = new Usuarios({
            email: this.email,
            password: this.password,
            privilegio: this.privilegio
        });

        usuario.$save(function() {
            $window.alert('Se ha creado el usuario satisfactoriamente');
            $window.location.href ='views/admins/index.html'
        });

        this.email = "";
        this.password = "";
        this.privilegio = "";
    };
    $scope.remove = function(usuario) {
        if (usuario) {
            usuario.$remove();

            for (var i in $scope.usuarios) {
                if ($scope.usuarios[i] === usuario) {
                    $scope.usuarios.splice(i, 1);

                }
            }
        }
        else {
            $scope.usuario.$remove();
            $state.go('Usuarios');
        }
    };


    $scope.update = function() {
        var usuario = $scope.usuario;
        if (!usuario.updated) {
            usuario.updated = [];
        }
        usuario.updated.push(new Date().getTime());
        usuario.$update(function() {
            $window.alert('Se ha actualizado el usuario satisfactoriamente');
            $window.location.href ='views/admins/index.html'

        });
    };

    $scope.find = function() {
        Usuarios.query(function(usuarios) {
            $scope.usuarios = usuarios;

        });
    };

    $scope.findOne = function() {
        Usuarios.get({
            usuarioID: $stateParams.usuarioID
        }, function(usuario) {
            $scope.usuario = usuario;
        });
    };



}]);