angular.module('mean.system').controller('IndexController', ['$scope','$modal', 'Authentication', function ($scope,$modal, Authentication) {
    $scope.authentication = Authentication;

}]);

