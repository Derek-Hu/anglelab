// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'LocalStorageModule', 'ngResource', 'starter.controllers', 'starter.services','d3', 'starter.directives'])

.run(function($ionicPlatform, $rootScope, $window) {
  $rootScope.historyBack = function(){
    $window.history.back();
  }
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
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    /*.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })*/

  // Each tab has its own nav history stack:

  .state('dash', {
    url: '/dash',
    views: {
      'dash': {
        templateUrl: 'templates/dash.html',
        controller: 'DashCtrl'
        
      }
    }
  })
  .state('gwrx', {
      url: '/gwrx/:PageType',
      views: {
        'dash': {
          templateUrl: 'templates/gwrx.html',
          controller: 'GwrxCtrl'
        }
      }
    })
  .state('lgjh', {
    url: '/lgjh/:PageType',
    views: {
      'dash': {
        templateUrl: 'templates/lgjh.html',
        controller: 'LgjhCtrl'
      }
    }
  })
  .state('entry', {
    url: '/entry',
    views: {
      'dash': {
        templateUrl: 'templates/entry.html',
        controller: 'EntryCtrl'
      }
    }
  })
  .state('org', {
      url: '/org/:PageType',
      views: {
        'dash': {
          templateUrl: 'templates/org.html',
          controller: 'OrgCtrl'
        }
      }
    })
    .state('kpi', {
      url: '/kpi',
      views: {
        'dash': {
          templateUrl: 'templates/kpi-group.html',
          controller: 'KPICtrl'
        }
      }
    })
    .state('demo', {
      url: '/demo',
      views: {
        'dash': {
          templateUrl: 'templates/chart-demo.html',
          controller: 'KPICtrl'
        }
      }
    })
  .state('kqhz', {
      url: '/kqhz/:PageType',
      views: {
        'dash': {
          templateUrl: 'templates/kqhz.html',
          controller: 'kqhzCtrl'
        }
      }
    })
  .state('green-cross', {
      url: '/green-cross/:aspect/:PageType/:BizType',
      views: {
        'dash': {
          templateUrl: 'templates/green-cross.html',
          controller: 'GreenCrossCtrl'
        }
      }
    })
  .state('kpi-item', {
      url: '/kpi-item/:aspect/:PageType/:BizType',
      views: {
        'dash': {
          templateUrl: 'templates/kpi-chart.html',
          controller: 'KPIChartCtrl'
        }
      }
    })
  .state('kpi-detail', {
      url: '/kpi/:aspect/:PageType',
      views: {
        'dash': {
          templateUrl: 'templates/kpi-detail.html',
          controller: 'DashCtrl'
        }
      }
    })
  .state('view-board', {
      url: '/view-board',
      views: {
        'dash': {
          templateUrl: 'templates/view-board.html',
          controller: 'ViewBoardCtrl'
        }
      }
    })
  .state('kpi-view-board', {
      url: '/view-board',
      views: {
        'dash': {
          templateUrl: 'templates/view-board.html',
          controller: 'ViewBoardCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/entry');

});
