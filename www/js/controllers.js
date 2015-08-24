angular.module('starter.controllers', [])
.controller('DemoCtrl', ['$scope', '$state',function($scope, $state) {
  $scope.goHome=function(){
    $state.go('dash');
  }  
}]);