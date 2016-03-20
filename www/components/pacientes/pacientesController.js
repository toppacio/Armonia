angular
	.module('ArmoniaApp')
	.controller('PacientesController', function PacientesController($rootScope, $scope, $state, $stateParams,
		PacientesService, ObrasSocialesService, HistoriasClinicasService,
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

		vm.titulo = "Pacientes";

		vm.stateCreate = 'pacientesCreate';
		vm.stateEdit = 'pacientesEdit';
		vm.stateView = 'pacientesView';
		vm.stateViewAll = 'pacientes';

		vm.saveChanges = function() {

			if (vm.isAbmStateCreate()) {
				PacientesService.createEntity(vm.selectedEntity).then(function() {


					var toast = $mdToast.simple()
						.textContent('Registro creado')
						.action('EDITAR')
						.highlightAction(true);
					$mdToast.show(toast).then(function(response) {
						if (response == 'ok') {
							$state.go(vm.stateEdit, {
								idEntity: vm.selectedEntity.id,
								abmMode: 'edit'
							});
						}
					});

					$state.go(vm.stateViewAll);
				}).catch(function(error) {
					alert(error.message);
				});
			} else if (vm.isAbmStateEdit()) {
				PacientesService.updateEntity(vm.selectedEntity).then(function() {
					var toast = $mdToast.simple()
						.textContent('Registro actualizado')
						.action('VOLVER A EDITAR')
						.highlightAction(true);
					$mdToast.show(toast).then(function(response) {
						if (response == 'ok') {
							$state.go(vm.stateEdit, {
								idEntity: vm.selectedEntity.id,
								abmMode: 'edit'
							});
						}
					});
					$state.go(vm.stateViewAll);
				}).catch(function(error) {
					alert(error.message);
				});
			}
		}

		vm.aditionalToolbarOptions = [{
			icon: "plus",
			action: "pacientesCreate"
		}, {
			icon: "filter",
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
			PacientesService.getAll().then(function(result) {
				angular.forEach(result, function(paciente) {
					vm.fillAdditionalEntityData(paciente);
				});
				vm.entities = result;
			});
		}

		vm.getOne = function(idEntity) {
			PacientesService.getOne(idEntity).then(function(result) {
				vm.fillAdditionalEntityData(result);
				vm.selectedEntity = result;
			});
		}

		vm.fillAdditionalEntityData = function(paciente) {
			paciente.transient = {};
			paciente.transient.mostrarDetallePaciente = false;
			for (var i = 0; i < vm.obrasSociales.length; i++) {
				if (paciente.idObraSocial == vm.obrasSociales[i].id) {
					paciente.transient.obraSocial = vm.obrasSociales[i];
					break;
				}
			}
		}

		/** Overrides >>> */


		/** <<< Particular */


		vm.obrasSociales = [];

		vm.init = function() {

			vm.obrasSociales = ObrasSocialesService.getAll();

			if (vm.isAbmStateViewAll()) {
				vm.getAll();
			}

			if (vm.isAbmStateEdit()) {
				vm.getOne($stateParams.idEntity);
			}

		}


		vm.init();

		vm.mostrarHistoriaClinica = function(ev, paciente) {
			//TODO: Cambiar esto por if getFechaUltimaVisita <> null
			HistoriasClinicasService.getAll(paciente.id).then(
				function(result) {
					if (result && result.length) {
						$state.go("historiasClinicasView", {
							idEntity: paciente.id
						});
					} else {
						var confirm = $mdDialog.confirm()
							.title('El paciente no tiene ninguna visita registrada ¿Generar historia clínica?')
							.targetEvent(ev)
							.ok('Aceptar')
							.cancel('Cancelar');
						$mdDialog.show(confirm).then(function() {
							$state.go("historiasClinicasCreate", {
								idEntity: paciente.id
							});
						});
					}
				}
			);
		}

		/** Particular >>> */


		return this;

	});