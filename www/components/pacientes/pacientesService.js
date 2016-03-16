angular
    .module('ArmoniaApp')
    .factory('PacientesService', ['DB', PacientesService]);

function PacientesService(DB) {

    return {
        getAll: getAll,
        getOne: getOne,
        createEntity: createEntity,
        updateEntity: updateEntity,
        deleteEntity: deleteEntity
    }

    function createEntity(entity) {
        return DB.query("INSERT INTO pacientes (apellido, nombre, telefono, email, idObraSocial) values(?, ?, ?, ?, ?);", [entity.apellido, entity.nombre, entity.telefono, entity.email, entity.idObraSocial]);
    }

    function getAll() {
        return DB.query('SELECT * FROM pacientes')
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    function getOne(id) {
        return DB.query('SELECT * FROM pacientes where id = ?', [id])
            .then(function(result) {
                return DB.fetch(result);
            });
    };


    function updateEntity(entity) {
        return DB.query(
                'UPDATE pacientes SET' //
                + ' apellido = ?, ' //
                + ' nombre = ?, ' //
                + ' telefono = ?, ' //
                + ' email = ?, ' //
                + ' idObraSocial = ? ' //
                + ' where id = ?' //
                , [entity.apellido, entity.nombre, entity.telefono, entity.email, entity.idObraSocial, entity.id]
            )
            .then(function(result) {
                return result;
            });
    };


    function deleteEntity(entity) {
        return DB.query(
                'DELETE FROM pacientes where id = ?' //
                , [entity.id]
            )
            .then(function(result) {
                return result;
            });
    };

}