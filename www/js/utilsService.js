angular
    .module('ArmoniaApp')
    .factory('UtilsService', function() {
        return {
            convertObjectListToValueNameList: convertObjectListToValueNameList
        }        

        function convertObjectListToValueNameList(objectList, nameFieldName, valueFieldName) {
            var result = [];

            angular.forEach(objectList, function(object){
                result.push({name: object[nameFieldName], value: object[valueFieldName]});
            });

            return result;
        }
    });