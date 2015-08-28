angular.module('starter.controllers', [])
.controller('DemoCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.goHome=function(){
    $state.go('dash');
  }
}])
.controller('HomeCtrl', ['$scope', '$state', '$window', '$ionicScrollDelegate', '$timeout', function($scope, $state, $window, $ionicScrollDelegate, $timeout) {
  $scope.goHome=function(){
    $state.go('dash');
  }
}]);