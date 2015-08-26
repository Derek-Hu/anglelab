angular.module('starter.directives', [])
.directive('onDoubleClick', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, $elm, $attrs) {
      var clicks = 0;
      var lastClick = new Date();
              $elm.bind('click', function (evt) {
                  var dateDiff = new Date() - lastClick;
                  if (dateDiff > 300) { // 300 ms
                      clicks = 0;
                  }
                  lastClick = new Date();
                  clicks++;
                  console.log('clicks'+clicks);
                  if (clicks == 1) {
                      $timeout(function () {
                          if (clicks == 1) {
                              //....
                          } else {
                              $scope.$apply(function () {
                                  $scope.$eval($attrs.onDoubleClick);
                              });
                          }
                      }, 300);
                  }
              });
          }
      };
}])
.directive('demoImg', ['$window' ,function ($window) {
    var imagOriginalWidth = 697;
    var imagOriginalHeight = 392; 
    var wUnit = 697;
    var hUnit = imagOriginalHeight * wUnit / imagOriginalWidth;
    var kpi = {
      url: '#/kpi',
      pos: [480, 183, 685, 265]
    };
    var green = {
      url:'#/green-cross',
      pos: [10, 275, 214, 357]
    };
    var imgMenuPos=[kpi,green];
    return {
      restrict: 'A',
      scope: {},
      template: '<area ng-repeat="img in imageMap" shape="rect" coords="{{img.coords}}" ng-href ="{{img.url}}" style="cursor:pointer;"/>',
      link: function ($scope, $elm, $attrs) {
        var width = $window.innerWidth;
        var height = Math.round(imagOriginalHeight * width / imagOriginalWidth);
        console.log('original = '+imagOriginalWidth +','+ imagOriginalHeight);
        console.log('current = '+width +','+ height);
        $scope.imageMap = [];
        for(var i=0;i<imgMenuPos.length;i++){
          var pos = imgMenuPos[i].pos;
          for(var j =0; j<pos.length;j++){
            if(j%2===0){
              pos[j]= Math.round(pos[j]*width/wUnit);
              console.log('x--', pos[j])
            }else{
              pos[j]= Math.round(pos[j]*height/hUnit);
              console.log('y--', pos[j])
            }
          }
          $scope.imageMap.push({
            coords : pos.join(','),
            url : imgMenuPos[i].url
          });
        }
      }
    }
}])
.directive('zoomable', ['$ionicGesture', function($ionicGesture) {
  return {
    restrict: 'A',
    scope: true,
    link: function($scope, $element, $attrs) {
      $scope.zoomIn = function(event)  {
        $scope.$root.type= 'zoom in';
        alert('zoom in ');
      };
      $scope.zoomOut = function(event)  {
        $scope.$root.type= '';
        alert('zoom out');
      };
      $scope.doubletap = function(event)  {
        $scope.$root.type= 'double';
        alert('double ');
      };
      var doubletapGesture = $ionicGesture.on('doubletap', $scope.doubletap, $element);      
      var pinchinGesture = $ionicGesture.on('pinchin', $scope.zoom, $element);      
      var pinchoutGesture = $ionicGesture.on('pinchout', $scope.zoom, $element);      

      // cleanup
      $scope.$on('$destroy', function() {
        $ionicGesture.off(doubletapGesture, 'doubletap', $element);
        $ionicGesture.off(pinchinGesture, 'pinchin', $element);
        $ionicGesture.off(pinchoutGesture, 'pinchout', $element);
      });
    }
  };
}]);
