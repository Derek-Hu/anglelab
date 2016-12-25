module.exports = {
    name: 'MenuBorder',
    fn: ['Backend', 'Constant', 'localStorageService', '$q',
        function (Backend, Constant, localStorageService, $q) {

            function getBoard(PageType) {
                return function (WareHouseId) {
                    var deferred = $q.defer();

                    if (!WareHouseId || !PageType) {
                        deferred.resolve([]);
                        return deferred.promise;
                    }
                    /*eslint-disable*/
                    Backend().metaData.query({
                        'WareHouseId': WareHouseId,
                        'BizType': 3,
                        'PageType': PageType
                    }, function (data) {
                        if (!data || !data[0] || data[0].ErrorCode !== undefined) {
                            deferred.resolve([]);
                        } else {
                            deferred.resolve(data);
                        }
                    }, function () {
                        deferred.resolve([]);
                    });
                    return deferred.promise;
                };
            }
            var viewBoard = getBoard(1);
            var lineBoard = getBoard(2);
            
            return {
                viewBoard: viewBoard,
                lineBoard: lineBoard
            };
        }
    ]
};
