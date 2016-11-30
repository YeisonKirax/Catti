//Global service for global variables
angular.module('mean.system').factory("Global", [
    function() {
        this.user = window.user;

        return {
            user: this.user
        };
    }
]);

