//Setting up route
angular.module('mean').config(['$stateProvider','$urlRouterProvider', '$compileProvider', function($stateProvider,$urlRouterProvider,$compileProvider) {


    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|callto|tel|skype):/);

    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('404');
        }]);
    });
    $stateProvider
        .state('home',{
            url : '/',
            controller : 'IndexController',
            templateUrl: 'views/index.html'
        })
        .state('SignInUsuario',{
            url : '/signinUsuario',
            templateUrl: 'views/usuarios/signin.html'
        })
        .state('AdminSignIn',{
            url:'/adminsignin',
            templateUrl:'views/admins/signin.html'
        })
        .state('SignUp',{
            url : '/signup',
            templateUrl: 'views/users/signup.html'
        })
        .state('Usuarios',{
            url : '/usuarios',
            controller : 'UsuariosController',
            templateUrl: 'views/usuarios/list.html'
        })
        .state('createUsuarios',{
            url : '/usuarios/create',
            controller : 'UsuariosController',
            templateUrl: 'views/usuarios/create.html'
        })
        .state('editUsuario',{
            url : '/usuarios/{usuarioID}/edit',
            controller : 'UsuariosController',
            templateUrl: 'views/usuarios/edit.html'
        })
        .state('viewUsuario',{
            url : '/usuarios/{usuarioID}',
            controller : 'UsuariosController',
            templateUrl: 'views/usuarios/view.html'
        })
        .state('Proyectos',{
            url : '/proyectos',
            controller : 'ProyectosController',
            templateUrl: 'views/proyectos/list.html'
        })
        .state('createProyecto',{
            url : '/proyectos/create',
            controller : 'ProyectosController',
            templateUrl: 'views/proyectos/create.html'
        })
        .state('editProyecto',{
            url : '/proyectos/{proyectoID}/edit',
            controller : 'ProyectosController',
            templateUrl: 'views/proyectos/edit.html'
        })
        .state('viewProyecto',{
            url : '/proyectos/{proyectoID}',
            controller : 'ProyectosController',
            templateUrl: 'views/proyectos/view.html'
        })
        .state('archivos',{
            url : '/archivo',
            controller : 'MyCtrl',
            templateUrl: 'views/archivos/index.html'
        })
        .state('iniciarLlamada',{
            url : '/llamadas/contactos/iniciar',
            controller : 'ContactosController',
            templateUrl: 'views/llamadas/iniciar-llamada.html'
        })
        .state('editarContacto',{
            url : '/llamadas/contactos/{contactoID}',
            controller : 'ContactosController',
            templateUrl: 'views/llamadas/edit-contact.html'
        })
        .state('articles',{
            url : '/articles',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/list.html'
        })
        .state('createArticle',{
            url : '/articles/create',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/create.html'
        })
        .state('editArticles',{
            url : '/articles/{articleId}/edit',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/edit.html'
        })
        .state('viewArticle',{
            url : '/articles/{articleId}',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/view.html'
        })
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);

}]);
