module.exports = {
    name: 'Charge',
    fn: ['Backend', '$q', function(Backend, $q) {
        function getCharge(WareHouseId, ZoneId, ShiftId) {
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
            }, function(data) {
                var res = data[0];
                if (!data[0] || data[0].ErrorCode !== undefined) {
                    res = empty;
                }
                deferred.resolve(res);
            }, function() {
                deferred.resolve(empty);
            });
            return deferred.promise;
        }
        return {
            getCharge: getCharge
        };
    }]
};
