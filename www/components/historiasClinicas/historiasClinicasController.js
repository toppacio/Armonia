angular
    .module('ArmoniaApp')
    .controller('HistoriasClinicasController', function HistoriasClinicasController($rootScope, $scope, $state, $stateParams,
        PacientesService, HistoriasClinicasService, ProfesionalesService,
        UtilsService,
        $mdToast, $mdDialog) {


        /** <<< Funciones Template */

        var vm = this;

        vm.getAbmMode = function() {
            return $stateParams.abmMode;
        }

        vm.isAbmStateViewAll = function() {
            return $stateParams.abmMode == 'viewAll';
        }

        vm.isAbmStateView = function() {
            return $stateParams.abmMode == 'view';
        }

        vm.isAbmStateCreate = function() {
            return $stateParams.abmMode == 'create';
        }

        vm.isAbmStateEdit = function() {
            return $stateParams.abmMode == 'edit';
        }

        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from;
        });

        vm.goToPreviousState = function() {
            if ($rootScope.previousState) {
                $state.go($rootScope.previousState.name, $rootScope.previousState.params);
            } else {
                $state.go("home");
            }
        }

        vm.aditionalToolbarOptions = [];

        vm.selectedEntity = {};

        vm.entities = [];

        vm.getEntities = function() {
            return vm.entities;
        }

        vm.showConfirmDelete = function(ev, entity) {
            var confirm = $mdDialog.confirm()
                .title('¿Confirma el borrado del registro?')
                .targetEvent(ev)
                .ok('Borrar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                vm.deleteEntity(entity);
            });
        };


        /** Funciones Template >>>*/

        /** <<< Overrides */

        vm.titulo = "Historia Clínica";

        vm.stateCreate = 'historiasClinicasCreate';
        vm.stateEdit = 'historiasClinicasView';
        vm.stateView = 'historiasClinicasView';
        vm.stateViewAll = 'historiasClinicasView';

        vm.saveChanges = function() {

            if (!vm.selectedEntity.id) {
                HistoriasClinicasService.createEntity(vm.selectedEntity).then(function() {

                    var toast = $mdToast.simple()
                        .textContent('Registro creado')
                        .highlightAction(true);
                    $mdToast.show(toast);

                    $state.go(vm.stateView, {
                        idEntity: vm.paciente.id
                    });
                }).catch(function(error) {
                    alert(error.message);
                });
            } else {
                HistoriasClinicasService.updateEntity(vm.selectedEntity).then(function() {
                    vm.selectedEntity.transient.mostrarEditor = false;
                    var toast = $mdToast.simple()
                        .textContent('Registro actualizado')
                        .action('VOLVER A EDITAR')
                        .highlightAction(true);
                    $mdToast.show(toast).then(function(response) {
                        if (response == 'ok') {
                            vm.selectedEntity.transient.mostrarEditor = true;
                        }
                    });
                }).catch(function(error) {
                    alert(error.message);
                });
            }
        }

        vm.aditionalToolbarOptions = [{
            icon: "plus",
            action: "pacientesCreate"
        }];

        vm.deleteEntity = function(entity) {
            PacientesService.deleteEntity(entity);
            $mdToast.show(
                $mdToast.simple()
                .textContent('Registro Eliminado')
            );
            var indexToRemove = vm.entities.indexOf(entity);
            if (indexToRemove > -1) {
                vm.entities.splice(indexToRemove, 1);
            }
        }


        vm.getAll = function() {
            HistoriasClinicasService.getAll().then(function(result) {
                vm.entities = result;
            });
        }

        vm.fillAdditionalEntityData = function(historiaClinica) {
            historiaClinica.transient = {};
            historiaClinica.transient.mostrarEditor = false;
            for (var i = 0; i < vm.profesionales.length; i++) {
                if (historiaClinica.idProfesional == vm.profesionales[i].id) {
                    historiaClinica.transient.profesional = vm.profesionales[i];
                    break;
                }
            }
        }

        /** Overrides >>> */


        /** <<< Particular */

        vm.profesionales = [];
        vm.paciente = {};

        vm.init = function() {

            vm.profesionales = ProfesionalesService.getAll();

            //TODO: Ver como optimizar trayendo los datos de la pantalla anterior
            if (vm.isAbmStateView()) {
                PacientesService.getOne($stateParams.idEntity)
                    .then(
                        function(paciente) {
                            vm.paciente = paciente;
                            HistoriasClinicasService.getAll($stateParams.idEntity)
                                .then(
                                    function(historiasClinicas) {
                                        if (historiasClinicas.length == 0) {
                                            $state.go(vm.stateCreate, {
                                                idEntity: vm.paciente.id
                                            });
                                        } else {
                                            angular.forEach(historiasClinicas, function(historiaClinica) {
                                                vm.fillAdditionalEntityData(historiaClinica, vm.paciente);
                                            });
                                            vm.entities = historiasClinicas;
                                        }
                                    })
                                .catch(function(error) {
                                    alert(error.message)
                                });
                        })
                    .catch(
                        function(error) {
                            alert(error.message)
                        }
                    );

            }

            if (vm.isAbmStateCreate()) {
                PacientesService.getOne($stateParams.idEntity)
                    .then(
                        function(paciente) {
                            vm.paciente = paciente;
                            vm.selectedEntity = {};
                            vm.selectedEntity.idPaciente = $stateParams.idEntity;
                            vm.selectedEntity.fecha = new Date();
                        })
                    .catch(
                        function(error) {
                            alert(error);
                        });
            }


        }


        vm.init();

        /** Particular >>> */


        return this;

    });