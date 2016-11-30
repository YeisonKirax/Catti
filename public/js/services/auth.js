angular.module('mean.usuarios').factory('Authentication',[
    function(){
        this.user = window.user;
        
        return {
            user: this.user
         };
    }   
]);
