module.exports = {
    name: 'XiaJia',
    fn: ['Backend', 'Constant', '$q', '$http', function (Backend, Constant, $q, $http) {
        function getList(params) {
          var deferred = $q.defer();

          /*eslint-disable*/
          $http({ method: 'GET', url: Backend().xiajiaListURL + params }).
          success(function (data, status, headers) {
              if (data && Object.prototype.toString.call(data) === '[object Array]') {
                deferred.resolve(data);
              } else {
                deferred.reject((data && data.respCode) ? data.respCode : null);
              }
            }).
          error(function (data, status, headers) {
              deferred.reject(null);
            });

          return deferred.promise;
        }

        function getWaiKuList(params) {
          var deferred = $q.defer();

          /*eslint-disable*/
          $http({ method: 'GET', url: Backend().waikuXiajiaList + params }).
          success(function (data, status, headers) {
              if (data && 'data' in data) {
                deferred.resolve(data);
              } else {
                deferred.reject((data && data.respCode) ? data.respCode : null);
              }
            }).
          error(function (data, status, headers) {
              deferred.reject(null);
            });

          return deferred.promise;
        }

        function getOnList(params) {
          var deferred = $q.defer();

          /*eslint-disable*/
          $http({ method: 'GET', url: Backend().shangjiaListURL + params }).
          success(function (data, status, headers) {
              if (data && Object.prototype.toString.call(data) === '[object Array]') {
                deferred.resolve(data);
              } else {
                deferred.reject((data && data.respCode) ? data.respCode : null);
              }
            }).
          error(function (data, status, headers) {
              deferred.reject(null);
            });

          return deferred.promise;
        }

        function qiangda(params) {
          var deferred = $q.defer();

          /*eslint-disable*/
          $http({ method: 'GET', url: Backend().waikuQiangda + params }).
          success(function (data, status, headers) {
              var message='未知错误';

              if (data && data.respCode === 'success') {
                deferred.resolve();
              } else if(data && data.respCode){

                if(data.respCode ===8833 || data.respCode ==='8833'){
                  message = '该计划已抢答';
                }else if(data.respCode ===8834 || data.respCode ==='8834'){
                  message = '该计划已完成';
                }else if(data.respCode ===8835 || data.respCode ==='8835'){
                  message = '该计划已取消';
                }else if(data.respCode ===8836 || data.respCode ==='8836'){
                  message = '您已经有抢答任务未完成';
                }else if(data.respCode ===6502 || data.respCode ==='6502'){
                  message = '无可用库存';
                }

                deferred.reject(message);
              }else{
                deferred.reject('服务器异常');
              }
            }).
          error(function (data, status, headers) {
              deferred.reject('服务器异常');
            });

          return deferred.promise;
        }

        function xiajia(params) {
          var deferred = $q.defer();

          /*eslint-disable*/
          $http({ method: 'GET', url: Backend().xiajiaURL + params }).
          success(function (data, status, headers) {
              if (data && data.respCode === 'success') {
                deferred.resolve();
              } else {
                deferred.reject((data && data.respCode) ? data.respCode : null);
              }
            }).
          error(function (data, status, headers) {
              deferred.reject(null);
            });

          return deferred.promise;
        }

        function waiKuXiajia(params) {
          var deferred = $q.defer();

          /*eslint-disable*/
          $http({ method: 'GET', url: Backend().waikuXiajiaAction + params }).
          success(function (data, status, headers) {
              if (data && data.respCode === 'success') {
                deferred.resolve();
              } else {
                deferred.reject('未知错误');
              }
            }).
          error(function (data, status, headers) {
              deferred.reject('服务器异常');
            });

          return deferred.promise;
        }

        function shangjia(params) {
          var deferred = $q.defer();

          /*eslint-disable*/
          $http({ method: 'GET', url: Backend().shangjiaURL + params }).
          success(function (data, status, headers) {
              if (data && data.respCode === 'success') {
                deferred.resolve();
              }else if(data && Object.prototype.toString.call(data) === '[object Array]'){
                data = data.sort(function(a, b){return parseInt(a.orderNum) - parseInt(b.orderNum)});
                deferred.resolve(data);
              } else {
                deferred.reject((data && data.respCode) ? data.respCode : null);
              }
            }).
          error(function (data, status, headers) {
              deferred.reject(null);
            });

          return deferred.promise;
        }

        function shangjiaWithKuwei(params) {
          var deferred = $q.defer();

          /*eslint-disable*/
          $http({ method: 'GET', url: Backend().shangjiaWithKuwei + params }).
          success(function (data, status, headers) {
              if (data && data.respCode === 'success') {
                deferred.resolve();
              }else {
                deferred.reject((data && data.respCode) ? data.respCode : null);
              }
            }).
          error(function (data, status, headers) {
              deferred.reject(null);
            });

          return deferred.promise;
        }

        return {
            getList: getList,
            xiajia: xiajia,
            shangjia: shangjia,
            getWaiKuList: getWaiKuList,
            qiangda: qiangda,
            shangjiaWithKuwei: shangjiaWithKuwei,
            waiKuXiajia: waiKuXiajia,
            getOnList: getOnList
          };
      },],
  };
