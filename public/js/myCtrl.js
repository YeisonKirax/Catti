var app = angular.module("myApp",[]);

app.controller("myCtrl", function($scope,$http) {
    $scope.title="Listar Usuario";
    $scope.title2="Registrar Usuario";
    $scope.title3="Actualizar Usuario";
    $scope.title4="Eliminar Usuario";
    $scope.formData = {};
    /*$scope.firstName = "John";
     $scope.lastName= "Doe";*/

    var onGetByIdCompleted = function(response){
        $scope.person = response.data;
        console.log(response.data);
    };

    $scope.searchPerson = function(id){
        $http.get('/api/usuarios/' + id)
            .then(onGetByIdCompleted, onError);
        console.log(id);
    };

    $http.get('/api/usuarios')
        .success(function(data) {
            $scope.users = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.crearUsuario = function(){
        $http.post('/api/usuarios', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    /*$scope.updateUsuario = function(id) {
        $http.put('/api/usuarios/' + id, $scope.formData)
            .success(function(data) {
                $scope.displayForm = true;
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };*/


    var onUpdateUsuarioCompleted = function(response){
        $scope.usuario = response.data;
        console.log(response.data);
        refresh();
    };

    $scope.updateUsuario = function(id){
        $http.put('/api/usuarios/'+ id.id)
            .then(onUpdateUsuarioCompleted, onError);
        console.log(id);
    };



    $scope.deleteUsuario = function(id) {
        $http.delete('/api/usuarios/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
});
/*app.controller("mysCtrl", function($scope,$http) {
 //$scope.title = "Listar Usuario";
 $scope.title2 = "Registrar Usuario";
 });*/