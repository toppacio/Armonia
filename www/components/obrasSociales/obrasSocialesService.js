angular
	.module('ArmoniaApp')
	.factory('ObrasSocialesService', ObrasSocialesService);

function ObrasSocialesService() {
	return {
		getObrasSociales: getObrasSociales
	}

	function getObrasSociales() {
		return [{
			"id": "1",
			"codigo": "OSDE",
			"descripcion": "Obra Social de Empleados de Comercio"
		}, {
			"id": "2",
			"codigo": "OSPESA",
			"descripcion": "Ola k ase"
		}, {
			"id": "3",
			"codigo": "OLA",
			"descripcion": "Ola k Ola"
		}]
	}
}