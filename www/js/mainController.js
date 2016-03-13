angular
    .module('ArmoniaApp')
    .controller('MainController', function MainController($rootScope, $scope) {

        // Needed for the loading screen
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.loading = false;
        });

    });