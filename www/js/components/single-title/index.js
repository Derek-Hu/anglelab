var template = require('./template.html');

module.exports = {
    name: 'singleTitle',
    fn: [function() {
        return {
            restrict: 'E',
            template: template,
            scope: {
                title: '@'
            },
            link: function() {}
        };
    }]
};
