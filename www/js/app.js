var routers = require('./pages');
var LocalStorageModule = require('angular-local-storage');

angular.module('starter', [routers, LocalStorageModule, 'ionic', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $window, localStorageService) {

    $rootScope.$on('$stateChangeSuccess', function() {
        var loginUser = localStorageService.get('loginUser');

        $rootScope.loginUser = loginUser;
    });
    $rootScope.historyBack = function() {
        $window.history.back();
    };

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });

    ionic.Platform.ready(function() {
        // will execute when device is ready, or immediately if the device is already ready.
        ionic.Platform.fullScreen(false, true);
    });
});



(function() {
    document.addEventListener("deviceready", function() {
        var initInjector = angular.injector(["starter.services"]);
        var Constant = initInjector.get("Constant");
        Constant.initBackendURL().then(function() {
            angular.element(document).ready(function() {
                angular.bootstrap(document, ['starter']);
            });
        });
    }, false);
})();
