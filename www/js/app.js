angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('dash', {
    url: '/dash',
    views: {
      'dash': {
        templateUrl: 'templates/dash.html',
        controller: 'DemoCtrl'
      }
    }
  })
  .state('kpi', {
      url: '/kpi',
      views: {
        'dash': {
          templateUrl: 'templates/bz-KPI.html',
          controller: 'DemoCtrl'
        }
      }
    })
  .state('kqhz', {
      url: '/kqhz',
      views: {
        'dash': {
          templateUrl: 'templates/kqhz.html',
          controller: 'DemoCtrl'
        }
      }
    })
  .state('green-cross', {
      url: '/green-cross',
      views: {
        'dash': {
          templateUrl: 'templates/green-cross.html',
          controller: 'DemoCtrl'
        }
      }
    })  
  $urlRouterProvider.otherwise('/dash');

});
