module.exports = {
    name: 'KPIDetail',
    fn: ['Backend', 'Constant', 'localStorageService', '$q',
        function (Backend, Constant, localStorageService, $q) {
            return function (kpiType, isLine) {
                var deferred = $q.defer();
                var selectedCriteria = localStorageService.get('criteria');
                var menus = angular.copy(Constant.kpiMenus[kpiType]);

                if (isLine && kpiType === 'kpiHome') {
                    menus = angular.copy(Constant.kpis);
                    if (!selectedCriteria.kuqu) {
                        deferred.resolve(menus);
                        return deferred.promise;
                    }
                }

                if (!isLine &&
                    (!selectedCriteria.kuqu || !selectedCriteria.banzu || !selectedCriteria.banci)) {
                    deferred.resolve(menus);
                    return deferred.promise;
                }
                /*eslint-disable*/
                Backend().kpi.query({
                    'WareHouseId': selectedCriteria.kuqu.Id,
                    'ZoneId': selectedCriteria.banzu ? selectedCriteria.banzu.Id : '',
                    'ShiftId': selectedCriteria.banci ? selectedCriteria.banci.ID : '',
                    'BizType': (isLine ? 'L-' : '') + Constant.kpiBizType[kpiType]
                }, function (data) {
                    var i, len, ilen, j, jlen, idx;

                    // var isRate = (kpiType == 'member' || kpiType == 'cost' || kpiType == 'quality')
                    if (!data) {
                        return;
                    }

                    if (kpiType === 'kpiHome') {
                        for (i = 0, ilen = data.length; i < ilen; i++) {
                            for (j = 0, jlen = menus.length; j < jlen; j++) {
                                if (data[i].ID == menus[j].id) {
                                    menus[j].hatColor = Constant.hatImage[data[i].STATE];
                                    break;
                                }
                            }
                        }
                        deferred.resolve(menus);
                        return;
                    }

                    for (i = 0, len = data.length; i < len; i++) {

                        idx = parseInt(data[i].ID.split('-')[1], 10) - 1;
                        if (menus[idx]) {
                            if (data[i].ACTUAL || data[i].TARGET) {
                                if (menus[idx].isPercentage) {
                                    menus[idx].rate = Math.ceil(100 * data[i].ACTUAL) + '% / ' + Math.ceil(100 * data[i].TARGET) + '%';
                                } else {
                                    menus[idx].rate = data[i].ACTUAL + ' / ' + data[i].TARGET;
                                }
                            }
                            menus[idx].hatColor = Constant.hatImage[data[i].STATE];
                        }
                    }
                    deferred.resolve(menus);
                }, function () {
                    deferred.resolve(menus);
                });
                return deferred.promise;
            };
        }
    ]
};
