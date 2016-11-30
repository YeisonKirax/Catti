angular.module('mean.auth').controller('adminsignin', ['$scope', '$window', 'Global', '$state', 'AdminLogIn','Authentication', function ($scope, $window, Global, $state, AdminLogIn, Authentication) {
    $scope.global = Global;

    $scope.adminsignIn = function(user) {

        var logIn = new AdminLogIn({
            email: user.email,
            password: user.password
        });

        logIn.$save(function(response) {
            if(response.status === 'success'){
                $window.location.href = 'views/admins/index.html';
                //$state.go('perfilAdmin')
            }
        });
    };


}]);
