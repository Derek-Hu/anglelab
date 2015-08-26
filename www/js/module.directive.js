angular.module('starter.directives', [])
.directive('onDoubleClick', function ($timeout) {
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
})
.directive('demoImg', ['$window' ,function ($window) {
    var imagOriginalWidth = 2048
    var imagOriginalHeight = 1200; 
    var wUnit = 1000;
    var hUnit = imagOriginalHeight * wUnit / imagOriginalWidth;
    var kpi = {
      url: '#/kpi',
      pos: [688, 271, 980, 388]
    };
    var green = {
      url:'#/green-cross',
      pos: [18, 402, 309, 519]
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
.directive('zoomable', function($timeout, $ionicGesture) {
  return {
    restrict: 'A',
    scope: true,
    link: function($scope, $element, $attrs) {
      var minHeight, minWidth, maxHeight, maxWidth;

      // set max/min size after image is loaded
      $element.bind('load', function() {
        var el = $element[0];
        minHeight = el.height;
        minWidth = el.width;
        maxHeight = el.naturalHeight;
        maxWidth = el.naturalWidth;
      });

      // pinch to scale
      var handlePinch = function(e) {
        e.gesture.srcEvent.preventDefault();
        $scope.$apply(function() {
          TweenMax.set($element, { scale: e.gesture.scale });
        });
      };
      handlePinch = ionic.animationFrameThrottle(handlePinch);
      var pinchGesture = $ionicGesture.on('pinch', handlePinch, $element);

      // resize after done
      var handleTransformEnd = function() {
        //resize zoomable container
        var newHeight, newWidth;
        var dimensions = $element[0].getBoundingClientRect();

        newHeight = Math.round(dimensions.height);
        newWidth = Math.round(dimensions.width);

        // upper bounds (dictated by naturalHeight and naturalWidth of image)
        newHeight = Math.min(newHeight, maxHeight);
        newWidth = Math.min(newWidth, maxWidth);

        // lower bounds (dictacted by screen)
        newHeight = Math.max(newHeight, minHeight);
        newWidth = Math.max(newWidth, minWidth);

        $scope.$apply(function() {
          TweenMax.set($element, { clearProps: 'scale' });
          $scope.containerStyle.height = newHeight + 'px';
          $scope.containerStyle.width = newWidth + 'px';
        });
      };
      var resizeGesture = $ionicGesture.on('transformend', handleTransformEnd, $element);

      // cleanup
      $scope.$on('$destroy', function() {
        $ionicGesture.off(pinchGesture, 'pinch', $element);
        $ionicGesture.off(resizeGesture, 'transformend', $element);
      });
    }
  };
});
