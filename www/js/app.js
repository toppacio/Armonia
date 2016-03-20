angular.module('ArmoniaApp', ['formly', 'formlyBootstrap', 'ArmoniaApp.controllers', 'ui.router',
    'ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.grouping', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.grid.autoResize', 'ui.grid.pagination',
    'ngMaterial'
  ])
  .constant('DB_CONFIG', {
    name: 'ArmoniaDB',
    tables: [{
      name: 'paciente',
      columns: [{
        name: 'id',
        type: 'integer primary key autoincrement'
      }, {
        name: 'apellido',
        type: 'text'
      }, {
        name: 'nombre',
        type: 'text'
      }, {
        name: 'telefono',
        type: 'text'
      }, {
        name: 'email',
        type: 'text'
      }, {
        name: 'idObraSocial',
        type: 'integer'
      }]
    }, {
      name: 'historiaClinica',
      columns: [{
        name: 'id',
        type: 'integer primary key autoincrement'
      }, {
        name: 'idPaciente',
        type: 'integer'
      }, {
        name: 'fecha',
        type: 'text'
      }, {
        name: 'idProfesional',
        type: 'text'
      }, {
        name: 'detale',
        type: 'text'
      }]
    }]
  })
  .run(function(DB) {
    DB.init();
  })

.config(function($stateProvider, $urlRouterProvider, $mdIconProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        content: {
          template: '<p>HOME</p>'
        }
      }
    })
    .state('pacientes', {
      url: '/pacientes',
      views: {
        'toolbarOptions': {
          templateUrl: 'components/pacientes/pacientesViewAllToolbar.html',
          controller: 'PacientesController',
          controllerAs: 'abmCtrl'
        },
        'content': {
          templateUrl: 'components/pacientes/pacientesViewAll.html',
          controller: 'PacientesController',
          controllerAs: 'abmCtrl'
        }
      },
      params: {
        abmMode: 'viewAll'
      }
    })
    .state('pacientesCreate', {
      url: '/pacientes/crear',
      views: {
        'content': {
          templateUrl: 'components/pacientes/pacientesEdit.html',
          controller: 'PacientesController',
          controllerAs: 'abmCtrl'
        }
      },
      params: {
        abmMode: 'create'
      }
    })
    .state('pacientesEdit', {
      url: '/pacientes/:idEntity/editar',
      views: {
        'content': {
          templateUrl: 'components/pacientes/pacientesEdit.html',
          controller: 'PacientesController',
          controllerAs: 'abmCtrl'
        }
      },
      params: {
        abmMode: 'edit'
      }
    })
    .state('historiasClinicasView', {
      url: '/historiasClinicas/:idEntity/ver',
      views: {
        'content': {
          templateUrl: 'components/historiasClinicas/historiasClinicasView.html',
          controller: 'HistoriasClinicasController',
          controllerAs: 'abmCtrl'
        }
      },
      params: {
        abmMode: 'view'
      }
    })
    .state('historiasClinicasCreate', {
      url: '/historiasClinicas/:idEntity/create',
      views: {
        'content': {
          templateUrl: 'components/historiasClinicas/historiasClinicasEdit.html',
          controller: 'HistoriasClinicasController',
          controllerAs: 'abmCtrl'
        }
      },
      params: {
        abmMode: 'create'
      }
    });


  $urlRouterProvider.otherwise('/');

  //TODO: Optimizar, ver si se cargan al inicio en el run de esta forma:

  // var urls = [ 'imy/app/icons.svg', 'img/icons/android.svg'];
  // angular.forEach(urls, function(url) {
  //   $http.get(url, {cache: $templateCache});
  // });

  $mdIconProvider
    .defaultIconSet('img/mdi.svg')



});