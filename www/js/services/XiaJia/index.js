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
            shangjiaWithKuwei: shangjiaWithKuwei,
            getOnList: getOnList,
          };
      },],
  };
