module.exports {
    name: 'XiaJia',
    fn: ['Backend', 'Constant', '$q', '$http', function(Backend, Constant, $q, $http) {
        function getList(params) {
            var deferred = $q.defer();
            $http({ method: 'GET', url: Backend().xiajiaListURL + params }).
            success(function(data, status, headers, config) {
                if (data && Object.prototype.toString.call(data) === '[object Array]') {
                    deferred.resolve(data);
                } else {
                    deferred.reject((data && data.respCode) ? data.respCode : null);
                }
            }).
            error(function(data, status, headers, config) {
                deferred.reject(null);
            });
            return deferred.promise;
        }

        function xiajia(params) {
            var deferred = $q.defer();
            $http({ method: 'GET', url: Backend().xiajiaURL + params }).
            success(function(data, status, headers, config) {
                if (data && data.respCode === 'success') {
                    deferred.resolve();
                } else {
                    deferred.reject((data && data.respCode) ? data.respCode : null);
                }
            }).
            error(function(data, status, headers, config) {
                deferred.reject(null);
            });
            return deferred.promise;
        }
        return {
            getList: getList,
            xiajia: xiajia
        };
    }]
};
