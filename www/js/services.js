angular.module('starter.services', ['ngResource'])

.service('Constant', function(){
  var settings = {
    cacheURL : 'http://221.181.71.171:8082',
    timeInterval: 10,
    imagePath: {name: '目录暂未选择', nativeURL: null}
  };
  return {
    baseURL : function(){
      return settings.cacheURL;
    },
    getInterval : function(){
      return settings.timeInterval
    },
    updateInterval : function(timeInterval){
      settings.timeInterval = timeInterval;
    },
    updateServerURL : function(url){
      settings.cacheURL = url;
    },
    getImagePath : function(){
      return settings.imagePath;
    },
    setImagePath : function(imagePath){
      settings.imagePath = imagePath;
    },
    loading: '加载中',
    loadingError: '加载失败',
    supportedExt: ['.jpg', '.jpeg', '.bmp', '.png', '.gif', '.tif'],
    isExtSupport: function(name){
      if(!name){
        return false;
      }
      var nameLen = name.length;
      for(var i=0, len = this.supportedExt.length;i<len;i++){
        var extName = this.supportedExt[i];
        if(name.substring(nameLen - extName.length, nameLen) == extName){
          return true;
        }
      }
      return false;
    },

    viewBoard: {

      menus: [{
        'PageType': 1,
        "nm": "班组结构图", 
        "enm": "Team Structure",
        "fc": "#36CD14", 
        "state": "org",
        "bg": 'img/svg/team-structure.svg'
      },{
        'PageType': 2,
        "nm": "考勤汇总", 
        "enm": "Attendance Summary",
        "fc": "#62839D", 
        "state": "kqhz",
        "bg": 'img/svg/attendance-summary.svg'
      },{
        'PageType': 3,
        "nm": "岗位柔性表", 
        "enm": "Flexible Job List",
        "fc": "#aaa", 
        "bg": 'img/svg/flexible-job-list.svg',
        "state": "gwrx"
      },{
        'PageType': 4,
        "nm": "轮岗计划", 
        "enm": "Rotation Plan",
        "fc": "#aaa", 
        "bg": 'img/svg/rotation-plan.svg',
        "state": "lgjh"
      },{
        'PageType': 5,
        "nm": "KPI跟踪", 
        "enm": "KPI Tracking",
        "fc": "#aaa", 
        "state": "kpi",
        "bg": 'img/svg/kpi-tracking.svg'
      },{
        'PageType': 6,
        "nm": "问题跟踪推进", 
        "enm": "Problem Tracking",
        "fc": "#aaa", 
        "bg": 'img/svg/problem-tracking.svg',
        "state": ""
      },{
        'PageType': 7,
        "nm": "变更点管理", 
        "enm": "Change Point Management",
        "fc": "#aaa", 
        "bg": 'img/svg/change-point-management.svg',
        "state": ""
      },{
        'PageType': 8,
        "nm": "岗位工时平衡墙", 
        "enm": "Job Time Balance Wall",
        "fc": "#aaa", 
        "bg": 'img/svg/job-time-balance-wall.svg',
        "state": ""
      },{
        'PageType': 9,
        "nm": "班组园地", 
        "enm": "Team Garden",
        "fc": "#aaa", 
        "bg": 'img/svg/team-garden.svg',
        "state": "bzGarden"
      }]
    },
    kpiColor: {
      '红': '#E73334',
      '绿': '#A2D329',
      '黄': '#F2E439',
      '蓝': '#12AAEB',
      '橙': '#F5AA35',
      '紫': '#800080',
      '黑': '#000'
    },
    hatImage: {
      '红': 'red',
      '绿': 'green'
    },
    kpis: [{
        name: '安全',
        PageType: 5,
        id: 1,
        type: 'security'
      },{
        name: '质量',
        PageType: 5,
        id: 5,
        type: 'quality'
      },{
        PageType: 5,
        name: '流程',
        id: 2,
        type: 'flow'
      },{
        PageType: 5,
        name: '人员',
        id: 3,
        type: 'member'
      },{
        PageType: 5,
        name: '成本',
        id: 4,
        type: 'cost'
      }],
    kpiBizType:{
      'kpiHome': '0-0',
      'security': '1-0',
      'flow': '2-0',
      'member': '3-0',
      'cost': '4-0',
      'quality': '5-0'
    },
    kpiMenus: {
      'security': [{
          "nm": "安全绿十字", 
          "BizType": '1-1',
          "enm": "Green Cross",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/green-cross.svg',
          "url": "green-cross"
        },{
          "nm": "实时工伤次数率", 
          "BizType": '1-2',
          "enm": "Frequency of Injury",
          "fc": "#aaa", 
          "bg": 'img/svg/frequency-of-injury.svg',
          "bc": "#049BF4"
        }],
      'flow': [{
          "nm": "生产停线时间", 
          "BizType": '2-1',
          "enm": "Turnover Rate",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/turnover-rate.svg'
        }],
      'quality': [{
          "nm": "库存准确率", 
          "BizType": '5-1',
          "enm": "Inventory Accuracy",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/inventory-accuracy.svg'
        },{
          "nm": "FIFO符合率", 
          "BizType": '5-2',
          "enm": "FIFO Coincidence Rate",
          "fc": "#aaa", 
          "bg": 'img/svg/FIFO-coincidence-rate.svg',
          "bc": "#049BF4"
        },{
          "nm": "库位一致性", 
          "BizType": '5-3',
          "enm": "Library Level Consistency",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/library-level-consistency.svg'
        },{
          "nm": "非规范性操作", 
          "BizType": '5-4',
          "enm": "Non Normative Operation",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/non-normative-operation.svg'
        }
        ,{
          "nm": "清洁度", 
          "BizType": '5-5',
          "enm": "Logistics Cleanliness",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/logistics-cleanliness.svg'
        },{
          "nm": "工位器具", 
          "BizType": '5-6',
          "enm": "Material Box Cleanness",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/material-box-cleanness.svg'
        }
        /*,{
          "nm": "物流工废索赔额", 
          "BizType": '5-7',
          "enm": "Industry Waste Claims",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/industry-waste-claims.svg'
        }*/
        ],
      'member': [{
          "nm": "离职率", 
          "BizType": '3-1',
          "enm": "Turnover Rate",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/turnover-rate.svg'
        },{
          "nm": "缺勤率", 
          "BizType": '3-2',
          "enm": "AbsentTeeism Rate",
          "fc": "#aaa", 
          "bg": 'img/svg/absent-teeism-rate.svg',
          "bc": "#049BF4"
        }],
      'cost': [{
          "nm": "AGV开动率", 
          "BizType": '4-1',
          "enm": "AGV Development Rate",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img//svg/avg-development-rate.svg'
        },{
          "nm": "移动设备开动率", 
          "BizType": '4-2',
          "enm": "Mobile Device Starting Rate",
          "fc": "#aaa", 
          "bg": 'img/svg/mobile-device-starting-rate.svg',
          "bc": "#049BF4"
        },{
          "nm": "移动设备完好率", 
          "BizType": '4-3',
          "enm": "Mobile Device Integrity",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/mobile-device-integrity.svg'
        },{
          "nm": "劳动生产率VBZ", 
          "BizType": '4-4',
          "enm": "Labor Productivity VBZ",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/labor-productivity-VBZ.svg'
        }]
    }
  };
})
.service('Backend', ['$resource', 'Constant', function($resource, Constant) {
  // Might use a resource here that returns a JSON array
  var baseURL = '', kaoqin, kuqu, banzu, banci, metaData, org, gwrx, lgjh, kpi;

  /*
  var org = $resource('js/test/org.json');
  var gwrx = $resource('js/test/gwrx.json');
  var kpi = $resource('js/test/1-2.json');
  var kaoqin = $resource('js/test/kqhz.json');
  var lgjh = $resource('js/test/lgjh.json');
  var metaData = $resource('js/test/meta.json');
  var banci = $resource('js/test/banci.json');
  var kuqu = $resource('js/test/kuqu.json');
  var banzu = $resource('js/test/banzu.json');
  var banCharge = $resource('js/test/banCharge.json');*/

  return function(){
    if(baseURL != Constant.baseURL()){
     baseURL = Constant.baseURL();
     kaoqin = $resource(baseURL+'/EmployeeDutyListSub.aspx');
     kuqu = $resource(baseURL+'/Warehouse.aspx');
     banzu = $resource(baseURL+'/Zone.aspx');
     banci = $resource(baseURL+'/Shift.aspx');
     metaData = $resource(baseURL+'/Index.aspx');
     org = $resource(baseURL+'/EmployeeDutyList.aspx');
     gwrx = $resource(baseURL+'/PositionFlexible.aspx');
     lgjh = $resource(baseURL+'/DutyRotation.aspx');
     kpi = $resource(baseURL+'/KPI.aspx');
    }

    return{
      kaoqin:kaoqin,
      kuqu: kuqu,
      banzu: banzu,
      banci: banci,
      metaData: metaData,
      gwrx: gwrx,
      lgjh: lgjh,
      org: org,
      kpi: kpi
    }
  }
}])
.service('MetaDataSvc', [ 'Backend', 'Constant', 'localStorageService', '$q',
  function(Backend, Constant, localStorageService, $q) {
    var empty = {
          "bianzhi":"N/A",
          "bianzhi_date":"N/A",
          "shenhe":"N/A",
          "pizhun":"N/A"
        };
    return function(menuId){
      var deferred = $q.defer();
      var selectedCriteria = localStorageService.get('criteria');
      if(!selectedCriteria.kuqu || !selectedCriteria.banzu || !selectedCriteria.banci){
        deferred.resolve(empty);
        return deferred.promise;
      }
      Backend().metaData.query({
        'WareHouseId': selectedCriteria.kuqu.Id,
        'ZoneId': selectedCriteria.banzu.Id,
        'ShiftId': selectedCriteria.banci.ID,
        // 底部数据
        'BizType': 2,
        // 考勤汇总
        'PageType': menuId
      },function(data){
        if(!data || !data.length || data[0].ErrorCode!==undefined){
          deferred.resolve(empty);
        }else{
          deferred.resolve(data[0]);
        }
      },function(){
        deferred.resolve(empty);
      });
      return deferred.promise;
    }
}])
.service('KPIItem', [ 'Backend', 'Constant', 'localStorageService', '$q',
  function(Backend, Constant, localStorageService, $q) {
    return function(kpiType, isLine){
      var deferred = $q.defer();
      var selectedCriteria = localStorageService.get('criteria');

      if(isLine){
        if(!selectedCriteria.kuqu){
          deferred.resolve([]);
          return deferred.promise;
        }
      }

      if(!isLine && (!selectedCriteria.kuqu || !selectedCriteria.banzu || !selectedCriteria.banci)){
        deferred.resolve([]);
        return deferred.promise;
      }
      Backend().kpi.query({
        'WareHouseId': selectedCriteria.kuqu.Id,
        'ZoneId': selectedCriteria.banzu?selectedCriteria.banzu.Id: '',
        'ShiftId': selectedCriteria.banci?selectedCriteria.banci.ID: '',
        'BizType': (isLine?'L-': '')+kpiType
      }, function(data){
        if(!data){
          data = [];
        }
        deferred.resolve(data);
      }, function(){
        deferred.reject('Load Data Error');
      });
      return deferred.promise;
    }
}])
.service('Util', [ 'Backend', 'Constant', 'localStorageService', '$q',
  function(Backend, Constant, localStorageService, $q) {
    return {
      getBorderFreq: function(menuBorders, menu){
        if(!menuBorders || !menu){
          return '';
        }
        for(var i=0, len = menuBorders.length;i<len;i++){
          if(menuBorders[i].name == menu.PageType){
            return menuBorders[i].frequency;
          }
        }
        return '';
      }
    }
}])
.service('MenuBorder', [ 'Backend', 'Constant', 'localStorageService', '$q',
  function(Backend, Constant, localStorageService, $q) {

    function getBoard(PageType){
      return function(WareHouseId){
        var deferred = $q.defer();
        if(!WareHouseId || !PageType){
          deferred.resolve([]);
          return deferred.promise;
        }
        Backend().metaData.query({
          'WareHouseId': WareHouseId,
          'BizType': 3,
          'PageType': PageType
        }, function(data){
          if(!data || !data[0] || data[0].ErrorCode!==undefined){
            deferred.resolve([]);
          }else{
            deferred.resolve(data);
          }
        }, function(){
          deferred.resolve([]);
        });
        return deferred.promise;
      }
    }
    var viewBoard = getBoard(1);
    var lineBoard = getBoard(2);
    return {
      viewBoard: viewBoard,
      lineBoard: lineBoard
    }
}])
.service('KPIDetail', [ 'Backend', 'Constant', 'localStorageService', '$q',
  function(Backend, Constant, localStorageService, $q) {
    return function(kpiType, isLine){
      var deferred = $q.defer();
      var selectedCriteria = localStorageService.get('criteria');
      var menus = angular.copy(Constant.kpiMenus[kpiType]);
      if(isLine && kpiType=='kpiHome'){
        menus = angular.copy(Constant.kpis);
        if(!selectedCriteria.kuqu){
          deferred.resolve(menus);
          return deferred.promise;
        }
      }

      if(!isLine &&
         (!selectedCriteria.kuqu || !selectedCriteria.banzu || !selectedCriteria.banci)){
        deferred.resolve(menus);
        return deferred.promise;
      }
      Backend().kpi.query({
        'WareHouseId': selectedCriteria.kuqu.Id,
        'ZoneId': selectedCriteria.banzu? selectedCriteria.banzu.Id: '',
        'ShiftId': selectedCriteria.banci? selectedCriteria.banci.ID: '',
        'BizType': (isLine?'L-': '')+Constant.kpiBizType[kpiType]
      }, function(data){

        var isRate = (kpiType == 'member' || kpiType == 'cost' || kpiType == 'quality')
        if(!data){
          return;
        }
        if(kpiType == 'kpiHome'){
          for(var i=0, ilen = data.length; i<ilen;i++){
            for(var j=0, jlen = menus.length; j<jlen;j++){
              if(data[i].ID == menus[j].id){
                menus[j].hatColor = Constant.hatImage[data[i].STATE];
                break;
              }
            }
          }
          deferred.resolve(menus);
          return;
        }

        for(var i=0, len = data.length; i<len;i++){

          var idx = parseInt(data[i].ID.split('-')[1])-1;
          if(menus[idx]){
            if(data[i].ACTUAL || data[i].TARGET){
              if(isRate){
                  menus[idx].rate = Math.ceil(100*data[i].ACTUAL)+'% / '+ Math.ceil(100*data[i].TARGET)+'%';
              }else{
                  menus[idx].rate = data[i].ACTUAL+' / '+data[i].TARGET;
              }
            }
            menus[idx].hatColor = Constant.hatImage[data[i].STATE];
          }
        }
        deferred.resolve(menus);
      }, function(){
        deferred.resolve(menus);
      });
      return deferred.promise;
    }
}])
.service('DateUtil', function() {
  function getLastDay(pYear, pMonth){
  	var curr = new Date();
    if(pYear){
      curr.setFullYear(parseInt(pYear));
    }
    if(pMonth){
      curr.setMonth(parseInt(pMonth)-1);
    }
  	var year = curr.getFullYear();
  	var month = curr.getMonth()+1;

	 if(month>=12) {
	  month -=12;    
	  year++;       
	 }

  	var nextFirstDay = new Date(year,month,1);
    console.log(nextFirstDay);
  	return (new Date(nextFirstDay.getTime()-1000*60*60*24)).getDate();
  }
  return {
    getLastDay:getLastDay
  }
})
.service('Warehouse', ['Backend', '$q', function(Backend, $q) {
  function getWareHouse(){
    var deferred = $q.defer();
    var empty = [{
      "whse_code":"N/A",
      "whse_name":"N/A"
    }];
    Backend().kuqu.query(function(data){
      if(!data[0] || data[0].ErrorCode!==undefined){
        deferred.resolve(empty);
        return;
      }
      deferred.resolve(data.map(function(el){
        if(!el.whse_name){
          el.whse_name = el.whse_code;
        }
        return el;
      }));
    }, function(){
      deferred.reject(empty);
    });
    return deferred.promise;
  }
  return {
    getWareHouse: getWareHouse
  }
}])
.service('Zone', ['Backend', '$q', function(Backend, $q) {
  function getZone(WareHouseId){
    var deferred = $q.defer();
    var empty = [{
      "zone_code":" N/A",
      "description":"N/A"
    }];
    if(!WareHouseId){
      deferred.resolve(empty);
      return;
    }
    Backend().banzu.query({
      'WareHouseId': WareHouseId
    },function(data){
      if(!data[0] || data[0].ErrorCode!==undefined){
        deferred.resolve(empty);
        return;
      }
      deferred.resolve(data.map(function(el){
        if(!el.description){
          el.description = el.zone_code;
        }
        return el;
      }));
    },function(){
      deferred.resolve(empty);
    });
    return deferred.promise;
  }
  return {
    getZone: getZone
  }
}])
.service('Shift', ['Backend', '$q', function(Backend, $q) {
  function getShift(WareHouseId, ZoneId){
    var deferred = $q.defer();
    var empty = [{
      "shift_code":"N/A",
      "description":"N/A"
    }];
    Backend().banci.query({
      'WareHouseId': WareHouseId,
      'ZoneId': ZoneId
    },function(data){
      if(!data[0] || data[0].ErrorCode!==undefined){
        deferred.resolve(empty);
        return;
      }
      deferred.resolve(data.map(function(el){
        if(!el.description){
          el.description = el.shift_code;
        }
        return el;
      }));
    }, function(){
      deferred.resolve(empty);
    });
    return deferred.promise;
  }
  return {
    getShift: getShift
  }
}])
.service('Charge', ['Backend', '$q', function(Backend, $q) {
  function getCharge(WareHouseId, ZoneId, ShiftId){
    var empty = {
        'Employee_name': 'N/A',
        'DateTime': 'N/A'
      };
    var deferred = $q.defer();
    Backend().metaData.query({
      'WareHouseId': WareHouseId,
      'ZoneId': ZoneId,
      'ShiftId': ShiftId,
      'BizType': 1
    },function(data){
      var res = data[0];
      if(!data[0] || data[0].ErrorCode!==undefined){
        res = empty;
      }
      deferred.resolve(res);
    },function(){
      deferred.resolve(empty);
    });
    return deferred.promise;
  }
  return {
    getCharge: getCharge
  }
}]);
