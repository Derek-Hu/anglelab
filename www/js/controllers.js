angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', 'Backend', function($scope, Backend) {
  $scope.col=3;
  $scope.$on('$ionicView.enter', function(e) {
    Backend.menu.query(function(menus){
      console.log(menus);
      $scope.menus=menus;
    });
  });
}])

.controller('OrgCtrl', ['$scope', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {

  });

  
}])


.controller('AttendCtrl', ['$scope', 'Backend', '$window', function($scope, Backend, $window) {
  
  $scope.chart = {
   title: "审核问题关闭率（月度KPI样例）",
   data:  [],
   yLabel: "审核问题关闭率"
  }

  $scope.$on('$ionicView.enter', function(e) {
    Backend.kaoqin.query(function(data){
      $scope.chart.data=data;
    });
  });
}])

.controller('AccountCtrl', ['$scope', function($scope) {
  
}]);
