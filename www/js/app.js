angular.module('ArmoniaApp', ['formly', 'formlyBootstrap', 'ArmoniaApp.controllers', 'mobile-angular-ui', 'ui.router', 'ui.grid',
    'ui.grid.selection', 'ui.grid.edit', 'ui.grid.grouping', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.grid.autoResize', 'ui.grid.pagination',
    'ngToast'
  ])
  .constant('DB_CONFIG', {
    name: 'ArmoniaDB',
    tables: [{
      name: 'pacientes',
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
    }]
  })
  .run(function(DB) {
    DB.init();
  })

.config(['$stateProvider', '$urlRouterProvider', 'ngToastProvider', function($stateProvider, $urlRouterProvider, ngToastProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      template: '<p>HOME</p>'
    })
    .state('pacientes', {
      url: '/pacientes',
      templateUrl: 'components/common/abm-grid.html',
      controller: 'PacientesController',
      controllerAs: 'abmCtrl',
      params: {
        abmMode: 'viewAll'
      }
    })
    .state('pacientesCreate', {
      url: '/pacientes/crear',
      templateUrl: 'components/common/abm-form.html',
      controller: 'PacientesController',
      controllerAs: 'abmCtrl',
      params: {
        abmMode: 'create'
      }
    })
    .state('pacientesEdit', {
      url: '/pacientes/:idEntity/editar',
      templateUrl: 'components/common/abm-form.html',
      controller: 'PacientesController',
      controllerAs: 'abmCtrl',
      params: {
        abmMode: 'edit'
      }
    });


  $urlRouterProvider.otherwise('/');

  ngToastProvider.configure({
    animation: 'fade',
    timeout: '3000',
    dismissOnClick: true
  });

}]);