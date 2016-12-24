var template = require('./template.html');

module.exports = {
    name: 'doubleTitle',
    fn: [function () {
        return {
            restrict: 'E',
            template: template,
            scope: {
                title: '@'
            },
            link: function () {}
        };
    }]
};
