angular.module('starter.services', ['ngResource'])

.service('Constant', function(){
  var settings = {
    cacheURL : 'http://58.246.227.27:83',
    // cacheURL : 'http://221.181.71.171:8082',
    // Private
    //cacheURL : 'http://10.102.10.207:8082',
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
    lineKpiPageType: 10,
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
        'MenuId': '1',
        'PageType': 1,
        "nm": "班组结构图", 
        "enm": "Team Structure",
        "fc": "#36CD14", 
        "state": "org",
        "bg": 'img/svg/team-structure.svg'
      },{
        'MenuId': '2',
        'PageType': 2,
        "nm": "考勤汇总", 
        "enm": "Attendance Summary",
        "fc": "#62839D", 
        "state": "kqhz",
        "bg": 'img/svg/attendance-summary.svg'
      },{
        'MenuId': '3',
        'PageType': 3,
        "nm": "岗位柔性表", 
        "enm": "Flexible Job List",
        "fc": "#aaa", 
        "bg": 'img/svg/flexible-job-list.svg',
        "state": "gwrx"
      },{
        'MenuId': '4',
        'PageType': 4,
        "nm": "轮岗计划", 
        "enm": "Rotation Plan",
        "fc": "#aaa", 
        "bg": 'img/svg/rotation-plan.svg',
        "state": "lgjh"
      },{
        'MenuId': '5',
        'PageType': 5,
        "nm": "KPI跟踪", 
        "enm": "KPI Tracking",
        "fc": "#aaa", 
        "state": "kpi",
        "bg": 'img/svg/kpi-tracking.svg'
      },{
        'MenuId': '6',
        'PageType': 6,
        "nm": "问题跟踪推进", 
        "enm": "Problem Tracking",
        "fc": "#aaa", 
        "bg": 'img/svg/problem-tracking.svg',
        "state": ""
      },{
        'MenuId': '7',
        'PageType': 7,
        "nm": "变更点管理", 
        "enm": "Change Point Management",
        "fc": "#aaa", 
        "bg": 'img/svg/change-point-management.svg',
        "state": ""
      },{
        'MenuId': '8',
        'PageType': 8,
        "nm": "岗位工时平衡墙", 
        "enm": "Job Time Balance Wall",
        "fc": "#aaa", 
        "bg": 'img/svg/job-time-balance-wall.svg',
        "state": ""
      },{
        'MenuId': '9',
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
        'MenuId': '5-1-0',
        name: '安全',
        PageType: 5,
        id: 1,
        type: 'security'
      },{
        'MenuId': '5-5-0',
        name: '质量',
        PageType: 5,
        id: 5,
        type: 'quality'
      },{
        'MenuId': '5-2-0',
        PageType: 5,
        name: '流程',
        id: 2,
        type: 'flow'
      },{
        'MenuId': '5-3-0',
        PageType: 5,
        name: '人员',
        id: 3,
        type: 'member'
      },{
        'MenuId': '5-4-0',
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
          'MenuId': '5-1-1',
          "BizType": '1-1',
          "enm": "Green Cross",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/green-cross.svg',
          "url": "green-cross"
        },{
          "nm": "实时工伤次数率", 
          'MenuId': '5-1-2',
          "BizType": '1-2',
          "enm": "Frequency of Injury",
          "fc": "#aaa", 
          "bg": 'img/svg/frequency-of-injury.svg',
          "bc": "#049BF4"
        }],
      'flow': [{
          "nm": "生产停线时间", 
          'MenuId': '5-2-1',
          "BizType": '2-1',
          "enm": "Turnover Rate",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/turnover-rate.svg'
        },{
          "nm": "收发货及时率", 
          'MenuId': '5-2-2',
          "BizType": '2-2',
          "enm": "Timely Delivery Rate",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/timely-delivery-rate.svg',
          "invalid": true
        }],
      'quality': [{
          "nm": "库存准确率", 
          'MenuId': '5-5-1',
          "BizType": '5-1',
          "enm": "Inventory Accuracy",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/inventory-accuracy.svg',
          "isPercentage": true
        },{
          "nm": "FIFO符合率", 
          'MenuId': '5-5-2',
          "BizType": '5-2',
          "enm": "FIFO Coincidence Rate",
          "fc": "#aaa", 
          "bg": 'img/svg/FIFO-coincidence-rate.svg',
          "bc": "#049BF4",
          "isPercentage": true
        },{
          "nm": "库位一致性", 
          'MenuId': '5-5-3',
          "BizType": '5-3',
          "enm": "Library Level Consistency",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/library-level-consistency.svg',
          "isPercentage": true
        },{
          "nm": "非规范性操作", 
          'MenuId': '5-5-4',
          "BizType": '5-4',
          "enm": "Non Normative Operation",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/non-normative-operation.svg',
          "isPercentage": false
        }
        ,{
          "nm": "清洁度", 
          'MenuId': '5-5-5',
          "BizType": '5-5',
          "enm": "Cleanliness",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/logistics-cleanliness.svg',
          "isPercentage": false
        },{
          "nm": "工位器具", 
          'MenuId': '5-5-6',
          "BizType": '5-6',
          "enm": "Working Position Apparatus",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/material-box-cleanness.svg',
          "isPercentage": false
        }
        /*,{
          "nm": "物流工废索赔额", 
          'MenuId': '5-5-7',
          "BizType": '5-7',
          "enm": "Industry Waste Claims",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/industry-waste-claims.svg'
        }*/
        ],
      'member': [{
          "nm": "离职率", 
          'MenuId': '5-3-1',
          "BizType": '3-1',
          "enm": "Turnover Rate",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/turnover-rate.svg',
          "isPercentage": true
        },{
          "nm": "缺勤率", 
          'MenuId': '5-3-2',
          "BizType": '3-2',
          "enm": "AbsentTeeism Rate",
          "fc": "#aaa", 
          "bg": 'img/svg/absent-teeism-rate.svg',
          "bc": "#049BF4",
          "isPercentage": true
        }],
      'cost': [{
          "nm": "AGV开动率", 
          'MenuId': '5-4-1',
          "BizType": '4-1',
          "enm": "AGV Development Rate",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img//svg/avg-development-rate.svg',
          "isPercentage": true
        },{
          "nm": "移动设备开动率", 
          'MenuId': '5-4-2',
          "BizType": '4-2',
          "enm": "Mobile Device Starting Rate",
          "fc": "#aaa", 
          "bg": 'img/svg/mobile-device-starting-rate.svg',
          "bc": "#049BF4",
          "isPercentage": true
        },{
          "nm": "移动设备完好率", 
          'MenuId': '5-4-3',
          "BizType": '4-3',
          "enm": "Mobile Device Integrity",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/mobile-device-integrity.svg',
          "isPercentage": true
        },{
          "nm": "劳动生产率VBZ", 
          'MenuId': '5-4-4',
          "BizType": '4-4',
          "enm": "Labor Productivity VBZ",
          "fc": "#aaa", 
          "bc": "#049BF4", 
          "bg": 'img/svg/labor-productivity-VBZ.svg',
          "isPercentage": true
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

     // http://localhost:1460/AdPull/GetDownList.aspx?whseId=1
     xiajiaList = $resource(baseURL+'/AdPull/GetDownList.aspx', null, {
      getAll: {
        method: 'GET'
      }
     });
     // http://localhost:1460/AdPull/DownShelves.aspx?epsSupplyId=1&userName=2
     xiajiaAction = $resource(baseURL+'/AdPull/DownShelves.aspx?epsSupplyId=1&userName=2');
     // http://localhost:1460/AdPull/SelectStock.aspx?itemCode=1&whseId=2
     kucunList = $resource(baseURL+'/AdPull/SelectStock.aspx');
     adMember = $resource(baseURL+'/member.aspx');
     // http://192.168.0.147:8083/AdPull/Login.aspx?name=wmh&pwd=1111
     login = $resource(baseURL+'/AdPull/Login.aspx');
     userAuth = $resource(baseURL+'/AdPull/UserAuthority.aspx');
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
      kpi: kpi,
      xiajiaList: xiajiaList,
      xiajiaAction: xiajiaAction,
      kucunList: kucunList,
      adMember: adMember,
      login: login,
      userAuth: userAuth
    }
  }
}])
.service('AD', ['Backend', 'Constant', '$q', 'localStorageService', function(Backend, Constant, $q, localStorageService){
  return {
    getList: function (sender, params){
      var deferred = $q.defer();
      Backend()[sender].query(params, function(data){
        if(!data || !data.length){
          deferred.resolve([]);
          return;
        }else if(data.length ==1 && data[0].ErrorCode!==undefined){
            deferred.reject(null);
          }else{
            deferred.resolve(data);
          }
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    },
    login: function(params){
      var deferred = $q.defer();
      /*
        
        {
          "factoryCode":"1600",
          "fullNme":"金士平",
          "isSpecial":"1",
          "loginNme":"jsp",
          "pwd":"1111",
          "userId":"1102",
          "whseCode":"L2-CP3",
          "whseId":"1055",
          "zoneCode":"B1",
          "zoneId":"1159"
          }

       */
      Backend().login.query(params, function(data){
        if(data && data.userId){
          Backend().userAuth.query({
            userId: data.userId
          }, function (auth) {
            if(auth && auth.length){
/*              data.permissions = [{
                id: 'SFM',
                list: [{}],
              }, {
                id: 'AD',
                list: [{
                  id: 'pull'
                },{
                  id: 'start'
                },{
                  id: 'off'
                },{
                  id: 'member'
                }]
              }];*/
              data.permssionMap = {
                SFM: ['line', 'board'],
                // SFM: null if no SFM permission
                AD: ['pull', 'start', 'off', 'member']
              };
              localStorageService.set('loginUser', data);
              deferred.resolve(data);
            }else{
              deferred.reject({
                respCode: 403
              });
            }
          }, function () {
            deferred.reject({
              respCode: 500
            });
          });
        }else {
          deferred.reject({
            respCode: 'unknow',
            errorMsg: (data && data.respCode) || '服务器异常'
          });
        }
      }, function () {
        // for test
/*        var data = {"factoryCode":"1600","fullNme":"金士平","isSpecial":"1","loginNme":"jsp","pwd":"1111","userId":"1102","whseCode":"L2-CP3","whseId":"1055","zoneCode":"B1","zoneId":"1159"};
         data.permssionMap = {
                SFM: ['line', 'board'],
                // SFM: ['board'],
                // SFM: null if no SFM permission
                //AD: ['off', 'pull']
                AD: ['pull', 'start', 'off', 'member']
              };
              localStorageService.set('loginUser', data);
        deferred.resolve(data);*/
        // for test end

        deferred.reject({
          respCode: 500
        });
      });
      return deferred.promise;
    }
  }
}])
.service('XiaJia', ['Backend', 'Constant', '$q', function(Backend, Constant, $q){
  function getList(params) {
    var deferred = $q.defer();
    Backend().xiajiaList.getAll(params, function(data){
      if(!data || !data.length){
        deferred.resolve([]);
        return;
      }else if(data.length ==1 && data[0].ErrorCode!==undefined){
          deferred.reject(null);
        }else{
          deferred.resolve(data);
        }
    }, function () {
      deferred.reject(null);
    });
    return deferred.promise;
  }
  function xiajia(params) {
    var deferred = $q.defer();
    Backend().xiajiaAction.query(params, function(data){
      if(!data || !data.length){
        deferred.resolve([]);
        return;
      }else if(data.length ==1 && data[0].ErrorCode!==undefined){
          deferred.reject(null);
        }else{
          deferred.resolve(data);
        }
    }, function () {
      deferred.reject(null);
    });
    return deferred.promise;
  }
  return {
    getList: getList,
    xiajia: xiajia
  }
}])
.service('Kucun', ['Backend', 'Constant', '$q', function(Backend, Constant, $q){
  function getList(params) {
    var deferred = $q.defer();
    Backend().kucunList.query(params, function(data){
      if(!data || !data.length){
        deferred.resolve([]);
        return;
      }else if(data.length ==1 && data[0].ErrorCode!==undefined){
          deferred.reject(null);
        }else{
          deferred.resolve(data);
        }
    }, function () {
      deferred.reject(null);
    });
    return deferred.promise;
  }
  return {
    getList: getList
  };
}])
.service('MetaDataSvc', [ 'Backend', 'Constant', 'localStorageService', '$q',
  function(Backend, Constant, localStorageService, $q) {
    var empty = {
          "bianzhi":"N/A",
          "bianzhi_date":"N/A",
          "shenhe":"N/A",
          "pizhun":"N/A"
        };
    return function(menuId, isLine){
      var deferred = $q.defer();
      var selectedCriteria = localStorageService.get('criteria');

      if(isLine){
        if(!selectedCriteria.kuqu){
          deferred.resolve([]);
          return deferred.promise;
        }
      }

      if(!isLine && (!selectedCriteria.kuqu || !selectedCriteria.banzu || !selectedCriteria.banci)){
        deferred.resolve(empty);
        return deferred.promise;
      }
      Backend().metaData.query({
        'WareHouseId': selectedCriteria.kuqu.Id,
        'ZoneId': selectedCriteria.banzu?selectedCriteria.banzu.Id: '',
        'ShiftId': selectedCriteria.banci?selectedCriteria.banci.ID: '',
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
.service('MenuList', [ 'Backend', 'Constant', 'localStorageService', '$q',
  function(Backend, Constant, localStorageService, $q) {
    return {
      getList: function(originalMenus, isLine, params){
          var deferred = $q.defer();
          if(!params || !params.WareHouseId){
            deferred.resolve(originalMenus);
            return deferred.promise;
          }
          if(isLine){
            originalMenus = originalMenus.concat([]);
            for(var i=0;i<originalMenus.length;i++){
              originalMenus[i].MenuId = originalMenus[i].MenuId.replace(/(\d+)\-(\d+)\-(\d+)/, '10-$2-$3');
            }
          }
          Backend().metaData.query({
            'WareHouseId': params.WareHouseId,
            'BizType': 4,
            'ZoneId': isLine? -1:params.ZoneId
          }, function(data){
            if(!data || !data[0] || data[0].ErrorCode!==undefined){
              deferred.resolve(originalMenus);
            }else{
              var displayNemnus = [];
              for(var i=0;i<originalMenus.length;i++){
                var cMenu = originalMenus[i];
                var shouldShow = true;
                for(var j=0;j<data.length;j++){
                  if(data[j].show_code == cMenu.MenuId){
                    shouldShow = false;
                    break;
                  }
                }
                if(shouldShow){
                  displayNemnus.push(cMenu);
                }
              }
              deferred.resolve(displayNemnus);
            }
          }, function(){
            deferred.resolve(originalMenus);
          });
          return deferred.promise;
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

        //var isRate = (kpiType == 'member' || kpiType == 'cost' || kpiType == 'quality')
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
              if(menus[idx].isPercentage){
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
