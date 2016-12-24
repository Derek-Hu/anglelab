var app = angular.module('starter.routers', ['ionic', 'ngCordova', 'ui.bootstrap', 'LocalStorageModule', 'ngResource']);

var AdMemberCtrl = require('../pages/ad-board/AdMemberCtrl');
var AdMemberTemplate = require('../pages/ad-board/member.html');

var AdPullCtrl = require('../pages/ad-board/AdPullCtrl');
var AdPullTemplate = require('../pages/ad-board/pull.html');

var AdPullHisotryCtrl = require('../pages/ad-board/AdPullHisotryCtrl');
var AdPullHisotryTemplate = require('../pages/ad-board/pull-hisotry.html');

var AdPullNickCtrl = require('../pages/ad-board/AdPullNickCtrl');
var AdPullNickTemplate = require('../pages/ad-board/pull-nick.html');

var AdStartCtrl = require('../pages/ad-board/AdStartCtrl');
var AdStartTemplate = require('../pages/ad-board/start.html');

var AdSubMenuCtrl = require('../pages/ad-board/AdSubMenuCtrl');
var AdSubMenuTemplate = require('../pages/ad-board/ad-sub-permission.html');

var XiaJiaCtrl = require('../pages/ad-board/XiaJiaCtrl');
var XiaJiaTemplate = require('../pages/ad-board/xiajia.html');

var LoginDashCtrl = require('../pages/ad-board/LoginDashboard');
var LoginDashTemplate = require('../pages/ad-board/login-dashboard.html');

var LoginCtrl = require('../pages/ad-board/LoginCtrl');
var LoginCtrlTemplate = require('../pages/ad-board/login.html');

var KucunCtrl = require('../pages/ad-board/KucunCtrl');
var KucunCtrlTemplate = require('../pages/ad-board/kucun.html');

app.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    /*.state('tab', {
    url: '/tab',
    abstract: true,
    template: 'templates/tabs.html'
  })*/

    // Each tab has its own nav history stack:

        .state('dash', {
            url: '/dash',
            views: {
                'dash': {
                    template: 'templates/dash.html',
                    controller: 'DashCtrl'

                }
            }
        })
        .state('gwrx', {
            url: '/gwrx/:PageType',
            views: {
                'dash': {
                    template: 'templates/gwrx.html',
                    controller: 'GwrxCtrl'
                }
            }
        })
        .state('folderPath', {
            url: '/folder-selector/:select',
            views: {
                'dash': {
                    template: 'templates/folders.html',
                    controller: 'FolderCtrl'
                }
            }
        })
        .state('settings', {
            url: '/settings/:fromSelect',
            views: {
                'dash': {
                    template: 'templates/settings.html',
                    controller: 'SettingsCtrl'
                }
            }
        })
        .state('lgjh', {
            url: '/lgjh/:PageType',
            views: {
                'dash': {
                    template: 'templates/lgjh.html',
                    controller: 'LgjhCtrl'
                }
            }
        })
        .state('entry', {
            url: '/entry',
            views: {
                'dash': {
                    template: 'templates/entry.html',
                    controller: 'EntryCtrl'
                }
            }
        })
        .state('bzGarden', {
            url: '/garden',
            views: {
                'dash': {
                    template: 'templates/garden.html',
                    controller: 'GardenCtrl'
                }
            }
        })
        .state('org', {
            url: '/org/:PageType',
            views: {
                'dash': {
                    template: 'templates/org.html',
                    controller: 'OrgCtrl'
                }
            }
        })
        .state('kpi', {
            url: '/kpi',
            views: {
                'dash': {
                    template: 'templates/kpi-group.html',
                    controller: 'KPICtrl'
                }
            }
        })

    .state('kqhz', {
            url: '/kqhz/:PageType',
            views: {
                'dash': {
                    template: 'templates/kqhz.html',
                    controller: 'kqhzCtrl'
                }
            }
        })
        .state('green-cross', {
            url: '/green-cross/:aspect/:PageType/:BizType/:isLine',
            views: {
                'dash': {
                    template: 'templates/green-cross.html',
                    controller: 'GreenCrossCtrl'
                }
            }
        })
        .state('flow-wall', {
            url: '/flow/view-all/:PageType/:BizType/:isLine',
            views: {
                'dash': {
                    template: 'templates/flow-view-wall.html',
                    controller: 'FlowWallCtrl'
                }
            }
        })
        .state('cost-wall', {
            url: '/cost/view-all/:PageType/:BizType/:isLine',
            views: {
                'dash': {
                    template: 'templates/cost-view-wall.html',
                    controller: 'CostWallCtrl'
                }
            }
        })
        .state('kpi-item', {
            url: '/kpi-item/:aspect/:PageType/:BizType/:isPercentage/:isLine',
            views: {
                'dash': {
                    template: 'templates/kpi-chart.html',
                    controller: 'KPIChartCtrl'
                }
            }
        })
        .state('kpi-detail', {
            url: '/kpi/:aspect/:PageType/:isLine',
            views: {
                'dash': {
                    template: 'templates/kpi-detail.html',
                    controller: 'KPIDetailCtrl'
                }
            }
        })
        .state('kpi-view-board', {
            url: '/view-board',
            views: {
                'dash': {
                    template: 'templates/view-board.html',
                    controller: 'ViewBoardCtrl'
                }
            }
        })
        // 线板
        .state('line-kpi', {
            url: '/line/kpi',
            views: {
                'dash': {
                    template: 'templates/kpi-group.html',
                    controller: 'LineKPICtrl'
                }
            }
        })
        // 登录权限: SFM - AD
        .state('login-dashboard', {
            url: '/login-dashboard',
            views: {
                'dash': {
                    template: LoginDashTemplate,
                    controller: LoginDashCtrl
                }
            }
        })
        // 零件下架
        .state('ad-off', {
            url: '/ad/off',
            views: {
                'dash': {
                    template: XiaJiaTemplate,
                    controller: XiaJiaCtrl
                }
            }
        })
        // 零件上线
        .state('ad-start', {
            url: '/ad/start',
            views: {
                'dash': {
                    template: AdStartTemplate,
                    controller: AdStartCtrl
                }
            }
        })
        // 零件拉动
        .state('ad-pull', {
            url: '/ad/pull',
            views: {
                'dash': {
                    template: AdPullTemplate,
                    controller: AdPullCtrl
                }
            }
        })
        // 拉动历史
        .state('ad-pull-hisotry', {
            url: '/ad/pull-hisotry',
            views: {
                'dash': {
                    template: AdPullHisotryTemplate,
                    controller: AdPullHisotryCtrl
                }
            }
        })
        .state('ad-pull-nick', {
            url: '/ad-pull-nick',
            views: {
                'dash': {
                    template: AdPullNickTemplate,
                    controller: AdPullNickCtrl
                }
            }
        })
        // 人员调整
        .state('ad-member', {
            url: '/ad/member',
            views: {
                'dash': {
                    template: AdMemberTemplate,
                    controller: AdMemberCtrl
                }
            }
        })
        // 零件库存
        .state('ad-kucun', {
            url: '/ad/kucun/:itemCode',
            views: {
                'dash': {
                    template: KucunCtrlTemplate,
                    controller: KucunCtrl
                }
            }
        })
        // 登录页面
        .state('ad-login', {
            url: '/ad/login',
            views: {
                'dash': {
                    template: LoginCtrlTemplate,
                    controller: LoginCtrl
                }
            }
        })
        // AD 权限选择
        .state('ad-sub-permssion', {
            url: '/ad/sub-permssion',
            views: {
                'dash': {
                    template: AdSubMenuTemplate,
                    controller: AdSubMenuCtrl
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/ad/login');

});
module.exports app.name;
