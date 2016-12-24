module.exports = {
    name: 'Util',
    fn: ['Backend', 'Constant', 'localStorageService', '$q',
        function(Backend, Constant, localStorageService, $q) {
            return {
                getBorderFreq: function(menuBorders, menu) {
                    if (!menuBorders || !menu) {
                        return '';
                    }
                    for (var i = 0, len = menuBorders.length; i < len; i++) {
                        if (menuBorders[i].name == menu.PageType) {
                            return menuBorders[i].frequency;
                        }
                    }
                    return '';
                }
            };
        }
    ]
};
