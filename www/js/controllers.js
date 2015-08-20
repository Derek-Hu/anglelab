angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', 'Backend', function($scope, Backend) {
  $scope.col=3;
  Backend.menu.query(function(menus){
    $scope.menus=menus;
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

.controller('AttendCtrl', ['$scope', '$stateParams', '$window', function($scope, $stateParams, $window) {
  var data = [{"month":"1","frequency":0.03167,"expect":"0.03167"},{"month":"2","frequency":0.01492,"expect":"0.01782"},{"month":"3","frequency":0.02782,"expect":"0.02782"},{"month":"4","frequency":0.03253,"expect":"0.02782"},{"month":"5","frequency":0.02702,"expect":"0.03820"},{"month":"6","frequency":0.02288,"expect":"0.02782"},{"month":"7","frequency":0.02015,"expect":"0.02782"},{"month":"8","frequency":0.04094,"expect":"0.02782"},{"month":"9","frequency":0.03966,"expect":"0.02700"},{"month":"10","frequency":0.02153,"expect":"0.02000"},{"month":"11","frequency":0.02772,"expect":"0.02782"},{"month":"12","frequency":0.01025,"expect":"0.01982"}];
  data=[];
  $scope.chart = {
   title: "审核问题关闭率（月度KPI样例）",
   yLabel: "审核问题关闭率",
   data:  data,
   width: $window.innerWidth,
   height: $window.innerHeight
  }
}])

.controller('AccountCtrl', ['$scope', function($scope) {
  
}]);
