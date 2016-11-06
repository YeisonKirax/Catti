
angular.module('mean.auth').service("FacebookAuth", ['$resource', function($resource) {
    return $resource('/auth/facebook');
}]);
angular.module('mean.auth').service("TwitterAuth", ['$resource', function($resource) {
    return $resource('/auth/twitter');
}]);
angular.module('mean.auth').service("GoogleAuth", ['$resource', function($resource) {
    return $resource('/auth/google');
}]);
angular.module('mean.auth').service("SignOut", ['$resource', function($resource) {
    return $resource('/signout');
}]);
angular.module('mean.auth').service("LogIn", ['$resource', function($resource) {
    return $resource('/usuarios/session');
}]);
angular.module('mean.auth').service("AdminLogIn", ['$resource', function($resource) {
    return $resource('/admins/session');
}]);
angular.module('mean.auth').service("SignUp", ['$resource', function($resource) {
    return $resource('/usuarios');
}]);