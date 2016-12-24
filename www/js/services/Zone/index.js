module.exports = {
    name: 'Zone',
    fn: ['Backend', '$q', function (Backend, $q) {
        function getZone(WareHouseId) {
            var deferred = $q.defer();
            var empty = [{
                'zone_code': ' N/A',
                'description': 'N/A'
            }];
            if (!WareHouseId) {
                deferred.resolve(empty);
                return;
            }
            Backend().banzu.query({
                'WareHouseId': WareHouseId
            }, function (data) {
                if (!data[0] || data[0].ErrorCode !== undefined) {
                    deferred.resolve(empty);
                    return;
                }
                deferred.resolve(data.map(function (el) {
                    if (!el.description) {
                        el.description = el.zone_code;
                    }
                    return el;
                }));
            }, function () {
                deferred.resolve(empty);
            });
            return deferred.promise;
        }
        return {
            getZone: getZone
        };
    }]
};
