module.exports = {
    name: 'Util',
    fn: [function () {
        return {
            getBorderFreq: function (menuBorders, menu) {
                var i, len;

                if (!menuBorders || !menu) {
                    return '';
                }
                for (i = 0, len = menuBorders.length; i < len; i++) {
                    if (menuBorders[i].name === menu.PageType) {
                        return menuBorders[i].frequency;
                    }
                }
                return '';
            }
        };
    }
    ]
};
