// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ui.bootstrap', 'LocalStorageModule', 'ngResource', 'starter.controllers', 'starter.services','d3', 'starter.directives'])

.run(function($ionicPlatform, $rootScope, $window, localStorageService) {

  $rootScope.$on('$stateChangeSuccess', function (event, routeData) {
    var loginUser = localStorageService.get('loginUser');
    $rootScope.loginUser = loginUser;
  });
  $rootScope.historyBack = function(){
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

    ionic.Platform.ready(function(){
    // will execute when device is ready, or immediately if the device is already ready.
      ionic.Platform.fullScreen(false, true);
    });
});
