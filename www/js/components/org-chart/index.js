var template = require('./template.html');

module.exports = {
    name: 'org',
    fn: [function () {
        return {
            restrict: 'E',
            template: template,
            scope: {
                group: '=',
                title: '@'
            },
            link: function (scope) {
                scope.$watch('group', function () {
                    var i, totalNum, subTeamNum;

                    scope.subTeams = [];
                    if (scope.group && scope.group.members) {
                        totalNum = scope.group.members.length;
                        scope.col = Math.max(Math.ceil(totalNum / 4), 3);
                        if (totalNum) {
                            subTeamNum = totalNum > scope.col ? scope.col : totalNum;
                            scope.oddTeam = (subTeamNum % 2 === 1);
                            for (i = 0; i < subTeamNum; i++) {
                                scope.subTeams[i] = [];
                            }
                            for (i = 0; i < totalNum; i++) {
                                scope.subTeams[i % subTeamNum].push(scope.group.members[i]);
                            }
                        }
                    }
                });
            }
        };
    }]
};
