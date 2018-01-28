import Mock from 'mockjs';
// Usage:
// http://mockjs.com/examples.html

function subRouter(express) {

  /*eslint-disable*/
  var router = express.Router();

  // Get Method
  router.get('/AdPull/Login.aspx', function(req, res) {
    // http://www.expressjs.com.cn/4x/api.html#res.json
    return res.json({userId: 10002});
  });
  // Get Method
  router.get('/AdPullOn/DownShelves.aspx', function(req, res) {
    // http://www.expressjs.com.cn/4x/api.html#res.json
    return res.json({userId: 10002});
  });
  router.get('/AdPull/ShiftShelvesNewSec.aspx', function(req, res) {
    // http://www.expressjs.com.cn/4x/api.html#res.json
    return res.json({respCode: 'success'});
  });
  router.get('/AdPull/LocGetDownList.aspx', function(req, res) {
    // http://www.expressjs.com.cn/4x/api.html#res.json
    return res.json({
      "warehouselist": [
        {
          "whseId": 1001,
          "whseIdSpecified": true,
          "whseName": "CP3"
        }
      ],
      crossingList: [
        "LC2-S-1", "LC2-S-3", "LC2-S-2"
      ],
      recordList: [
        {
          arriveDate: "2018 - 01 - 28 01: 03: 23",
          arriveDateSpecified: true,
          destWhId: 1001,
          destWhIdSpecified: true,
          destWhseName: "CP3",
          dueDate: "01 - 28 01: 03",
          id:'07792927',
          idSpecified: true,
          isColorRed: 1,
          isColorRedSpecified: true,
          isQd: 0,
          isQdSpecified: true,
          isUrgency: "0",
          itemCode: "5 NG860026 IIT",
          itemId: 157731,
          itemIdSpecified: true,
          locCode: "LC - 2 - 078"
        },{
          arriveDate: "2018 - 01 - 28 01: 03: 23",
          arriveDateSpecified: true,
          destWhId: 1001,
          destWhIdSpecified: true,
          destWhseName: "CP3",
          dueDate: "01 - 28 01: 03",
          id:'07792929',
          idSpecified: true,
          isColorRed: 0,
          isColorRedSpecified: true,
          isQd: 1,
          isQdSpecified: true,
          isUrgency: "1",
          itemCode: "5 NG860026 IIT",
          itemId: 157731,
          itemIdSpecified: true,
          locCode: "LC - 2 - 078"
        }
      ]
      })
    });
    router.get('/AdPull/LocAdAnswer.aspx', function(req, res) {
      // success：抢答成功，同时刷新数据
      // 8833：该计划已抢答
      // 8834：该计划已完成
      // 8835：该计划已取消
      // 8836：您已经有抢答任务未完成
      // 6502：无可用库存
      // 其他的值：未知错误

      return res.json({respCode: 'success'});
      // return res.json({respCode: '8833'});
      // return res.json({respCode: '8834'});
      // return res.json({respCode: '8835'});
      // return res.json({respCode: '8836'});
      // return res.json({respCode: '6502'});
      // return res.json({respCode: 'others'});
    });
    router.get('/AdPull/LocDownShelves.aspx', function(req, res) {
      // success：下架成功，同时刷新数据
      // 其他的值：未知错误
      return res.json({respCode: 'success'});
      // return res.json({respCode: 'fail'});
    });

    router.get('/AdPull/GetItemPullInfo.aspx', function(req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json([
        {
          itemCode: 'itemCode1',
          routeCode: 'routeCode2',
          lsa: 'lsa3',
          nickName: 'nickName4'
        }
      ]);
    });
    router.get('/AdPull/ShiftShelvesNew.aspx', function(req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json([
        {
          locCode: '001',
          locId: '101',
          orderNum: 2
        }, {
          locCode: '002',
          locId: '102',
          orderNum: 1
        }, {
          locCode: '002',
          locId: '102',
          orderNum: 1
        }, {
          locCode: '002',
          locId: '102',
          orderNum: 1
        }
      ]);
    });

    router.get('/AdPull/UserAuthority.aspx', function(req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json([
        {
          name: '拉动'
        }, {
          name: '上线'
        }, {
          name: '下架(外)'
        }, {
          name: '上架'
        }, {
          name: '人员调整'
        }
      ]);
    });

    router.get('/AdPull/GetDownList.aspx', function(req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json([
        {
          itemCode: '222',
          routeCode: '333',
          locCode: '444',
          lp: '555',
          groupsCode: '666',
          planOnlineTime: '777'
        }, {
          itemCode: '2221',
          routeCode: '333',
          locCode: '444',
          lp: '555',
          groupsCode: '666',
          planOnlineTime: '777'
        }, {
          itemCode: '2222',
          routeCode: '333',
          locCode: '444',
          lp: '555',
          groupsCode: '666',
          planOnlineTime: '777'
        }, {
          itemCode: '2223',
          routeCode: '333',
          locCode: '444',
          lp: '555',
          groupsCode: '666',
          planOnlineTime: '777'
        }
      ]);
    });

    router.get('/AdPull/GetShiftList.aspx', function(req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json([
        {
          itemCode: '222',
          routeCode: '333',
          locCode: '444',
          lp: '555',
          groupsCode: '666',
          planOnlineTime: '777'
        }, {
          itemCode: '2221',
          routeCode: '333',
          locCode: '444',
          lp: '555',
          groupsCode: '666',
          planOnlineTime: '777'
        }, {
          itemCode: '2222',
          routeCode: '333',
          locCode: '444',
          lp: '555',
          groupsCode: '666',
          planOnlineTime: '777'
        }, {
          itemCode: '2223',
          routeCode: '333',
          locCode: '444',
          lp: '555',
          groupsCode: '666',
          planOnlineTime: '777'
        }
      ]);
    });

    return router;
  }

  export default {
    root : '/',
    router : subRouter
  };
