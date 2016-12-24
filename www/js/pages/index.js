var servicesModule = require('../services');
var componentsModule = require('../components');
var LocalStorageModule = require('angular-local-storage');
var ngResource = require('angular-resource');
var app = angular.module('starter.routers', ['ionic', 'ngCordova', 'ui.bootstrap', LocalStorageModule, ngResource, servicesModule, componentsModule]);

app.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    /* .state('tab', {
    url: '/tab',
    abstract: true,
    template: 'templates/tabs.html'
  })*/

    // Each tab has its own nav history stack:

        .state('dash', {
            url: '/dash',
            views: {
                'dash': {
                    template: require('../pages/sfm/dash.html'),
                    controller: require('../pages/sfm/DashCtrl')

                }
            }
        })
        .state('gwrx', {
            url: '/gwrx/:PageType',
            views: {
                'dash': {
                    template: require('../pages/sfm/gwrx.html'),
                    controller: require('../pages/sfm/GwrxCtrl')
                }
            }
        })
        .state('folderPath', {
            url: '/folder-selector/:select',
            views: {
                'dash': {
                    template: require('../pages/sfm/folders.html'),
                    controller: require('../pages/sfm/FolderCtrl')
                }
            }
        })
        .state('settings', {
            url: '/settings/:fromSelect',
            views: {
                'dash': {
                    template: require('../pages/sfm/settings.html'),
                    controller: require('../pages/sfm/SettingsCtrl')
                }
            }
        })
        .state('lgjh', {
            url: '/lgjh/:PageType',
            views: {
                'dash': {
                    template: require('../pages/sfm/lgjh.html'),
                    controller: require('../pages/sfm/LgjhCtrl')
                }
            }
        })
        .state('entry', {
            url: '/entry',
            views: {
                'dash': {
                    template: require('../pages/sfm/entry.html'),
                    controller: require('../pages/sfm/EntryCtrl')
                }
            }
        })
        .state('bzGarden', {
            url: '/garden',
            views: {
                'dash': {
                    template: require('../pages/sfm/garden.html'),
                    controller: require('../pages/sfm/GardenCtrl')
                }
            }
        })
        .state('org', {
            url: '/org/:PageType',
            views: {
                'dash': {
                    template: require('../pages/sfm/org.html'),
                    controller: require('../pages/sfm/OrgCtrl')
                }
            }
        })
        .state('kpi', {
            url: '/kpi',
            views: {
                'dash': {
                    template: require('../pages/sfm/kpi-group.html'),
                    controller: require('../pages/sfm/KPICtrl')
                }
            }
        })

    .state('kqhz', {
        url: '/kqhz/:PageType',
        views: {
            'dash': {
                template: require('../pages/sfm/kqhz.html'),
                controller: require('../pages/sfm/KqhzCtrl')
            }
        }
    })
        .state('green-cross', {
            url: '/green-cross/:aspect/:PageType/:BizType/:isLine',
            views: {
                'dash': {
                    template: require('../pages/sfm/green-cross.html'),
                    controller: require('../pages/sfm/GreenCrossCtrl')
                }
            }
        })
        .state('flow-wall', {
            url: '/flow/view-all/:PageType/:BizType/:isLine',
            views: {
                'dash': {
                    template: require('../pages/sfm/flow-view-wall.html'),
                    controller: require('../pages/sfm/FlowWallCtrl')
                }
            }
        })
        .state('cost-wall', {
            url: '/cost/view-all/:PageType/:BizType/:isLine',
            views: {
                'dash': {
                    template: require('../pages/sfm/cost-view-wall.html'),
                    controller: require('../pages/sfm/CostWallCtrl')
                }
            }
        })
        .state('kpi-item', {
            url: '/kpi-item/:aspect/:PageType/:BizType/:isPercentage/:isLine',
            views: {
                'dash': {
                    template: require('../pages/sfm/kpi-chart.html'),
                    controller: require('../pages/sfm/KPIChartCtrl')
                }
            }
        })
        .state('kpi-detail', {
            url: '/kpi/:aspect/:PageType/:isLine',
            views: {
                'dash': {
                    template: require('../pages/sfm/kpi-detail.html'),
                    controller: require('../pages/sfm/KPIDetailCtrl')
                }
            }
        })
        .state('kpi-view-board', {
            url: '/view-board',
            views: {
                'dash': {
                    template: require('../pages/sfm/view-board.html'),
                    controller: require('../pages/sfm/ViewBoardCtrl')
                }
            }
        })
        // 线板
        .state('line-kpi', {
            url: '/line/kpi',
            views: {
                'dash': {
                    template: require('../pages/sfm/kpi-group.html'),
                    controller: require('../pages/sfm/LineKPICtrl')
                }
            }
        })
        // 登录权限: SFM - AD
        .state('login-dashboard', {
            url: '/login-dashboard',
            views: {
                'dash': {
                    template: require('../pages/ad-board/login-dashboard.html'),
                    controller: require('../pages/ad-board/LoginDashboard')
                }
            }
        })
        // 零件下架
        .state('ad-off', {
            url: '/ad/off',
            views: {
                'dash': {
                    template: require('../pages/ad-board/xiajia.html'),
                    controller: require('../pages/ad-board/XiaJiaCtrl')
                }
            }
        })
        // 零件上线
        .state('ad-start', {
            url: '/ad/start',
            views: {
                'dash': {
                    template: require('../pages/ad-board/start.html'),
                    controller: require('../pages/ad-board/AdStartCtrl')
                }
            }
        })
        // 零件拉动
        .state('ad-pull', {
            url: '/ad/pull',
            views: {
                'dash': {
                    template: require('../pages/ad-board/pull.html'),
                    controller: require('../pages/ad-board/AdPullCtrl')
                }
            }
        })
        // 拉动历史
        .state('ad-pull-hisotry', {
            url: '/ad/pull-hisotry',
            views: {
                'dash': {
                    template: require('../pages/ad-board/pull-hisotry.html'),
                    controller: require('../pages/ad-board/AdPullHisotryCtrl')
                }
            }
        })
        // 人员调整
        .state('ad-member', {
            url: '/ad/member',
            views: {
                'dash': {
                    template: require('../pages/ad-board/member.html'),
                    controller: require('../pages/ad-board/AdMemberCtrl')
                }
            }
        })
        // 零件库存
        .state('ad-kucun', {
            url: '/ad/kucun/:itemCode',
            views: {
                'dash': {
                    template: require('../pages/ad-board/kucun.html'),
                    controller: require('../pages/ad-board/KucunCtrl')
                }
            }
        })
        // 登录页面
        .state('ad-login', {
            url: '/ad/login',
            views: {
                'dash': {
                    template: require('../pages/ad-board/login.html'),
                    controller: require('../pages/ad-board/LoginCtrl')
                }
            }
        })
        // AD 权限选择
        .state('ad-sub-permssion', {
            url: '/ad/sub-permssion',
            views: {
                'dash': {
                    template: require('../pages/ad-board/ad-sub-permission.html'),
                    controller: require('../pages/ad-board/AdSubMenuCtrl')
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/ad/login');

});
module.exports = app.name;
