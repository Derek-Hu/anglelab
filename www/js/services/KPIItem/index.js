module.exports = {
    name: 'KPIItem',
    fn: ['Backend', 'Constant', 'localStorageService', '$q',
        function (Backend, Constant, localStorageService, $q) {
            return function (kpiType, isLine) {
                var deferred = $q.defer();
                var selectedCriteria = localStorageService.get('criteria');

                if (isLine) {
                    if (!selectedCriteria.kuqu) {
                        deferred.resolve([]);
                        return deferred.promise;
                    }
                }

                if (!isLine && (!selectedCriteria.kuqu || !selectedCriteria.banzu || !selectedCriteria.banci)) {
                    deferred.resolve([]);
                    return deferred.promise;
                }
                /*eslint-disable*/
                Backend().kpi.query({
                    'WareHouseId': selectedCriteria.kuqu.Id,
                    'ZoneId': selectedCriteria.banzu ? selectedCriteria.banzu.Id : '',
                    'ShiftId': selectedCriteria.banci ? selectedCriteria.banci.ID : '',
                    'BizType': (isLine ? 'L-' : '') + kpiType
                }, function (data) {
                    if (!data) {
                        data = [];
                    }
                    deferred.resolve(data);
                }, function () {
                    deferred.reject('Load Data Error');
                });
                return deferred.promise;
            };
        }
    ]
};
