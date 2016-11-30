//Setting up route
angular.module('mean').config(['$stateProvider','$urlRouterProvider', '$compileProvider','$sceDelegateProvider', function($stateProvider,$urlRouterProvider,$compileProvider, $sceDelegateProvider) {


    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|callto|tel|skype):/);


    $sceDelegateProvider.resourceUrlWhitelist(['**']);


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
        .state('perfilAdmin',{

            url: '/admin/index',
            templateUrl: 'views/admins/index.html'

        })
        .state('signoutAdmin',{
            url: '/signoutAdmin',
            templateUrl:'views/index.html'
        })
        .state('signoutUsuario',{
            url: '/signoutUsuario',
            templateUrl:'views/index.html'
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
        .state('escucharGrab',{
            url : '/escucharxd',
            templateUrl: 'views/grabaciones/escuchar.html'
        })
        .state('grabacion',{
            url : '/grabacion',
            controller : 'GrabacionesController',
            templateUrl: 'views/grabaciones/subir_mp3.html'
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
        .state('ContactosADMIN',{
            url : '/contactos',
            controller : 'ContactosAController',
            templateUrl: 'views/contactos/list.html'
        })
        .state('editarContactoADMIN',{
            url : '/contactos/{contactoID}/edit',
            controller : 'ContactosAController',
            templateUrl: 'views/contactos/edit.html'
        })
        .state('Encuestas',{
            url : '/encuestas',
            controller : 'EncuestasController',
            templateUrl: 'views/encuestas/list.html'
        })
        .state('createEncuesta',{
            url : '/encuestas/create',
            controller : 'EncuestasController',
            templateUrl: 'views/encuestas/create.html'
        })
        .state('editEncuesta',{
            url : '/encuestas/{encuestaID}/edit',
            controller : 'EncuestasController',
            templateUrl: 'views/encuestas/edit.html'
        })
        .state('viewEncuesta',{
            url : '/encuestas/{encuestaID}',
            controller : 'EncuestasController',
            templateUrl: 'views/encuestas/view.html'
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
