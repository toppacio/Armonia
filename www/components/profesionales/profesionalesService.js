angular
    .module('ArmoniaApp')
    .factory('ProfesionalesService', ProfesionalesService);

function ProfesionalesService() {
    return {
        getAll: getAll
    }

    function getAll() {
        return [{
            "id": "1",
            "codigo": "MBONOMO",
            "descripcion": "Mariela Bonomo"
        }, {
            "id": "2",
            "codigo": "CHARLY",
            "descripcion": "El Carlos"
        }, {
            "id": "3",
            "codigo": "LAOTRA",
            "descripcion": "La otra Mariela"
        }]
    }
}