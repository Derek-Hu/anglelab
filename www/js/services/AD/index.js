module.exports = {
    name: 'AD',
    fn: ['Backend', 'Constant', '$q', 'localStorageService', '$http', function (Backend, Constant, $q, localStorageService, $http) {
        return {
            login: function (params) {
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
                $http({
                    method: 'GET',
                    /*eslint-disable*/
                    url: Backend().login + '?name=' + params.name + '&pwd=' + params.pwd,
                  }).
                success(function (data) {
                    var msg;

                    if (data && data.userId) {
                      $http({
                          method: 'GET',
                          /*eslint-disable*/
                          url: Backend().userAuth + '?userId=' + data.userId,
                        }).
                      success(function (auth) {
                          var i, len;

                          if (auth && auth.length) {
                            data.permssionMap = {
                                SFM: [],
                                // SFM: null if no SFM permission
                                AD: [],
                              };
                            for (i = 0, len = auth.length; i < len; i++) {
                              if (auth[i].name === 'SFM') {
                                data.permssionMap.SFM = ['line', 'board'];
                              } else if (auth[i].name === '拉动') {
                                data.permssionMap.AD.push('pull');
                              } else if (auth[i].name === '上线') {
                                data.permssionMap.AD.push('start');
                              } else if (auth[i].name === '下架') {
                                data.permssionMap.AD.push('off');
                              } else if (auth[i].name === '人员调整') {
                                data.permssionMap.AD.push('member');
                              } else if (auth[i].name === '上架') {
                                data.permssionMap.AD.push('on');
                              }
                            }

                            if (!data.permssionMap.SFM.length) {
                              data.permssionMap.SFM = null;
                            }

                            if (!data.permssionMap.AD.length) {
                              data.permssionMap.AD = null;
                            }

                            localStorageService.set('loginUser', data);
                            deferred.resolve(data);
                          } else {
                            deferred.reject({
                                respCode: 403,
                              });
                          }
                        }).
                      error(function () {
                          deferred.reject({
                              respCode: 500,
                            });
                        });
                    } else {
                      msg = '服务器异常';

                      if (data) {
                        if ('userId' in data) {
                          msg = '用户名或密码错误';
                        } else if (data.respCode) {
                          msg = data.respCode;
                        }
                      }

                      deferred.reject({
                          respCode: 'unknow',
                          errorMsg: msg,
                        });
                    }
                  }).
                error(function (data) {
                    deferred.reject({
                        respCode: 500,
                      });
                  });

                return deferred.promise;
              },
          };
      }, ],
  };
