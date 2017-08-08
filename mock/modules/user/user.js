import Mock from 'mockjs';
// Usage:
// http://mockjs.com/examples.html

function subRouter(express) {

  /*eslint-disable*/
  var router = express.Router();

  // Get Method
  router.get('/AdPull/Login.aspx', function (req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json({
        userId: 10002,
      });
    });
  // Get Method
  router.get('/AdPullOn/DownShelves.aspx', function (req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json({
        userId: 10002,
      });
    });

  router.get('/AdPull/UserAuthority.aspx', function (req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json([{
        name: '拉动',
      }, {
        name: '上线',
      }, {
        name: '下架',
      }, {
        name: '上架',
      }, {
        name: '人员调整',
      },]);
    });

  router.get('/AdPull/GetDownList.aspx', function (req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json([{
        itemCode: '222',
        routeCode: '333',
        locCode: '444',
        lp: '555',
        groupsCode: '666',
        planOnlineTime: '777',
      }, {
        itemCode: '2221',
        routeCode: '333',
        locCode: '444',
        lp: '555',
        groupsCode: '666',
        planOnlineTime: '777',
      }, {
        itemCode: '2222',
        routeCode: '333',
        locCode: '444',
        lp: '555',
        groupsCode: '666',
        planOnlineTime: '777',
      }, {
        itemCode: '2223',
        routeCode: '333',
        locCode: '444',
        lp: '555',
        groupsCode: '666',
        planOnlineTime: '777',
      }, ]);
    });

  router.get('/AdPull/GetShiftList.aspx', function (req, res) {
      // http://www.expressjs.com.cn/4x/api.html#res.json
      return res.json([{
        itemCode: '222',
        routeCode: '333',
        locCode: '444',
        lp: '555',
        groupsCode: '666',
        planOnlineTime: '777',
      }, {
        itemCode: '2221',
        routeCode: '333',
        locCode: '444',
        lp: '555',
        groupsCode: '666',
        planOnlineTime: '777',
      }, {
        itemCode: '2222',
        routeCode: '333',
        locCode: '444',
        lp: '555',
        groupsCode: '666',
        planOnlineTime: '777',
      }, {
        itemCode: '2223',
        routeCode: '333',
        locCode: '444',
        lp: '555',
        groupsCode: '666',
        planOnlineTime: '777',
      }, ]);
    });

  return router;
}

export default {
    root: '/',
    router: subRouter,
  };
