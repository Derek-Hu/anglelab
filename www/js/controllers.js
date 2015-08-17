angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.col=3;
  $scope.menus=[{
    nm: '班组结构图', // display name
    fc: '#36CD14', // font color
    bc: '#16E216', //border color,
    url: '#/org',
    nb: 1  // number
  },{
    nm: '考勤汇总', // display name
    fc: '#62839D', // font color
    bc: '#182FD3', //border color,
    url: '#/attend',
    nb: 2 // number
  },{
    nm: '当班出勤', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 3 // number
  },{
    nm: '岗位柔性表', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 4 // number
  },{
    nm: '轮岗计划', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 5 // number
  },{
    nm: 'TL班组KPI', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 6 // number
  },{
    nm: '安全绿十字', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 7 // number
  },{
    nm: '第三方物流KPI图表', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 8 // number
  },{
    nm: '年度计划及季度回顾', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 9 // number
  }];
})

.controller('OrgCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.col=3;
  $scope.menus=[{
    nm: '班组结构图', // display name
    fc: '#36CD14', // font color
    bc: '#16E216', //border color,
    url: '#/org',
    nb: 1  // number
  },{
    nm: '考勤汇总', // display name
    fc: '#62839D', // font color
    bc: '#182FD3', //border color,
    url: '#/attend',
    nb: 2 // number
  },{
    nm: '当班出勤', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 3 // number
  },{
    nm: '岗位柔性表', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 4 // number
  },{
    nm: '轮岗计划', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 5 // number
  },{
    nm: 'TL班组KPI', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 6 // number
  },{
    nm: '安全绿十字', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 7 // number
  },{
    nm: '第三方物流KPI图表', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 8 // number
  },{
    nm: '年度计划及季度回顾', // display name
    fc: '#aaa', // font color
    bc: '#827F7F', //border color,
    url: '#',
    nb: 9 // number
  }];
})

.controller('AttendCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
