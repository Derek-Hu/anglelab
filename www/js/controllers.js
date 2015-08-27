angular.module('starter.controllers', [])
.controller('DemoCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.goHome=function(){
    $state.go('dash');
  }
}])
.controller('HomeCtrl', ['$scope', '$state', '$window', function($scope, $state, $window) {
  $scope.goHome=function(){
    $state.go('dash');
  }

	var imagOriginalWidth = 697;
	var imagOriginalHeight = 392; 
	var wUnit = 697;
	var hUnit = imagOriginalHeight * wUnit / imagOriginalWidth;
	var template = '<area shape="rect" coords="{{coords}}" href ="{{url}}" style="cursor:pointer;"/>';

  $scope.$on('$ionicView.enter', function(){
  	var width = $window.innerWidth;
    var height = Math.round(imagOriginalHeight * width / imagOriginalWidth);
    console.log('original = '+imagOriginalWidth +','+ imagOriginalHeight);
    console.log('current = '+width +','+ height);
	var imgMenuPos=[{
	  url: '#/kpi',
	  pos: [480, 183, 685, 265]
	},{
	  url:'#/green-cross',
	  pos: [10, 275, 214, 357]
	}];
    var imageMap = '';
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
      imageMap += template.replace('{{coords}}', pos.join(',')).replace('{{url}}', imgMenuPos[i].url);
      angular.element(document.querySelector('map')).html(imageMap);
    }
  })
  $scope.$on('$ionicView.leave', function(){
  	//console.log('leave');
  	angular.element(document.querySelector('map')).html('')
  })
}]);