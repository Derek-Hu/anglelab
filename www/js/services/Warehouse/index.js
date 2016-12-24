module.exports = {
    name: 'Warehouse',
    fn: ['Backend', '$q', function(Backend, $q) {
        function getWareHouse() {
            var deferred = $q.defer();
            var empty = [{
                "whse_code": "N/A",
                "whse_name": "N/A"
            }];
            Backend().kuqu.query(function(data) {
                if (!data[0] || data[0].ErrorCode !== undefined) {
                    deferred.resolve(empty);
                    return;
                }
                deferred.resolve(data.map(function(el) {
                    if (!el.whse_name) {
                        el.whse_name = el.whse_code;
                    }
                    return el;
                }));
            }, function() {
                deferred.reject(empty);
            });
            return deferred.promise;
        }
        return {
            getWareHouse: getWareHouse
        };
    }]
};
