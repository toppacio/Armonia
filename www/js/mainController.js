angular
    .module('ArmoniaApp')
    .controller('MainController', function MainController($rootScope, $scope, $mdSidenav) {

        var vm = this;

        // Needed for the loading screen
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.loading = false;
        });

        vm.toggleMenu = function() {
            $mdSidenav('left').toggle();
        }

        return vm;

    });