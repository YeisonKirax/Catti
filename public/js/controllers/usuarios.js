angular.module('mean.usuarios').controller('UsuariosController', ['$scope','$stateParams', 'Global', 'Usuarios', '$state', function ($scope, $stateParams,  Global, Usuarios, $state) {
    $scope.global = Global;

    $scope.create = function() {
        var usuario = new Usuarios({
            email: this.email,
            password: this.password,
            privilegio: this.privilegio
        });

        usuario.$save(function(response) {
            $state.go('viewUsuario',{usuarioID: response.id})
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
        $state.go('viewUsuario',{usuarioID: usuario.id})

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