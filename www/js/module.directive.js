angular.module('starter.directives', [])
/*.directive('onDoubleClick', ['$timeout', function ($timeout) {
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
}])*/
.directive('demoImg', ['$window' ,function ($window) {
    var kpi = {
      url: '#/kpi',
      pos: [705, 364, 1003, 482]
    };
    var green = {
      url:'#/green-cross',
      pos: [18, 584, 316, 667]
    };
    var kqhz = {
      url: '#/kqhz',
      pos: [362, 184, 660, 303]
    };
    var imgMenuPos=[kpi,green,kqhz];

    var imagOriginalWidth = 2048;
    var imagOriginalHeight = 1536; 
    var wUnit = 1024;
    var hUnit = imagOriginalHeight * wUnit / imagOriginalWidth;
    var template = '<area shape="rect" coords="{{coords}}" href ="{{url}}" style="cursor:pointer;"/>';

    return {
      restrict: 'A',
      scope: {},
      template: '<area ng-repeat="img in imageMap" shape="rect" coords="{{img.coords}}" ng-href ="{{img.url}}" style="cursor:pointer;"/>',
      link: function ($scope, $elm, $attrs) {
        var width = $window.innerWidth;
        var height = Math.round(imagOriginalHeight * width / imagOriginalWidth);
        //console.log('original = '+imagOriginalWidth +','+ imagOriginalHeight);
        //console.log('current = '+width +','+ height);
        $scope.imageMap = [];
        for(var i=0;i<imgMenuPos.length;i++){
          var pos = imgMenuPos[i].pos;
          for(var j =0; j<pos.length;j++){
            if(j%2===0){
              pos[j]= Math.round(pos[j]*width/wUnit);
              //console.log('x--', pos[j])
            }else{
              pos[j]= Math.round(pos[j]*height/hUnit);
              //console.log('y--', pos[j])
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
.directive('zoomable', ['$timeout',function($timeout) {
  return {
    restrict: 'A',
    scope: true,
    link: function($scope, $element, $attrs) {
      var target = $element[0];

      var styleTarget = target.children[0].children[0].children[0];
      //console.log(target, target.children[0],styleTarget);
      styleTarget.style.webkitTransition = 'all linear 0.05s';



      touch.on(target, 'touchstart', function(ev){
        ev.preventDefault();
      });

      var initialScale = 1;
      var currentScale;

      touch.on(target, 'pinchend', function(ev){
        currentScale = ev.scale - 1;
        currentScale = initialScale + currentScale;
        currentScale = currentScale > 2 ? 2 : currentScale;
        currentScale = currentScale < 0.5 ? 0.5 : currentScale;
        styleTarget.style.webkitTransform = 'scale(' + currentScale + ')';
      });
      touch.on(target, 'pinchend', function(ev){
        initialScale = currentScale;
      });

      var clicks = 0;
      var lastClick = new Date();
      $element.bind('click', function (evt) {
          var dateDiff = new Date() - lastClick;
          //console.log('dateDiff', dateDiff);
          if (dateDiff > 300) { // 300 ms
              clicks = 0;
          }
          lastClick = new Date();
          clicks++;
          //console.log('clicks'+clicks);
          if (clicks == 1) {
              $timeout(function () {
                  if (clicks == 1) {
                      //....
                  } else {
                      if(currentScale!== undefined && currentScale!==1){
                        currentScale = 1;
                        styleTarget.style.webkitTransform = 'scale(' + currentScale + ')';
                      }else{
                        if($attrs.onDoubleClick){
                          $scope.$apply(function () {
                              $scope.$eval($attrs.onDoubleClick);
                          });
                        }
                      }
                  }
              }, 300);
          }
      });
    }
  };
}])
.directive('scrollArea', ['$window',function($window) {
  return {
    restrict: 'A',
    scope: true,
    link: function($scope, $element, $attrs) {
      //console.log($window.innerWidth, $window.innerHeight, $element)
      var cssText='width:'+$window.innerWidth+'px;height:'+$window.innerHeight+'px;';
      //console.log(cssText);
      $element[0].style.cssText = cssText;
    }
  }
}]);
