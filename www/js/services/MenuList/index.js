module.exports = {
    name: 'MenuList',
    fn: ['Backend', 'Constant', 'localStorageService', '$q',
        function(Backend, Constant, localStorageService, $q) {
            return {
                getList: function(originalMenus, isLine, params) {
                    var deferred = $q.defer();
                    if (!params || !params.WareHouseId) {
                        deferred.resolve(originalMenus);
                        return deferred.promise;
                    }
                    if (isLine) {
                        originalMenus = originalMenus.concat([]);
                        for (var i = 0; i < originalMenus.length; i++) {
                            originalMenus[i].MenuId = originalMenus[i].MenuId.replace(/(\d+)\-(\d+)\-(\d+)/, '10-$2-$3');
                        }
                    }
                    Backend().metaData.query({
                        'WareHouseId': params.WareHouseId,
                        'BizType': 4,
                        'ZoneId': isLine ? -1 : params.ZoneId
                    }, function(data) {
                        if (!data || !data[0] || data[0].ErrorCode !== undefined) {
                            deferred.resolve(originalMenus);
                        } else {
                            var displayNemnus = [];
                            for (var i = 0; i < originalMenus.length; i++) {
                                var cMenu = originalMenus[i];
                                var shouldShow = true;
                                for (var j = 0; j < data.length; j++) {
                                    if (data[j].show_code == cMenu.MenuId) {
                                        shouldShow = false;
                                        break;
                                    }
                                }
                                if (shouldShow) {
                                    displayNemnus.push(cMenu);
                                }
                            }
                            deferred.resolve(displayNemnus);
                        }
                    }, function() {
                        deferred.resolve(originalMenus);
                    });
                    return deferred.promise;
                }
            };
        }
    ]
};
