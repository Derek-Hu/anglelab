angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', 'Backend', function($scope, Backend) {

 

  $scope.col=3;
  $scope.$on('$ionicView.enter', function(e) {
    /*Backend.menu.query(function(menus){
      console.log(menus);
    });*/
  });
  $scope.menus=[{
    "nm": "班组结构图", 
    "fc": "#36CD14", 
    "bc": "#16E216", 
    "url": "#/org",
    "nb": 1  
  },{
    "nm": "考勤汇总", 
    "fc": "#62839D", 
    "bc": "#182FD3", 
    "url": "#/attend",
    "nb": 2 
  },{
    "nm": "当班出勤", 
    "fc": "#aaa", 
    "bc": "#827F7F", 
    "url": "#",
    "nb": 3 
  },{
    "nm": "岗位柔性表", 
    "fc": "#aaa", 
    "bc": "#827F7F", 
    "url": "#",
    "nb": 4 
  },{
    "nm": "轮岗计划", 
    "fc": "#aaa", 
    "bc": "#827F7F", 
    "url": "#",
    "nb": 5 
  },{
    "nm": "TL班组KPI", 
    "fc": "#aaa", 
    "bc": "#827F7F", 
    "url": "#",
    "nb": 6 
  },{
    "nm": "安全绿十字", 
    "fc": "#aaa", 
    "bc": "#827F7F", 
    "url": "#",
    "nb": 7
  },{
    "nm": "第三方物流KPI图表", 
    "fc": "#aaa", 
    "bc": "#827F7F", 
    "url": "#",
    "nb": 8 
  },{
    "nm": "年度计划及季度回顾", 
    "fc": "#aaa", 
    "bc": "#827F7F", 
    "url": "#",
    "nb": 9
  }];
}])

.controller('OrgCtrl', ['$scope', '$state',function($scope, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {

  });
  $scope.goHome=function(){
    $state.go('dash');
  }
  
  $scope.groupA={
    name: 'B 小组',
    leader: {
      name: '张三',
      pinyin: 'Zhang San',
      job: '清洁工',
      tel: '186-1666-1666'
    },
    members: [{
      name: '张三',
      pinyin: 'Zhang San',
      job: '清洁工',
      tel: '186-1666-1666'
    },{
      name: '张三',
      pinyin: 'Zhang San',
      job: '清洁工',
      tel: '186-1666-1666'
    }]
  };

  $scope.groupB={
    name: 'A 小组',
    leader: {
      name: '张三',
      pinyin: 'Zhang San',
      job: '清洁工',
      tel: '186-1666-1666'
    },
    members: [{
      name: '张三',
      pinyin: 'Zhang San',
      job: '清洁工',
      tel: '186-1666-1666'
    },{
      name: '张三',
      pinyin: 'Zhang San',
      job: '清洁工',
      tel: '186-1666-1666'
    },{
      name: '张三',
      pinyin: 'Zhang San',
      job: '清洁工',
      tel: '186-1666-1666'
    },{
      name: '张三',
      pinyin: 'Zhang San',
      job: '清洁工',
      tel: '186-1666-1666'
    },{
      name: '张三',
      pinyin: 'Zhang San',
      job: '清洁工',
      tel: '186-1666-1666'
    }]
  };

}])


.controller('AttendCtrl', ['$scope', '$state', 'Backend', '$window', function($scope, $state, Backend, $window) {
  
  $scope.goHome=function(){
    $state.go('dash');
  }

  $scope.chart = {
   title: "审核问题关闭率（月度KPI样例）",
   data:  [{
    "month": "1",
    "frequency": 0.3782,
    "expect": 0.32782
}, {
    "month": "2",
    "frequency": 0.23253,
    "expect": 0.18782
},{
    "month": "3",
    "frequency": 0.2782,
    "expect": 0.32782
}, {
    "month": "4",
    "frequency": 0.13253,
    "expect": 0.18782
}, {
    "month": "5",
    "frequency": 0.12702,
    "expect": 0.49820
}, {
    "month": "6",
    "frequency": 0.16288,
    "expect": 0.20782
}, {
    "month": "7",
    "frequency": 0.3,
    "expect": 0.243
}, {
    "month": "8",
    "frequency": 0.14094,
    "expect": 0.2
}, {
    "month": "9",
    "frequency": 0.13966,
    "expect": 0.23700
}],
   yLabel: "审核问题关闭率"
  }

  $scope.$on('$ionicView.enter', function(e) {
    /*Backend.kaoqin.query(function(data){
      $scope.chart.data=data;
    });*/
  });
}])

.controller('AccountCtrl', ['$scope', function($scope) {
  
}]);
