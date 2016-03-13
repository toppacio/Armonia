angular
    .module('ArmoniaApp')
    .factory('DB', function($q, DB_CONFIG) {

        var vm = this;
        vm.db = null;

        vm.init = function() {
            // Use vm.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
            vm.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

            angular.forEach(DB_CONFIG.tables, function(table) {
                var columns = [];

                angular.forEach(table.columns, function(column) {
                    columns.push(column.name + ' ' + column.type);
                });

                var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
                vm.query(query).catch(
                    function(error) {
                        alert(error.message);
                    }
                    );
                console.log('Table ' + table.name + ' initialized');
            });
        };

        vm.query = function(query, bindings) {
            bindings = typeof bindings !== 'undefined' ? bindings : [];
            var deferred = $q.defer();

            vm.db.transaction(function(transaction) {
                transaction.executeSql(query, bindings, function(transaction, result) {
                    deferred.resolve(result);
                }, function(transaction, error) {
                    deferred.reject(error);
                });
            });

            return deferred.promise;
        };

        vm.fetchAll = function(result) {
            var output = [];

            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }

            return output;
        };

        vm.fetch = function(result) {
            return result.rows.item(0);
        };

        return vm;
    });