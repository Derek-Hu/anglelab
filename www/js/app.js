// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
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
        controller: 'KPICtrl'
        
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dash');

})
.controller('KPICtrl', ['$scope', '$http', function($scope, $http) {

  $http({method: 'GET', url: 'http://58.246.227.27:8001/Zone.aspx?WareHouseId=3'}).then(function successCallback(response) {
      $scope.httpAjaxStatus = '使用http发送请求获取数据成功：'+JSON.stringify(response);
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
        $scope.httpAjaxStatus = '使用http发送请求获取数据失败 '+JSON.stringify(response);
    })

}])