module.exports = {
    name: 'Shift',
    fn: ['Backend', '$q', function (Backend, $q) {
        function getShift(WareHouseId, ZoneId) {
            var deferred = $q.defer();
            var empty = [{
                'shift_code': 'N/A',
                'description': 'N/A'
            }];
            Backend().banci.query({
                'WareHouseId': WareHouseId,
                'ZoneId': ZoneId
            }, function (data) {
                if (!data[0] || data[0].ErrorCode !== undefined) {
                    deferred.resolve(empty);
                    return;
                }
                deferred.resolve(data.map(function (el) {
                    if (!el.description) {
                        el.description = el.shift_code;
                    }
                    return el;
                }));
            }, function () {
                deferred.resolve(empty);
            });
            return deferred.promise;
        }
        return {
            getShift: getShift
        };
    }]
};
