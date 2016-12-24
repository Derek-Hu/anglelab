module.exports {
    name: 'MetaDataSvc',
    fn: ['Backend', 'Constant', 'localStorageService', '$q',
        function(Backend, Constant, localStorageService, $q) {
            var empty = {
                "bianzhi": "N/A",
                "bianzhi_date": "N/A",
                "shenhe": "N/A",
                "pizhun": "N/A"
            };
            return function(menuId, isLine) {
                var deferred = $q.defer();
                var selectedCriteria = localStorageService.get('criteria');

                if (isLine) {
                    if (!selectedCriteria.kuqu) {
                        deferred.resolve([]);
                        return deferred.promise;
                    }
                }

                if (!isLine && (!selectedCriteria.kuqu || !selectedCriteria.banzu || !selectedCriteria.banci)) {
                    deferred.resolve(empty);
                    return deferred.promise;
                }
                Backend().metaData.query({
                    'WareHouseId': selectedCriteria.kuqu.Id,
                    'ZoneId': selectedCriteria.banzu ? selectedCriteria.banzu.Id : '',
                    'ShiftId': selectedCriteria.banci ? selectedCriteria.banci.ID : '',
                    // 底部数据
                    'BizType': 2,
                    // 考勤汇总
                    'PageType': menuId
                }, function(data) {
                    if (!data || !data.length || data[0].ErrorCode !== undefined) {
                        deferred.resolve(empty);
                    } else {
                        deferred.resolve(data[0]);
                    }
                }, function() {
                    deferred.resolve(empty);
                });
                return deferred.promise;
            };
        }
    ]
};
