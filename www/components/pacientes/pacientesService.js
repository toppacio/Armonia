angular
    .module('ArmoniaApp')
    .factory('PacientesService', ['DB', PacientesService]);

function PacientesService(DB) {

    return {
        createPaciente: createPaciente,
        getPacientes: getPacientes,
        getPaciente: getPaciente,
        updatePaciente: updatePaciente
    }

    function createPaciente(paciente) {
        return DB.query("INSERT INTO pacientes (apellido, nombre, telefono, email, idObraSocial) values(?, ?, ?, ?, ?);", [paciente.apellido, paciente.nombre, paciente.telefono, paciente.email, paciente.idObraSocial]);
    }

    function getPacientes() {
        return DB.query('SELECT * FROM pacientes')
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    function getPaciente(codigo) {
        return DB.query('SELECT * FROM pacientes where id = ?', [codigo])
            .then(function(result) {
                return DB.fetch(result);
            });
    };


    function updatePaciente(paciente) {
        return DB.query(
                'UPDATE pacientes SET' //
                + ' apellido = ?, ' //
                + ' nombre = ?, ' //
                + ' telefono = ?, ' //
                + ' email = ?, ' //
                + ' idObraSocial = ? ' //
                + ' where id = ?' //
                , [paciente.apellido, paciente.nombre, paciente.telefono, paciente.email, paciente.idObraSocial, paciente.id]
            )
            .then(function(result) {
                return result;
            });
    };

}