angular
    .module('ArmoniaApp')
    .factory('HistoriasClinicasService', ['DB', HistoriasClinicasService]);

function HistoriasClinicasService(DB) {

    return {
        getAll: getAll,
        createEntity: createEntity,
        updateEntity: updateEntity,
        deleteEntity: deleteEntity
    }

    function getAll(idPaciente) {
        return DB.query('SELECT * FROM historiaClinica WHERE idPaciente = ?', [idPaciente])
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    function createEntity(entity) {
        return DB.query("INSERT INTO historiaClinica (idPaciente, fecha, idProfesional, detalle) values(?, ?, ?, ?);", [entity.idPaciente, entity.fecha, entity.idProfesional, entity.detalle]);
    }


    function updateEntity(entity) {
        return DB.query(
                'UPDATE historiaClinica SET' //
                + ' fecha = ?, ' //
                + ' idProfesional = ?, ' //
                + ' detalle = ? ' //
                + ' where id = ?' //
                , [entity.fecha, entity.idProfesional, entity.detalle, entity.id]
            )
            .then(function(result) {
                return result;
            });
    };


    function deleteEntity(entity) {
        return DB.query(
                'DELETE FROM historiaClinica where id = ?' //
                , [entity.id]
            )
            .then(function(result) {
                return result;
            });
    };

}