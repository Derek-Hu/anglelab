angular.module('starter.controllers', [])
.controller('KPIChartCtrl', ['$scope', '$stateParams', '$state', '$ionicScrollDelegate', 'MetaDataSvc', 'KPIItem', 'Constant', 'DateUtil', 'localStorageService',
  function($scope, $stateParams, $state, $ionicScrollDelegate, MetaDataSvc, KPIItem, Constant, DateUtil, localStorageService) {
    
  $scope.chart = {};
  var aspect = Constant.kpiMenus[$stateParams.aspect];
  $scope.aspect = $stateParams.aspect;
  var BizType = $stateParams.BizType;
  for(var i =0, len = aspect.length; i<len;i++){
    if(aspect[i].BizType == BizType){
      $scope.KPITitle = aspect[i].nm;
    }
  }
  $scope.chart.isRate = ($scope.aspect == 'member' || $scope.aspect == 'cost' || $scope.aspect=='quality');
  $scope.$on('$ionicView.enter', function(e) {
    $scope.selectedCriteria = localStorageService.get('criteria');
    MetaDataSvc($stateParams.PageType).then(function(data){
      $scope.metaData = data;
    });

    var lastDay = DateUtil.getLastDay();

    KPIItem($stateParams.BizType).then(function(data){
      $scope.chart.data = data.filter(function(d){
        if($scope.chart.isRate){
          d.ACTUAL =  d.ACTUAL * 100 + '%';
          d.TARGET =  d.TARGET * 100 + '%';
        }
        return d.ID.indexOf('M')==0
      }).map(function(d){
        d.month = d.ID.match(/\d+/)[0];
        return d;
      });
    });
  });

}])
.controller('ViewBoardCtrl', ['$scope', '$stateParams', '$state', '$ionicScrollDelegate', 'MetaDataSvc', 'KPIItem', 'Constant', 'DateUtil',
  function($scope, $stateParams, $state, $ionicScrollDelegate, MetaDataSvc, KPIItem, Constant, DateUtil) {
    
  $scope.menus = [{
        'PageType': 1,
        "nm": "KPI跟踪", 
        "enm": "KPI Tracking",
        "fc": "#36CD14", 
        "bc": "#95C730", 
        "state": "",
        "bg": 'img/svg/kpi-tracking.svg'
      },{
        'PageType': 2,
        "nm": "问题跟踪", 
        "enm": "Problem Tracking",
        "fc": "#62839D", 
        "bc": "#95C730", 
        "state": "",
        "bg": 'img/svg/problem-tracking.svg'
      }];

}])
.controller('GreenCrossCtrl', ['$scope', '$stateParams', '$state', '$ionicScrollDelegate', 'MetaDataSvc', 'KPIItem', 'Constant', 'DateUtil', 'localStorageService',
  function($scope, $stateParams, $state, $ionicScrollDelegate, MetaDataSvc, KPIItem, Constant, DateUtil, localStorageService) {
    function generate(data){
      $scope.rows = [];
      $scope.rows.push(data.filter(function(el){
        return parseInt(el.ID)<=3; 
      }));
      $scope.rows.push(data.filter(function(el){
        var id = parseInt(el.ID);
        return id>3 && id<=6; 
      }));
      $scope.rows.push(data.filter(function(el){
        var id = parseInt(el.ID);
        return id>6 && id<=13; 
      }));
      $scope.rows.push(data.filter(function(el){
        var id = parseInt(el.ID);
        return id>13 && id<=20; 
      }));
      $scope.rows.push(data.filter(function(el){
        var id = parseInt(el.ID);
        return id>20 && id<=27; 
      }));
      var days = data.filter(function(el){
        var id = parseInt(el.ID);
        return id>27 && id<=30; 
      });
      days.length = 3;
      $scope.rows.push(days);

      days = data.filter(function(el){
        var id = parseInt(el.ID);
        return id==31;
      });

      days.length = 1;
      $scope.rows.push(days);
    }
  $scope.colors = Constant.kpiColor;
  $scope.$on('$ionicView.enter', function(e) {
    $scope.selectedCriteria = localStorageService.get('criteria');
    MetaDataSvc($stateParams.PageType).then(function(data){
      $scope.metaData = data;
    });
    var holder = [];
    holder.length = DateUtil.getLastDay();
    generate(holder);
    KPIItem($stateParams.BizType).then(function(data){
      generate(data);
    });
  });

}])
.controller('DashCtrl', ['$scope', '$state', 'localStorageService', 'Constant', 'Warehouse', 'Zone', 'Shift', 'Charge', '$stateParams', 'KPIDetail', 'MetaDataSvc',
  function($scope, $state, localStorageService, Constant, Warehouse, Zone, Shift, Charge, $stateParams, KPIDetail, MetaDataSvc) {

  $scope.criteria = {
    kuqu: '',
    banzu: '',
    banci: '',
    charger: '加载中',
    currentDate: '加载中'
  }
  $scope.kqDropdown = {
    isOpen : false,
    close: function(){
      this.isOpen = false;
    },
    open: function(){
      if(!$scope.kuqus || $scope.kuqus.length<=1){
        return;
      }
      this.isOpen = !this.isOpen;
      $scope.bzDropdown.close();
      $scope.bcDropdown.close();
    },
    selectOption: function(option){
      $scope.criteria.kuqu = option;
      this.close();
    }
  }

  $scope.bzDropdown = {
    isOpen : false,
    close: function(){
      this.isOpen = false;
    },
    open: function(){
      if(!$scope.banzus || $scope.banzus.length<=1){
        return;
      }
      this.isOpen = !this.isOpen;
      $scope.kqDropdown.close();
      $scope.bcDropdown.close();
    },
    selectOption: function(option){
      $scope.criteria.banzu = option;
      this.close();
    }
  }
  $scope.bcDropdown = {
    isOpen : false,
    close: function(){
      this.isOpen = false;
    },
    open: function(){
      if(!$scope.bancis || $scope.bancis.length<=1){
        return;
      }
      this.isOpen = !this.isOpen;
      $scope.kqDropdown.close();
      $scope.bzDropdown.close();
    },
    selectOption: function(option){
      $scope.criteria.banci = option;
      this.close();
    }
  }
  
  $scope.goTo = function (menu) {
    localStorageService.set('criteria', $scope.criteria);
    if(!menu.state){
      return;
    }
    $state.go(menu.state,{PageType : menu.PageType});
  }
  $scope.goKPIDetail = function(state, BizType){
    $state.go(state?state:'kpi-item',{"aspect": $stateParams.aspect, "PageType": $stateParams.PageType, "BizType": BizType});
  }
  var type = $stateParams.aspect;
  for(var idx=0, idlen = Constant.kpis.length;idx<idlen;idx++){
    if(Constant.kpis[idx].type == type){
        $scope.aspectTitle = Constant.kpis[idx].name;
        break;
    }
  }

  if(!type){
    $scope.menus=Constant.viewBoard.menus;
  }else{
      $scope.menus = Constant.kpiMenus[type];
      KPIDetail(type).then(function(menus){
        $scope.menus = menus;
        if(type == 'security'){
          // Green Cross
          //$scope.menus[0].hatColor = ''; 
        }
      },function(){});
  }
  var selectedCriteria = localStorageService.get('criteria');
  $scope.$on('$ionicView.enter', function(e) {
    $scope.criteriaFromCache = localStorageService.get('criteria');
    $scope.isKPI = !!$stateParams.aspect;
    selectedCriteria = localStorageService.get('criteria');
    Warehouse.getWareHouse().then(function(Warehouse){
      $scope.kuqus = Warehouse;
      var isExist = selectedCriteria && selectedCriteria.kuqu && !!$scope.kuqus.filter(function(kq){
        return kq.whse_code == selectedCriteria.kuqu.whse_code;
      }).length;
      if(isExist){
        $scope.criteria.kuqu = selectedCriteria.kuqu;
      }else{
        $scope.criteria.kuqu = $scope.kuqus[0];
      }
    }, function(Warehouse){
      $scope.kuqus = Warehouse;
    });
    $scope.kqDropdown.close();
    $scope.bzDropdown.close();
    $scope.bcDropdown.close();

    
  });
  $scope.$watch('criteria.kuqu', function(){
    if(!$scope.criteria || !$scope.criteria.kuqu){
      return;
    }
    $scope.criteria.banzu = '';
    Zone.getZone($scope.criteria.kuqu.Id).then(function(zones){
      $scope.banzus = zones;
      var isExist = selectedCriteria && selectedCriteria.banzu && !!$scope.banzus.filter(function(bz){
        return bz.zone_code == selectedCriteria.banzu.zone_code;
      }).length;
      if(isExist){
        $scope.criteria.banzu = selectedCriteria.banzu;
      }else{
        $scope.criteria.banzu = $scope.banzus[0];
      }
      
    }, function(zones){
      $scope.banzus = zones;
    });
  })
  $scope.$watch('criteria.banzu', function(){
    if(!$scope.criteria.banzu){
      return;
    }
    $scope.criteria.banci = '';
    Shift.getShift($scope.criteria.kuqu.Id, $scope.criteria.banzu.Id).then(function(shifts){
      $scope.bancis = shifts;
      var isExist = selectedCriteria && selectedCriteria.banci && !!$scope.bancis.filter(function(bc){
        return bc.shift_code == selectedCriteria.banci.shift_code;
      }).length;
      if(isExist){
        $scope.criteria.banci = selectedCriteria.banci;
      }else{
        $scope.criteria.banci = $scope.bancis[0];
      }
      
    });
  })
  $scope.$watch('criteria.banci', function(){
    if(!$scope.criteria.banci){
      return;
    }
    $scope.criteria.charger = '加载中';
    $scope.criteria.currentDate = '加载中';
    localStorageService.set('criteria', $scope.criteria);
    var type = $stateParams.aspect;
    if(type){
      KPIDetail(type).then(function(menus){
        $scope.menus = menus;
        if(type == 'security'){
          // Green Cross
          $scope.menus[0].hatColor = ''; 
        }
      },function(){});
    }else{
      Charge.getCharge($scope.criteria.kuqu.Id,$scope.criteria.banzu.Id, $scope.criteria.banci.ID).then(function(data){
        $scope.criteria.charger = data.Employee_name;
        $scope.criteria.currentDate = data.DateTime;
      });
      
    }

  })



}])

.controller('OrgCtrl', ['localStorageService', 'Backend', '$scope', '$state', 'MetaDataSvc', '$stateParams', 'Constant',
  function(localStorageService, Backend, $scope, $state, MetaDataSvc, $stateParams, Constant) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //

  $scope.$on('$ionicView.enter', function(e) {
    MetaDataSvc($stateParams.PageType).then(function(data){
      $scope.metaData = data;
    });

    $scope.selectedCriteria = localStorageService.get('criteria');
    $scope.group = null;
    Backend.org.query({
      'WareHouseId': $scope.selectedCriteria.kuqu.Id,
      'ZoneId': $scope.selectedCriteria.banzu.Id,
      'ShiftId': $scope.selectedCriteria.banci.ID
    }, function(data){
      if(!data[0] || data[0].ErrorCode!==undefined){
        return;
      }
      data.sort(function(a, b){
        return parseInt(a.Order_number) - parseInt(b.Order_number);
      });
      for(var i=0, len = data.length; i< len;i++){
        data[i].Picture = Constant.baseURL+'/Imagers/'+data[i].Picture;
      }
      $scope.group = {};
      $scope.group.leader = data.splice(0,1)[0];
      $scope.group.members = data;
      $scope.group.name = $scope.selectedCriteria.banci.description;
      console.log($scope.group);
    });
  });
  $scope.goHome=function(){
    $state.go('dash');
  }

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
.controller('kqhzCtrl', ['localStorageService', 'Backend', '$scope', 'DateUtil', '$ionicScrollDelegate', '$state', '$stateParams', 'MetaDataSvc',
  function(localStorageService, Backend, $scope, DateUtil, $ionicScrollDelegate, $state, $stateParams, MetaDataSvc) {
  /*$scope.goHome = function(type) {
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
  }*/
  $scope.clzMap = [
    'absent',
    'glyphicon glyphicon-ok',
    'circle anjie-border',
    'glyphicon glyphicon-remove',
    'glyphicon glyphicon-star-empty',
    'rect',
    'anjie-bg circle anjie-border',
    'glyphicon glyphicon-record',
    'glyphicon glyphicon-triangle-top',
    'glyphicon glyphicon-asterisk',
    'arrow-border-up',
    'hurt'
  ]
  var headerCols = ['工号', '姓名'];
  $scope.loadingStatus = '';
  //var tailCols = ['迟到', '早退', '正班', '加班', '旷工', '请假', '休假','调休','签名'];
  $scope.loadData = function(WareHouseId, ZoneId, ShiftId, Date, IsSendEmail){
    $scope.loadingStatus = '加载中';
    Backend.kaoqin.query({
      'WareHouseId': WareHouseId,
      'ZoneId': ZoneId,
      'ShiftId': ShiftId,
      //2015-09
      'Date': Date,
      // 1 or 0
      'IsSendEmail': IsSendEmail
    },function(data){
      if(!data || !data.length){
        $scope.loadingStatus = '暂无数据';
        return;
      }else if(data.length ==1 && data[0].ErrorCode!==undefined){
        $scope.loadingStatus = '加载失败';
        return;
      }
      $scope.loadingStatus = '';
      $scope.data = data;
    }, function(){
      $scope.loadingStatus = '加载失败';
    });
  };
  
  
  $scope.$on('$ionicView.enter', function(e) {
    $scope.selectedCriteria = localStorageService.get('criteria');

    var daysNum = DateUtil.getLastDay();
    $scope.headers = headerCols;
    $scope.daysArr = [];
    for(var i =1, len = daysNum; i<=len;i++){
      $scope.daysArr.push(i);
    }
    $scope.headers = $scope.headers.concat($scope.daysArr);

    var today = new Date();
    $scope.selectedYear = today.getFullYear(); 
    $scope.selectedMonth = today.getMonth()+1;
    $scope.loadData($scope.selectedCriteria.kuqu.Id, $scope.selectedCriteria.banzu.Id, $scope.selectedCriteria.banci.ID, $scope.selectedYear+'-'+$scope.selectedMonth, 0);
    MetaDataSvc($stateParams.PageType).then(function(data){
      $scope.metaData = data;
    });
  });
}])
.controller('KPICtrl', ['$scope', 'Constant', '$state', 'localStorageService',
 function($scope, Constant, $state, localStorageService) {

  $scope.kpis=Constant.kpis;
  $scope.$on('$ionicView.enter', function(e) {
    $scope.selectedCriteria = localStorageService.get('criteria');
  });
  $scope.goDetail = function(kpiType, PageType){
    $state.go('kpi-detail',{"aspect": kpiType, "PageType": PageType});
  }

}])
.controller('EntryCtrl', ['$ionicScrollDelegate', 'Constant', '$state', 'localStorageService',
 function($ionicScrollDelegate, Constant, $state, localStorageService) {
  //$ionicScrollDelegate.$getByHandle('mainScroll').freezeScroll(true);

}])
.controller('KPIDetailCtrl', ['$scope', 'KPIDetail', 'Constant', '$stateParams', 'MetaDataSvc', '$state', 'localStorageService',
  function($scope, KPIDetail, Constant, $stateParams, MetaDataSvc, $state, localStorageService) {

    $scope.goKPIDetail = function(state, BizType){
      $state.go(state?state:'kpi-item',{"aspect": $stateParams.aspect, "PageType": $stateParams.PageType, "BizType": BizType});
    }

    var type = $stateParams.aspect;
    for(var idx=0, idlen = Constant.kpis.length;idx<idlen;idx++){
      if(Constant.kpis[idx].type == type){
          $scope.aspectTitle = Constant.kpis[idx].name;
          break;
      }
    }
    $scope.$on('$ionicView.enter', function(e) {
      $scope.criteriaFromCache = localStorageService.get('criteria');
      $scope.menus = Constant.kpiMenus[type];
      KPIDetail(type).then(function(menus){
        $scope.menus = menus;

        if(type == 'security'){
          // Green Cross
          //$scope.menus[0].hatColor = ''; 
        }
      },function(){});

      MetaDataSvc($stateParams.PageType).then(function(data){
        $scope.metaData = data;
      });

    });

}])

.controller('GwrxCtrl', ['localStorageService', '$scope', 'Backend', '$stateParams', 'MetaDataSvc',
  function(localStorageService, $scope, Backend, $stateParams, MetaDataSvc) {

  $scope.selectedCriteria = localStorageService.get('criteria');
  $scope.loadingStatus = '';

  $scope.loadGwrx = function(WareHouseId, ZoneId, ShiftId){
    $scope.loadingStatus = '加载中';
    Backend.gwrx.query({
      'WareHouseId': WareHouseId,
      'ZoneId': ZoneId,
      'ShiftId': ShiftId
    },function(data){
      $scope.loadingStatus = '';
      
      $scope.records = data;
      if(!$scope.records || !$scope.records.length){
        $scope.loadingStatus = '暂无数据';
        return;
      }else if(data.length ==1 && data[0].ErrorCode!==undefined){
        $scope.loadingStatus = '加载失败';
        return;
      }
      $scope.headers = Object.keys(data[0]).filter(function(data){
        return data != '序号';
      });
    }, function(){
      $scope.loadingStatus = '加载失败';
    });
  };
  $scope.$on('$ionicView.enter', function(e) {
    $scope.loadGwrx($scope.selectedCriteria.kuqu.Id, $scope.selectedCriteria.banzu.Id, $scope.selectedCriteria.banci.ID);

    MetaDataSvc($stateParams.PageType).then(function(data){
      $scope.metaData = data;
    });
  });

}])
.controller('LgjhCtrl', ['localStorageService', '$scope', 'Backend', 'MetaDataSvc', '$stateParams',
  function(localStorageService, $scope, Backend, MetaDataSvc, $stateParams) {

  $scope.selectedCriteria = localStorageService.get('criteria');
  $scope.loadingStatus = '';
  $scope.loadLgjh = function(WareHouseId, ZoneId, ShiftId){
    $scope.loadingStatus = '加载中';
    Backend.lgjh.query({
      'WareHouseId': WareHouseId,
      'ZoneId': ZoneId,
      'ShiftId': ShiftId
    },function(data){
      $scope.loadingStatus = '';
      if(!data || !data.length){
        $scope.loadingStatus = '暂无数据';
        return;
      }else if(data.length ==1 && data[0].ErrorCode!==undefined){
        $scope.loadingStatus = '加载失败';
        return;
      }
      data.sort(function(a, b){
        return parseInt(a.Order_number)-parseInt(b.Order_number);
      })
      var rows = [];
      /*
        rows = [{
          name: 
          items: [{
            operator:,
            rotate: ,
            months: [1,0,0,1,1,0,0,1,1,0,0,1]
          }]
        }]
      */

      /*
        {
          "Job_name":"检验",
          "month_r":"11",
          "Order_number":7,
          "Operate_Name":"张四",
          "Rotation_Name":"张五"
        }
      */
      for(var i=0, len = data.length;i<len;i++){
        // find job type
        var jobType = {};
        var record = data[i];
        for(var j = 0, jl = rows.length; j < jl; j++){
          if(rows[j] && rows[j].name == record.Job_name){
            jobType = rows[j];
            break;
          }
        }
        if(j==jl){
          jobType.name = record.Job_name;
          jobType.items = [];
          rows.push(jobType);
        }
        // find items
        var months = [];
        var items = {};
        for(var k = 0, lk= jobType.items.length; k< lk;k++){
          if(record.Operate_Name == jobType.items[k].operator && 
              record.Rotation_Name == jobType.items[k].rotate){
            items = jobType.items[k];
            break;
          }
        }
        if(k==lk){
          items.operator = record.Operate_Name;
          items.rotate = record.Rotation_Name;
          // 12 months
          items.months = [0,0,0,0,0,0,0,0,0,0,0,0];
          jobType.items.push(items);
        }
        items.months[record.month_r] = 1;
      }
      $scope.rows = rows;
      console.log(rows);
    }, function(){
      $scope.loadingStatus = '加载失败';
    });

  };
  $scope.$on('$ionicView.enter', function(e) {
    $scope.loadLgjh($scope.selectedCriteria.kuqu.Id, $scope.selectedCriteria.banzu.Id, $scope.selectedCriteria.banci.ID);

    MetaDataSvc($stateParams.PageType).then(function(data){
      $scope.metaData = data;
    });
  });

}]);
