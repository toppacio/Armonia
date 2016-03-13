angular
	.module('ArmoniaApp')
	.controller('PacientesController', function PacientesController($rootScope, $scope, $state, $stateParams, PacientesService, ObrasSocialesService, UtilsService, ngToast) {

		var vm = this;

		
		/** <<< Pre Overrides */

		vm.gridColumns = [{
			field: 'apellido'
		}, {
			field: 'nombre'
		}, {
			field: 'telefono'
		}, {
			field: 'idObraSocial'
		}];

		/** Pre Overrides >>> */

		/** <<< Funciones Template */

		/** <<< Manejo de estado*/

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

		/** Manejo de estado >>>*/

		vm.gridOptions = {
			columnDefs: vm.gridColumns,
			enableRowSelection: true,
			enableRowHeaderSelection: false,
			enableSorting: true,
			enableColumnResizing: true,
			multiSelect: false,
			modifierKeysToMultiSelect: false,
			noUnselect: false,
			enableFiltering: true,
			paginationPageSizes: [5, 10, 20, 50],
			paginationPageSize: 5,
			appScopeProvider: {
				onDblClick: function(row) {
					if (!row.isSelected) {
						// Esto es porque si no hay nada elegido y se hace doble click, aca llegaba row.isSelected= false
						vm.gridApi.selection.selectRow(row.entity);
					}

					vm.setSelectedRow(row);
					$state.go(vm.stateEdit, {
						idEntity: vm.selectedEntity.id
					});
				}
			},
			// Para registrar el doble click, tengo que agregarlo al rowTemplate de esta forma:
			rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell ></div>"
		}

		vm.selectedEntity = {};

		vm.setSelectedRow = function(row) {
			if (row.isSelected) {
				vm.selectedEntity = row.entity;
			} else {
				vm.selectedEntity = {};
			}
		}

		vm.gridOptions.data = [];
		vm.gridOptions.onRegisterApi = function(gridApi) {

			vm.gridApi = gridApi;
			vm.gridApi.selection.on.rowSelectionChanged($scope, function(row) {
				vm.setSelectedRow(row);
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
				PacientesService.createPaciente(vm.selectedEntity).then(function() {
					ngToast.success({
						content: 'Registro creado'
					});
					$state.go(vm.stateViewAll);
				}).catch(function(error) {
					alert(error.message);
				});
			} else if (vm.isAbmStateEdit()) {
				PacientesService.updatePaciente(vm.selectedEntity).then(function() {
					ngToast.success({
						content: 'Actualización correcta'
					});
					$state.go(vm.stateViewAll);
				}).catch(function(error) {
					alert(error.message);
				});
			}
		}

		/** Overrides >>> */


		vm.init = function() {

			vm.obrasSociales = ObrasSocialesService.getObrasSociales();

			if (vm.isAbmStateViewAll()) {
				vm.getAll();
			}

			if (vm.isAbmStateEdit()) {
				PacientesService.getPaciente($stateParams.idEntity).then(function(result) {
					vm.selectedEntity = result;
				});
			}

		}


		
		vm.getAll = function() {
			PacientesService.getPacientes().then(function(result) {
				vm.gridOptions.data = result;
			});
		}


		/** <<< Particular */

		vm.obrasSociales = [];

		/** Particular >>> */


		vm.init();


		/** <<< Post Init */

		vm.formFields = [{
			key: 'apellido',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Apellido',
				placeholder: 'Ingrese apellido/s',
				required: true
			}
		}, {
			key: 'nombre',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Nombre',
				placeholder: 'Ingrese nombre/s',
				required: true
			}
		}, {
			key: 'telefono',
			type: 'input',
			templateOptions: {
				type: 'telefono',
				label: 'Teléfono',
				placeholder: 'Ingrese telefono',
				required: false
			}
		}, {
			key: 'email',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'Dirrección e-mail',
				placeholder: 'Ingrese dirrección de e-mail',
				required: false
			}
		}, {
			key: 'idObraSocial',
			type: 'select',
			templateOptions: {
				label: 'Obra Social',
				placeholder: 'Seleccione obra social',
				options: UtilsService.convertObjectListToValueNameList(vm.obrasSociales, "descripcion", "codigo"),
				required: false
			}
		}];

		/** Post init */

		return this;

	});