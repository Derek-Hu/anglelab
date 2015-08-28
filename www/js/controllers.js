angular.module('starter.controllers', [])
.controller('DemoCtrl', ['$scope', '$state', '$ionicScrollDelegate', function($scope, $state, $ionicScrollDelegate) {
  $scope.goHome = function(type) {
    var scrollDelegate = $ionicScrollDelegate.$getByHandle(type);
    var view = scrollDelegate.getScrollView();
    var scale = view.__zoomLevel;
    console.log('scale:'+scale);
    if(scale===1){
      if(type !== 'home'){
        $state.go('dash');
      }
    }else{
      scrollDelegate.zoomTo(1, true, 0, 0);
    }
  }
}]);