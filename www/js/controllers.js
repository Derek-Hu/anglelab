angular.module('starter.controllers', [])
    .controller('KPIChartCtrl', ['$scope', '$stateParams', '$state', '$ionicScrollDelegate', 'MetaDataSvc', 'KPIItem', 'Constant', 'DateUtil', 'localStorageService',
        function($scope, $stateParams, $state, $ionicScrollDelegate, MetaDataSvc, KPIItem, Constant, DateUtil, localStorageService) {

            $scope.chart = {};
            var aspect = Constant.kpiMenus[$stateParams.aspect];
            $scope.aspect = $stateParams.aspect;

            $scope.isLine = $stateParams.isLine;
            var BizType = $stateParams.BizType;
            for (var i = 0, len = aspect.length; i < len; i++) {
                if (aspect[i].BizType == BizType) {
                    $scope.KPITitle = aspect[i].nm;
                }
            }
            $scope.chart.isRate = $stateParams.isPercentage == 'true';
            //$scope.chart.isRate = ($scope.aspect == 'member' || $scope.aspect == 'cost' || $scope.aspect=='quality');

            var ConstantTypes = {
                'M': '月',
                'W': '周',
                'D': '天'
            };
            var xTypes = {
                'M': '月',
                'W': '',
                'D': ''
            };

            function renderData(key) {
                $scope.chart.xlabel = xTypes[key];
                $scope.chart.data = $scope.types[key].map(function(d) {
                    d.month = d.ID.match(/\d+/)[0];
                    return d;
                });
                $scope.chart1 = { data: null };
                $scope.chart.isDouble = false;
                if (key == 'W') {
                    var total = $scope.chart.data;
                    /*$scope.chart.data = total.filter(function(d){
                      return d.month <27;
                    });
                    $scope.chart.isDouble = true;
                    $scope.chart1 = {
                      data: total.filter(function(d){
                        return d.month >=27;
                      })
                    };*/
                    $scope.chart1.data = null;
                    $scope.chart.isDouble = false;
                } else {
                    $scope.chart1.data = null;
                }
            }

            function generatorDropdown(name, items, defaultOpt) {
                $scope[name] = {};
                $scope[name].isOpen = false;
                $scope[name].items = items;
                $scope[name].close = function() {
                    $scope[name].isOpen = false;
                };
                $scope[name].open = function() {
                    if (!$scope[name].items || $scope[name].items.length <= 1) {
                        return;
                    }
                    this.isOpen = !this.isOpen;
                };
                $scope[name].selectOption = function(option) {
                    if (!option) {
                        return;
                    }
                    if (option.isURL) {
                        $scope[name].close();
                        $state.go(option.key, option.param);
                        return;
                    }
                    $scope[name].option = option;
                    renderData($scope[name].option.key);
                    this.close();
                };
                if (!defaultOpt && items.length) {
                    $scope[name].selectOption(items[0]);
                } else {
                    $scope[name].selectOption(defaultOpt);
                }
            }


            $scope.$on('$ionicView.enter', function(e) {
                $scope.selectedCriteria = localStorageService.get('criteria');
                MetaDataSvc($stateParams.PageType, $scope.isLine).then(function(data) {
                    $scope.metaData = data;
                });

                var lastDay = DateUtil.getLastDay();

                KPIItem($stateParams.BizType, $scope.isLine).then(function(data) {

                    /*data = data.map(function(d){
                      if($scope.chart.isRate){
                        d.ACTUAL =  d.ACTUAL + '%';
                        d.TARGET =  d.TARGET + '%';
                      }
                      return d;
                    });*/

                    var types = Object.keys(ConstantTypes);
                    $scope.types = {};
                    for (var dx = 0, dlen = data.length; dx < dlen; dx++) {
                        var ele = data[dx];
                        for (var i = 0, len = types.length; i < len; i++) {
                            var type = types[i];
                            if (ele.ID.indexOf(type) === 0) {
                                if (type in $scope.types) {
                                    $scope.types[type].push(ele);
                                } else {
                                    $scope.types[type] = [ele];
                                }
                                break;
                            }
                        }
                    }
                    types = Object.keys($scope.types);
                    $scope.typeDropdown = [];
                    for (var i = 0, len = types.length; i < len; i++) {
                        $scope.typeDropdown.push({
                            key: types[i],
                            value: ConstantTypes[types[i]]
                        });
                    }
                    var BizTypeLen = $stateParams.BizType.length;
                    if ($scope.aspect == 'flow' && $stateParams.BizType.charAt(BizTypeLen - 1) == '1') {
                        $scope.typeDropdown.push({
                            key: 'flow-wall',
                            value: '明细',
                            isURL: true,
                            param: { PageType: $stateParams.PageType, BizType: $stateParams.BizType + '-1', isLine: $scope.isLine }
                        });
                    } else if ($scope.aspect == 'cost' && $stateParams.BizType.charAt(BizTypeLen - 1) == '2') {
                        $scope.typeDropdown.push({
                            key: 'cost-wall',
                            value: '目视墙',
                            isURL: true,
                            param: { PageType: $stateParams.PageType, BizType: $stateParams.BizType + '-1', isLine: $scope.isLine }
                        });
                    }
                    generatorDropdown('chartTypeDropdown', $scope.typeDropdown);
                });
            });

        }
    ])
    .controller('ViewBoardCtrl', ['$scope', '$stateParams', '$state', '$ionicScrollDelegate', 'MetaDataSvc', 'KPIItem', 'Constant', 'DateUtil', 'localStorageService', 'Warehouse', 'MenuBorder', 'Util', 'MenuList',
        function($scope, $stateParams, $state, $ionicScrollDelegate, MetaDataSvc, KPIItem, Constant, DateUtil, localStorageService, Warehouse, MenuBorder, Util, MenuList) {

            $scope.getBorderFreq = Util.getBorderFreq;

            $scope.lineMenus = [{
                'MenuId': '10',
                'PageType': 10,
                "nm": "KPI跟踪",
                "enm": "KPI Tracking",
                "fc": "#36CD14",
                "state": "line-kpi",
                "bg": 'img/svg/kpi-tracking.svg'
            }, {
                'MenuId': '11',
                'PageType': 11,
                "nm": "问题跟踪推进",
                "enm": "Problem Tracking",
                "fc": "#62839D",
                "state": "",
                "bg": 'img/svg/problem-tracking.svg'
            }];

            $scope.goTo = function(menu) {
                localStorageService.set('criteria', $scope.criteria);
                if (!menu.state) {
                    return;
                }
                $state.go(menu.state, { PageType: menu.PageType });
            }

            $scope.kqDropdown = {
                isOpen: false,
                close: function() {
                    this.isOpen = false;
                },
                open: function() {
                    if (!$scope.kuqus || $scope.kuqus.length <= 1) {
                        return;
                    }
                    this.isOpen = !this.isOpen;
                    //$scope.bzDropdown.close();
                    //$scope.bcDropdown.close();
                },
                selectOption: function(option) {
                    $scope.criteria.kuqu = option;
                    this.close();
                }
            }
            $scope.criteria = {};
            $scope.$on('$ionicView.enter', function(e) {
                var selectedCriteria = localStorageService.get('criteria');

                MenuList.getList($scope.lineMenus, true, {
                    WareHouseId: selectedCriteria.kuqu ? selectedCriteria.kuqu.Id : -1,
                    ZoneId: selectedCriteria.banzu ? selectedCriteria.banzu.Id : -1
                }).then(function(menus) {
                    $scope.menus = menus;
                });

                Warehouse.getWareHouse().then(function(Warehouse) {
                    $scope.kuqus = Warehouse;
                    var isExist = selectedCriteria && selectedCriteria.kuqu && !!$scope.kuqus.filter(function(kq) {
                        return kq.whse_code == selectedCriteria.kuqu.whse_code;
                    }).length;
                    if (isExist) {
                        $scope.criteria.kuqu = selectedCriteria.kuqu;
                    } else {
                        $scope.criteria.kuqu = $scope.kuqus[0];
                    }
                }, function(Warehouse) {
                    $scope.kuqus = Warehouse;
                });
                $scope.kqDropdown.close();
            });

            $scope.$watch('criteria.kuqu', function() {
                if (!$scope.criteria || !$scope.criteria.kuqu) {
                    return;
                }

                MenuList.getList($scope.lineMenus, true, {
                    WareHouseId: $scope.criteria.kuqu.Id,
                    ZoneId: -1
                }).then(function(menus) {
                    $scope.menus = menus;
                });

                MenuBorder.lineBoard($scope.criteria.kuqu.Id).then(function(data) {
                    $scope.menuBorders = data;
                });
            })

        }
    ])
    .controller('SettingsCtrl', ['$scope', 'Constant', '$state', '$window', '$stateParams', 'Backend', '$cordovaInAppBrowser', '$cordovaFileTransfer', '$timeout',
        function($scope, Constant, $state, $window, $stateParams, Backend, $cordovaInAppBrowser, $cordovaFileTransfer, $timeout) {
            $scope.settings = {};

            var isBackFromFolder = !!$stateParams.fromSelect;
            $scope.back = function() {
                $window.history.go(isBackFromFolder ? -3 : -1);
            };
            $scope.goToFolderSelector = function() {
                $state.go('folderPath', { select: true });
            }
            $scope.openModify = function() {
                $scope.isModify = true;
                $scope.settings.serverURL = $scope.serverAddr;
            }
            $scope.modify = function(serverURL) {
                $scope.isModify = false;
                Constant.updateServerURL(serverURL)
                $scope.serverAddr = serverURL;
                $scope.settings.serverURL = serverURL;
            }
            $scope.getURL = function() {
                return $scope.settings.serverURL;
            }
            $scope.cancelModify = function() {
                $scope.isModify = false;
                $scope.settings.serverURL = $scope.serverAddr;
            }

            $scope.openIntervalModify = function() {
                $scope.isIntervalModify = true;
                $scope.settings.editInterval = $scope.settings.timeInterval;
            }
            $scope.modifyInterval = function(time) {
                if (!time) {
                    time = 1;
                }
                Constant.updateInterval(time);
                $scope.settings.timeInterval = time;
                $scope.isIntervalModify = false;
            }
            $scope.cancelIntervalModify = function() {
                $scope.isIntervalModify = false;
                $scope.settings.editInterval = $scope.settings.timeInterval;
            }
            $scope.getInterval = function() {
                return $scope.settings.timeInterval;
            }
            $scope.checkVersion = function() {
                $scope.checkVersionText = '版本检查中...';
                cordova.getAppVersion.getVersionNumber().then(function(version) {
                    Backend().metaData.query({
                        'BizType': 5,
                        'Version': version
                    }, function(resp) {
                        if (resp && resp[0] && resp[0].NeedUpdate && resp[0].NeedUpdate.length) {
                            $scope.hasNewVersion = 'update';
                            $scope.checkVersionText = '检查更新';
                            $scope.newVersion = resp[0].NeedUpdate;
                            $scope.apkURL = encodeURI(Constant.baseURL() + '/Version/SFM.apk');
                            $scope.apkName = 'SFM-' + resp[0].NeedUpdate + '.apk';
                        } else {
                            $scope.checkVersionText = '检查更新';
                            $scope.hasNewVersion = 'noUpdate';
                        }
                    }, function() {
                        $scope.checkVersionText = '检查更新';
                        $scope.hasNewVersion = '';
                    })
                });
            };
            cordova.getAppVersion.getVersionNumber().then(function(version) {
                $scope.appVersion = version;
            });
            $scope.launchNavigator = function() {
                $cordovaInAppBrowser.open(Constant.baseURL() + '/DownLoad.aspx', '_system', {
                    location: 'no',
                    clearcache: 'no',
                    toolbar: 'no'
                });
            };
            $scope.downloadVersion = function() {
                $scope.hasNewVersion = 'download';
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function gotFS(fileSystem) {
                    fileSystem.root.getDirectory("SFMDownload", { create: true }, function fileSystemSuccess(fileSystem) {
                        fileSystem.getFile($scope.apkName, { create: true, exclusive: false }, function gotFileEntry(fileEntry) {
                            var path = fileEntry.nativeURL.replace($scope.apkName, "");
                            //$scope.dbgMsg += JSON.stringify(fileEntry);
                            try {
                                fileEntry.remove();
                            } catch (e) {}
                            var fileTransfer = new FileTransfer();
                            $cordovaFileTransfer.download($scope.apkURL, path + "" + $scope.apkName, {}, true)
                                .then(function(result) {
                                    window.plugins.webintent.startActivity({
                                            action: window.plugins.webintent.ACTION_VIEW,
                                            //url: 'file://' + entry.fullPath,
                                            url: path + "" + $scope.apkName,
                                            type: 'application/vnd.android.package-archive'
                                        },
                                        function() {},
                                        function(e) { alert('Error launching app update'); }
                                    );
                                }, function(err) {
                                    alert('DownLoad Error');
                                }, function(progress) {
                                    //alert(progress);
                                    $timeout(function() {
                                        $scope.downloadProgress = parseInt((progress.loaded / progress.total) * 100) + '%';
                                    });
                                });

                        }, function() { alert("Read SDK Error"); });
                    });
                }, function() { alert("App Not Ready to Load SDK"); });
            };
            $scope.checkVersionText = '检查更新';
            $scope.hasNewVersion = '';
            $scope.$on('$ionicView.enter', function(e) {
                $scope.hasNewVersion = '';
                $scope.settings.timeInterval = Constant.getInterval();
                $scope.settings.editInterval = $scope.settings.timeInterval;
                $scope.serverAddr = Constant.baseURL();
                $scope.settings.serverURL = $scope.serverAddr;
                $scope.isModify = false;
                $scope.isIntervalModify = false;
                $scope.settings.imagePath = Constant.getImagePath();

            });

        }
    ])
    .controller('FlowWallCtrl', ['$scope', 'Constant', 'localStorageService', 'MetaDataSvc', '$stateParams', 'KPIItem',
        function($scope, Constant, localStorageService, MetaDataSvc, $stateParams, KPIItem) {

            $scope.loadingStatus = '加载中';
            $scope.headers = ['序号', '厂区', '周数', '停线时间', '停线累计分钟(补装台数)', '停线起止时间', '停线零件名称', '停线零件号', '情况描述', '责任方'];
            $scope.isLine = $stateParams.isLine;
            $scope.$on('$ionicView.enter', function(e) {
                $scope.selectedCriteria = localStorageService.get('criteria');
                MetaDataSvc($stateParams.PageType, $scope.isLine).then(function(data) {
                    $scope.metaData = data;
                });
                $scope.loadingStatus = '加载中';
                KPIItem($stateParams.BizType, $scope.isLine).then(function(data) {
                    if (!data.length) {
                        $scope.loadingStatus = '暂无数据';
                        return;
                    }
                    $scope.loadingStatus = '';
                    $scope.records = data;
                }, function() {
                    $scope.loadingStatus = '加载失败';
                    $scope.records = [];
                });

            });

        }
    ])
    .controller('CostWallCtrl', ['$scope', 'Constant', 'localStorageService', 'MetaDataSvc', '$stateParams', 'KPIItem',
        function($scope, Constant, localStorageService, MetaDataSvc, $stateParams, KPIItem) {
            $scope.isLine = $stateParams.isLine;
            $scope.loadingStatus = '加载中';
            $scope.$on('$ionicView.enter', function(e) {
                $scope.selectedCriteria = localStorageService.get('criteria');
                MetaDataSvc($stateParams.PageType, $scope.isLine).then(function(data) {
                    $scope.metaData = data;
                });
                $scope.loadingStatus = '加载中';
                KPIItem($stateParams.BizType, $scope.isLine).then(function(data) {

                    if (!data.length) {
                        $scope.loadingStatus = '暂无数据';
                        return;
                    }
                    $scope.loadingStatus = '';
                    // ----------
                    data.sort(function(a, b) {
                        return parseInt(a.OrderNumber) - parseInt(b.OrderNumber);
                    })

                    /*
                      rows = [{
                        name: 
                        items: [{
                          operator:,
                          rotate: ,
                          months: [1,0,0,1,1,0,0,1,1,0,0,1]
                        }]
                      }]
                    */

                    /*
                    {
                      CODE: 'XTAXG009',
                      STATE: '1', 
                      TYPE: 'T2'
                    }

                      {
                        "TYPE":"检验",
                        "month_r":"11",
                        "OrderNumber":7,
                        "Operate_Name":"张四",
                        "Rotation_Name":"张五"
                      }
                    */
                    var rows = [];
                    for (var i = 0, len = data.length; i < len; i++) {
                        // find job type
                        var jobType = {};
                        var record = data[i];
                        for (var j = 0, jl = rows.length; j < jl; j++) {
                            if (rows[j] && rows[j].name == record.TYPE) {
                                rows[j].items.push(data[i]);
                                break;
                            }
                        }
                        if (j == jl) {
                            jobType.name = record.TYPE;
                            jobType.items = [data[i]];
                            rows.push(jobType);
                        }
                    }
                    $scope.rows = rows;

                    for (var i = 0, len = rows.length; i < len; i++) {
                        rows[i].splitRows = [];
                        rows[i].splitRows.length = Math.ceil(rows[i].items.length / 3);
                    }
                    console.log(rows);

                    /*// ----------
                    var len = data.length, mod = len%4;
                    if(mod){
                      while(mod<4){
                        data.push({});
                        mod++;
                      }
                      console.log('data.length='+data.length);
                    }
                    var res = [], tempRow=[];
                    for(var i=0, len = data.length;i<=len;i++){
                      if(i%4==0 && i!=0){
                        res.push(tempRow);
                        tempRow=[];
                      }
                      tempRow.push(data[i]);
                    }
                    console.log('res=', res);
                    $scope.records = res;*/
                }, function() {
                    $scope.loadingStatus = '加载失败';
                    $scope.rows = [];
                });

            });

        }
    ])
    .controller('GreenCrossCtrl', ['$scope', '$stateParams', '$state', '$ionicScrollDelegate', 'MetaDataSvc', 'KPIItem', 'Constant', 'DateUtil', 'localStorageService',
        function($scope, $stateParams, $state, $ionicScrollDelegate, MetaDataSvc, KPIItem, Constant, DateUtil, localStorageService) {
            function generate(data) {
                for (var i = 0, len = DateUtil.getLastDay(); i < len; i++) {
                    if (!data[i]) {
                        data.push({
                            ID: i + 1,
                            STATE: ''
                        })
                    }
                }
                $scope.rows = [];
                $scope.rows.push(data.filter(function(el) {
                    return parseInt(el.ID) <= 3;
                }));
                $scope.rows.push(data.filter(function(el) {
                    var id = parseInt(el.ID);
                    return id > 3 && id <= 6;
                }));
                $scope.rows.push(data.filter(function(el) {
                    var id = parseInt(el.ID);
                    return id > 6 && id <= 13;
                }));
                $scope.rows.push(data.filter(function(el) {
                    var id = parseInt(el.ID);
                    return id > 13 && id <= 20;
                }));
                $scope.rows.push(data.filter(function(el) {
                    var id = parseInt(el.ID);
                    return id > 20 && id <= 27;
                }));
                var days = data.filter(function(el) {
                    var id = parseInt(el.ID);
                    return id > 27 && id <= 30;
                });
                days.length = 3;
                $scope.rows.push(days);

                days = data.filter(function(el) {
                    var id = parseInt(el.ID);
                    return id == 31;
                });

                days.length = 3;
                $scope.rows.push(days);
            }
            $scope.colors = Constant.kpiColor;
            $scope.isLoading = false;
            $scope.isLine = $stateParams.isLine;
            $scope.$on('$ionicView.enter', function(e) {
                $scope.tableWidth = angular.element(document.getElementById('greenCrossTable')).height();
                $scope.isLoading = true;
                $scope.selectedCriteria = localStorageService.get('criteria');
                MetaDataSvc($stateParams.PageType).then(function(data) {
                    $scope.metaData = data;
                });
                KPIItem($stateParams.BizType, $scope.isLine).then(function(data) {
                    if (!data.length) {
                        data = [];
                        for (var i = 0, len = DateUtil.getLastDay(); i < len; i++) {
                            data.push({
                                ID: i + 1,
                                STATE: ''
                            });
                        }
                    }
                    generate(data);
                    $scope.isLoading = false;
                }, function() {
                    var holder = [];
                    for (var i = 0, len = DateUtil.getLastDay(); i < len; i++) {
                        holder.push({
                            ID: i + 1,
                            STATE: ''
                        });
                    }
                    generate(holder);
                    $scope.isLoading = false;
                });
            });

        }
    ])
    .controller('DashCtrl', ['$scope', '$state', 'localStorageService', 'Constant', 'Warehouse', 'Zone', 'Shift', 'Charge', '$stateParams', 'KPIDetail', 'MetaDataSvc', 'MenuBorder', 'Util', 'MenuList',
        function($scope, $state, localStorageService, Constant, Warehouse, Zone, Shift, Charge, $stateParams, KPIDetail, MetaDataSvc, MenuBorder, Util, MenuList) {

            $scope.getBorderFreq = Util.getBorderFreq;
            $scope.criteria = {
                kuqu: '',
                banzu: '',
                banci: '',
                charger: '加载中',
                currentDate: '加载中'
            }
            $scope.kqDropdown = {
                isOpen: false,
                close: function() {
                    this.isOpen = false;
                },
                open: function() {
                    if (!$scope.kuqus || $scope.kuqus.length <= 1) {
                        return;
                    }
                    this.isOpen = !this.isOpen;
                    $scope.bzDropdown.close();
                    $scope.bcDropdown.close();
                },
                selectOption: function(option) {
                    $scope.criteria.kuqu = option;
                    this.close();
                }
            }

            $scope.bzDropdown = {
                isOpen: false,
                close: function() {
                    this.isOpen = false;
                },
                open: function() {
                    if (!$scope.banzus || $scope.banzus.length <= 1) {
                        return;
                    }
                    this.isOpen = !this.isOpen;
                    $scope.kqDropdown.close();
                    $scope.bcDropdown.close();
                },
                selectOption: function(option) {
                    $scope.criteria.banzu = option;
                    this.close();
                }
            }
            $scope.bcDropdown = {
                isOpen: false,
                close: function() {
                    this.isOpen = false;
                },
                open: function() {
                    if (!$scope.bancis || $scope.bancis.length <= 1) {
                        return;
                    }
                    this.isOpen = !this.isOpen;
                    $scope.kqDropdown.close();
                    $scope.bzDropdown.close();
                },
                selectOption: function(option) {
                    $scope.criteria.banci = option;
                    this.close();
                }
            }

            $scope.goTo = function(menu) {
                localStorageService.set('criteria', $scope.criteria);
                if (!menu.state) {
                    return;
                }
                $state.go(menu.state, { PageType: menu.PageType });
            }
            $scope.goKPIDetail = function(state, BizType) {
                $state.go(state ? state : 'kpi-item', { "aspect": $stateParams.aspect, "PageType": $stateParams.PageType, "BizType": BizType });
            }
            var type = $stateParams.aspect;
            for (var idx = 0, idlen = Constant.kpis.length; idx < idlen; idx++) {
                if (Constant.kpis[idx].type == type) {
                    $scope.aspectTitle = Constant.kpis[idx].name;
                    break;
                }
            }

            if (!type) {
                //$scope.menus=Constant.viewBoard.menus;
            } else {
                $scope.menus = Constant.kpiMenus[type];
                KPIDetail(type).then(function(menus) {
                    $scope.menus = menus;
                    if (type == 'security') {
                        // Green Cross
                        //$scope.menus[0].hatColor = ''; 
                    }
                }, function() {});
            }
            var selectedCriteria = localStorageService.get('criteria');
            $scope.$on('$ionicView.enter', function(e) {
                $scope.criteriaFromCache = localStorageService.get('criteria');
                $scope.isKPI = !!$stateParams.aspect;
                selectedCriteria = localStorageService.get('criteria');
                Warehouse.getWareHouse().then(function(Warehouse) {
                    $scope.kuqus = Warehouse;
                    var isExist = selectedCriteria && selectedCriteria.kuqu && !!$scope.kuqus.filter(function(kq) {
                        return kq.whse_code == selectedCriteria.kuqu.whse_code;
                    }).length;
                    if (isExist) {
                        $scope.criteria.kuqu = selectedCriteria.kuqu;
                    } else {
                        $scope.criteria.kuqu = $scope.kuqus[0];
                    }
                }, function(Warehouse) {
                    $scope.kuqus = Warehouse;
                });
                $scope.kqDropdown.close();
                $scope.bzDropdown.close();
                $scope.bcDropdown.close();

            });
            $scope.$watch('criteria.kuqu', function() {
                if (!$scope.criteria || !$scope.criteria.kuqu) {
                    return;
                }
                // load border color
                MenuBorder.viewBoard($scope.criteria.kuqu.Id).then(function(data) {
                    $scope.menuBorders = data;
                });

                $scope.criteria.banzu = '';
                Zone.getZone($scope.criteria.kuqu.Id).then(function(zones) {
                    $scope.banzus = zones;
                    var isExist = selectedCriteria && selectedCriteria.banzu && !!$scope.banzus.filter(function(bz) {
                        return bz.zone_code == selectedCriteria.banzu.zone_code;
                    }).length;
                    if (isExist) {
                        $scope.criteria.banzu = selectedCriteria.banzu;
                    } else {
                        $scope.criteria.banzu = $scope.banzus[0];
                    }

                }, function(zones) {
                    $scope.banzus = zones;
                });
            })
            $scope.$watch('criteria.banzu', function() {
                if (!$scope.criteria.banzu) {
                    return;
                }
                $scope.criteria.banci = '';
                MenuList.getList(Constant.viewBoard.menus, false, {
                    WareHouseId: $scope.criteria.kuqu ? $scope.criteria.kuqu.Id : -1,
                    ZoneId: $scope.criteria.banzu ? $scope.criteria.banzu.Id : -1
                }).then(function(menus) {
                    $scope.menus = menus;
                });
                Shift.getShift($scope.criteria.kuqu.Id, $scope.criteria.banzu.Id).then(function(shifts) {
                    $scope.bancis = shifts;
                    var isExist = selectedCriteria && selectedCriteria.banci && !!$scope.bancis.filter(function(bc) {
                        return bc.shift_code == selectedCriteria.banci.shift_code;
                    }).length;
                    if (isExist) {
                        $scope.criteria.banci = selectedCriteria.banci;
                    } else {
                        $scope.criteria.banci = $scope.bancis[0];
                    }

                });
            })
            $scope.$watch('criteria.banci', function() {
                if (!$scope.criteria.banci) {
                    return;
                }
                $scope.criteria.charger = '加载中';
                $scope.criteria.currentDate = '加载中';
                localStorageService.set('criteria', $scope.criteria);
                var type = $stateParams.aspect;
                if (type) {
                    KPIDetail(type).then(function(menus) {

                        MenuList.getList(menus, false, {
                            WareHouseId: $scope.criteria.kuqu ? $scope.criteria.kuqu.Id : -1,
                            ZoneId: $scope.criteria.banzu ? $scope.criteria.banzu.Id : -1
                        }).then(function(menus) {
                            $scope.menus = menus;
                        });

                        if (type == 'security') {
                            // Green Cross
                            $scope.menus[0].hatColor = '';
                        }
                    }, function() {});
                } else {
                    Charge.getCharge($scope.criteria.kuqu.Id, $scope.criteria.banzu.Id, $scope.criteria.banci.ID).then(function(data) {
                        $scope.criteria.charger = data.Employee_name;
                        $scope.criteria.currentDate = data.DateTime;
                    });

                }

            })



        }
    ])

.controller('OrgCtrl', ['localStorageService', 'Backend', '$scope', '$state', 'MetaDataSvc', '$stateParams', 'Constant',
    function(localStorageService, Backend, $scope, $state, MetaDataSvc, $stateParams, Constant) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //

        $scope.$on('$ionicView.enter', function(e) {
            MetaDataSvc($stateParams.PageType).then(function(data) {
                $scope.metaData = data;
            });

            $scope.selectedCriteria = localStorageService.get('criteria');
            $scope.group = null;
            Backend().org.query({
                'WareHouseId': $scope.selectedCriteria.kuqu.Id,
                'ZoneId': $scope.selectedCriteria.banzu.Id,
                'ShiftId': $scope.selectedCriteria.banci.ID
            }, function(data) {
                if (!data[0] || data[0].ErrorCode !== undefined) {
                    return;
                }
                data.sort(function(a, b) {
                    return parseInt(a.Order_number) - parseInt(b.Order_number);
                });
                for (var i = 0, len = data.length; i < len; i++) {
                    data[i].Picture = Constant.baseURL() + '/Imagers/' + data[i].Picture;
                }
                $scope.group = {};
                $scope.group.leader = data.splice(0, 1)[0];
                $scope.group.members = data;
                $scope.group.name = $scope.selectedCriteria.banci.description;
                console.log($scope.group);
            });
        });
        $scope.goHome = function() {
            $state.go('dash');
        }

    }
])


.controller('AttendCtrl', ['$scope', '$state', 'Backend', '$window', function($scope, $state, Backend, $window) {

        $scope.goHome = function() {
            $state.go('dash');
        }

        $scope.chart = {
            title: "审核问题关闭率（月度KPI样例）",
            data: [{
                "month": "1",
                "frequency": 0.3782,
                "expect": 0.32782
            }, {
                "month": "2",
                "frequency": 0.23253,
                "expect": 0.18782
            }, {
                "month": "3",
                "frequency": 0.2782,
                "expect": 0.32782
            }, {
                "month": "4",
                "frequency": 0.13253,
                "expect": 0.18782
            }, {
                "month": "5",
                "frequency": 0.12702,
                "expect": 0.49820
            }, {
                "month": "6",
                "frequency": 0.16288,
                "expect": 0.20782
            }, {
                "month": "7",
                "frequency": 0.3,
                "expect": 0.243
            }, {
                "month": "8",
                "frequency": 0.14094,
                "expect": 0.2
            }, {
                "month": "9",
                "frequency": 0.13966,
                "expect": 0.23700
            }],
            yLabel: "审核问题关闭率"
        }

        $scope.$on('$ionicView.enter', function(e) {
            /*Backend().kaoqin.query(function(data){
              $scope.chart.data=data;
            });*/
        });
    }])
    .controller('kqhzCtrl', ['localStorageService', 'Backend', '$scope', 'DateUtil', '$ionicScrollDelegate', '$state', '$stateParams', 'MetaDataSvc',
        function(localStorageService, Backend, $scope, DateUtil, $ionicScrollDelegate, $state, $stateParams, MetaDataSvc) {
            /*$scope.goHome = function(type) {
              var scrollDelegate = $ionicScrollDelegate.$getByHandle(type);
              var view = scrollDelegate.getScrollView();
              var scale = view.__zoomLevel;
              console.log('scale:'+scale);
              if(scale===1){
                if(type !== 'home'){
                  $state.go('dash');
                }
              }else{
                scrollDelegate.zoomTo(1, true, 0, 0);
              }
            }*/
            $scope.selectPickerOpen = false;
            $scope.openPicker = function() {
                $scope.selectPickerOpen = true;
            }
            $scope.closePicker = function() {
                $scope.selectPickerOpen = false;
            }
            $scope.sendPicker = function(isSendEmail) {
                try {
                    var values = angular.element(document.getElementById('selectedMonth')).val().match(/(\d{4}).*(\d{2})/);
                    if (values) {
                        $scope.selectedYear = values[1];
                        $scope.selectedMonth = values[2];

                        var daysNum = DateUtil.getLastDay($scope.selectedYear, $scope.selectedMonth);
                        $scope.headers = headerCols;
                        $scope.daysArr = [];
                        for (var i = 1, len = daysNum; i <= len; i++) {
                            $scope.daysArr.push(i);
                        }
                        $scope.headers = $scope.headers.concat($scope.daysArr);

                        $scope.loadData(
                            $scope.selectedCriteria.kuqu.Id,
                            $scope.selectedCriteria.banzu.Id,
                            $scope.selectedCriteria.banci.ID,
                            $scope.selectedYear + '-' + $scope.selectedMonth,
                            isSendEmail ? 1 : 0);
                    }
                } catch (e) {
                    $scope.closePicker();
                }
                $scope.closePicker();
            }
            $scope.clzMap = [
                'absent',
                'glyphicon glyphicon-ok',
                'circle anjie-border',
                'glyphicon glyphicon-remove',
                'glyphicon glyphicon-star-empty',
                'rect',
                'anjie-bg circle anjie-border',
                'glyphicon glyphicon-record',
                'glyphicon glyphicon-triangle-top',
                'glyphicon glyphicon-asterisk',
                'rect half',
                'hurt',
                'glyphicon-triangle-bottom',
                'glyphicon glyphicon-star'
            ]
            var headerCols = ['工号', '姓名'];
            $scope.loadingStatus = '';
            //var tailCols = ['迟到', '早退', '正班', '加班', '旷工', '请假', '休假','调休','签名'];
            $scope.loadData = function(WareHouseId, ZoneId, ShiftId, Date, IsSendEmail) {
                $scope.loadingStatus = '加载中';
                $scope.data = [];
                Backend().kaoqin.query({
                    'WareHouseId': WareHouseId,
                    'ZoneId': ZoneId,
                    'ShiftId': ShiftId,
                    //2015-09
                    'Date': Date,
                    // 1 or 0
                    'IsSendEmail': IsSendEmail
                }, function(data) {
                    if (!data || !data.length) {
                        $scope.loadingStatus = '暂无数据';
                        return;
                    } else if (data.length == 1 && data[0].ErrorCode !== undefined) {
                        $scope.loadingStatus = '加载失败';
                        return;
                    }
                    $scope.loadingStatus = '';
                    $scope.data = data;
                }, function() {
                    $scope.loadingStatus = '加载失败';
                });
            };


            $scope.$on('$ionicView.enter', function(e) {
                $scope.selectedCriteria = localStorageService.get('criteria');

                var daysNum = DateUtil.getLastDay();
                $scope.headers = headerCols;
                $scope.daysArr = [];
                for (var i = 1, len = daysNum; i <= len; i++) {
                    $scope.daysArr.push(i);
                }
                $scope.headers = $scope.headers.concat($scope.daysArr);

                var today = new Date();
                $scope.selectedYear = today.getFullYear();
                $scope.selectedMonth = today.getMonth() + 1;
                $scope.loadData($scope.selectedCriteria.kuqu.Id, $scope.selectedCriteria.banzu.Id, $scope.selectedCriteria.banci.ID, $scope.selectedYear + '-' + $scope.selectedMonth, 0);
                MetaDataSvc($stateParams.PageType).then(function(data) {
                    $scope.metaData = data;
                });
            });
        }
    ])
    .controller('GardenCtrl', ['$scope', 'Constant', '$state', 'localStorageService', 'KPIDetail',
        function($scope, Constant, $state, localStorageService, KPIDetail) {

            $scope.$on('$ionicView.enter', function(e) {
                $scope.selectedCriteria = localStorageService.get('criteria');
                $scope.myInterval = Constant.getInterval() * 1000;
                //$scope.msg = '';
                $scope.slides = [];
                var imagePath = Constant.getImagePath();
                if (imagePath && imagePath.nativeURL) {
                    window.resolveLocalFileSystemURL(Constant.getImagePath().nativeURL, function(filesystem) {
                            // we must pass what the PhoneGap API doc examples call an "entry" to the reader
                            // which appears to take the form constructed below.
                            var directoryReader = filesystem.createReader();
                            // Get a list of all the entries in the directory
                            //$scope.loading = Constant.loading;
                            directoryReader.readEntries(function(entries) {
                                //$scope.loading = '';
                                //$scope.msg += '目录列表遍历中...';
                                if (!entries) {
                                    //$scope.msg += '目录列表为空';
                                    return;
                                }
                                // again, Eclipse doesn't allow object inspection, thus the stringify
                                $scope.slides = entries.filter(function(entry) {
                                    return entry.name.indexOf('.') !== 0 && entry.isFile && Constant.isExtSupport(entry.name);
                                }).sort(function(a, b) {
                                    // alphabetically sort the entries based on the entry's name
                                    return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
                                }).map(function(d) {
                                    return { image: d.nativeURL };
                                });
                                //$scope.msg += 'images============='+JSON.stringify($scope.images);
                                /*if(!$scope.slides || !$scope.slides.length){
                                  
                                }*/
                                $scope.$apply();
                            }, function(err) {
                                //$scope.loading = Constant.loadingError;
                                //$scope.msg += 'requestFileSystemSuccess目录'+path+'失败:'+JSON.stringify(err);
                            });

                        },
                        function(err) {
                            //$scope.loading = Constant.loadingError;
                            //$scope.msg += 'beginBrowseForFiles目录失败:'+JSON.stringify(err);
                        }
                    );
                }

            });

            $scope.myInterval = Constant.getInterval() * 1000;

            $scope.noWrapSlides = false;
            $scope.slides = [];

            /*$scope.addSlide = function(imageURL) {
              //var newWidth = 600 + slides.length + 1;
              $scope.slides.push({
                image: imageURL
              });
            };*/

            $scope.next = function() {
                for (var i = 0, len = $scope.slides.length; i < len; i++) {
                    if ($scope.slides[i].active) {
                        $scope.slides[i].active = false;
                        if (i + 1 >= len) {
                            i = 0;
                        } else {
                            i++;
                        }
                        $scope.slides[i].active = true;
                    }
                }
            }
            $scope.prev = function() {
                for (var i = 0, len = $scope.slides.length; i < len; i++) {
                    if ($scope.slides[i].active) {
                        $scope.slides[i].active = false;
                        if (i - 1 < 0) {
                            i = len - 1;
                        } else {
                            i--;
                        }
                        $scope.slides[i].active = true;
                    }
                }
            }

        }
    ])
    .controller('FolderCtrl', ['$scope', 'Constant', '$state', 'localStorageService', 'KPIDetail', '$ionicScrollDelegate',
        function($scope, Constant, $state, localStorageService, KPIDetail, $ionicScrollDelegate) {

            $scope.$on('$ionicView.enter', function(e) {
                $scope._treePath = [];
                document.addEventListener('deviceready', function() {
                    $scope.beginBrowseForFiles();
                }, false);
            });

            $scope.goToSettings = function() {
                $state.go('settings', { fromSelect: true });
            }

            $scope.setImageFolder = function() {
                Constant.setImagePath({ name: $scope.folderName.fullPath, nativeURL: $scope.folderName.nativeURL });
                $state.go('settings');
            }
            $scope.doDirectoryUp = function() {
                //var path = $scope._currentFileSystem.root.fullPath;
                //$scope.msg += '----doDirectoryUp'+path;
                $scope.loading = Constant.loading;
                $scope.folders = [];
                $ionicScrollDelegate.scrollTop();
                if (!$scope._treePath.length) {
                    $scope.beginBrowseForFiles();
                    return;
                }
                var path = $scope._treePath.pop();
                window.resolveLocalFileSystemURL(path, function(entry) {
                        entry.getParent(function(filesystem) {
                                requestFileSystemSuccess({ root: filesystem });
                            },
                            function(err) {
                                $scope.loading = Constant.loadingError;
                                //$scope.msg += '------------1-返回上级目录'+path+'失败:'+JSON.stringify(err);
                            }
                        );
                    },
                    function(err) {
                        $scope.loading = Constant.loadingError;
                        //$scope.msg += '----------------2-返回上级目录'+path+'失败:'+JSON.stringify(err);
                    }
                );
            }

            $scope.beginBrowseForFiles = function(file) {
                    //$scope.msg = '';
                    $scope.loading = Constant.loading;
                    $scope.folders = [];
                    $ionicScrollDelegate.scrollTop();
                    // check subscription type
                    if (!file) { // start load root folder
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, requestFileSystemSuccess,
                            function(evt) {
                                $scope.loading = Constant.loadingError;
                                //$scope.msg += JSON.stringify(evt);
                            });
                        return;
                    }
                    //$scope.msg += '----beginBrowseForFiles目录'+JSON.stringify(file);
                    // this is used to get subdirectories
                    $scope._treePath.push(file.nativeURL);
                    window.resolveLocalFileSystemURL(file.nativeURL, function(filesystem) {
                            // we must pass what the PhoneGap API doc examples call an "entry" to the reader
                            // which appears to take the form constructed below.
                            requestFileSystemSuccess({ root: filesystem });
                        },
                        function(err) {
                            $scope.loading = Constant.loadingError;
                            //$scope.msg += 'beginBrowseForFiles目录失败:'+JSON.stringify(err);
                        }
                    );
                }
                /*
                {
                  isFile:false,
                  isDirectory:true,
                  name:'backups',
                  fullPath:'file:///storage/sdcard0',
                  filesystem:null
                }
                */
            function directoryReaderSuccess(entries) {
                $scope.loading = '';
                //$scope.msg += '目录列表遍历中...';
                if (!entries) {
                    //$scope.msg += '目录列表为空';
                    return;
                }
                // again, Eclipse doesn't allow object inspection, thus the stringify
                $scope.folders = entries.filter(function(entry) {
                        return entry.name.indexOf('.') != 0 && (entry.isDirectory || Constant.isExtSupport(entry.name));
                    }).sort(function(a, b) {
                        // alphabetically sort the entries based on the entry's name
                        return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
                    })
                    //$scope.msg += 'folders============='+JSON.stringify($scope.folders);
                    /*if(!$scope.folders || !$scope.folders.length){
                      
                    }*/
                $scope.$apply();
            }

            function requestFileSystemSuccess(fileSystem) {
                //$scope.msg += '加载目录'+JSON.stringify(fileSystem)+'成功';
                // lets insert the current path into our UI
                $scope.folderName = fileSystem.root;
                // save this location for future use
                //$scope._currentFileSystem = fileSystem;
                // create a directory reader
                var directoryReader = fileSystem.root.createReader();
                // Get a list of all the entries in the directory
                $scope.loading = Constant.loading;
                directoryReader.readEntries(directoryReaderSuccess, function(err) {
                    $scope.loading = Constant.loadingError;
                    //$scope.folders = 'Error';
                    //$scope.msg += 'requestFileSystemSuccess目录'+path+'失败:'+JSON.stringify(err);
                });
            }


        }
    ])
    .controller('LineKPICtrl', ['$scope', 'Constant', '$state', 'localStorageService', 'KPIDetail', 'MetaDataSvc', 'MenuList',
        function($scope, Constant, $state, localStorageService, KPIDetail, MetaDataSvc, MenuList) {

            //$scope.kpis=Constant.kpis;
            $scope.isLine = true;
            $scope.$on('$ionicView.enter', function(e) {
                $scope.selectedCriteria = localStorageService.get('criteria');

                MetaDataSvc(Constant.lineKpiPageType, $scope.isLine).then(function(data) {
                    $scope.metaData = data;
                });

                KPIDetail('kpiHome', $scope.isLine).then(function(menus) {
                    MenuList.getList(menus, $scope.isLine, {
                        WareHouseId: $scope.selectedCriteria.kuqu ? $scope.selectedCriteria.kuqu.Id : -1,
                        ZoneId: $scope.selectedCriteria.banzu ? $scope.selectedCriteria.banzu.Id : -1
                    }).then(function(menus) {
                        $scope.kpis = menus;
                    });

                }, function() {});

            });
            $scope.goDetail = function(kpiType, PageType) {
                $state.go('kpi-detail', { "aspect": kpiType, "PageType": Constant.lineKpiPageType, isLine: true });
            }

        }
    ])
    .controller('KPICtrl', ['$scope', 'Constant', '$state', 'localStorageService', 'KPIDetail', 'MenuList',
        function($scope, Constant, $state, localStorageService, KPIDetail, MenuList) {

            $scope.$on('$ionicView.enter', function(e) {
                $scope.selectedCriteria = localStorageService.get('criteria');
                MenuList.getList(Constant.kpis, false, {
                    WareHouseId: $scope.selectedCriteria.kuqu ? $scope.selectedCriteria.kuqu.Id : -1,
                    ZoneId: $scope.selectedCriteria.banzu ? $scope.selectedCriteria.banzu.Id : -1
                }).then(function(menus) {
                    $scope.kpis = menus;
                });

                /*KPIDetail('kpiHome').then(function(menus){
                  $scope.menus = menus;

                },function(){});*/

            });
            $scope.goDetail = function(kpiType, PageType) {
                $state.go('kpi-detail', { "aspect": kpiType, "PageType": PageType });
            }

        }
    ])
    .controller('EntryCtrl', ['$ionicScrollDelegate', 'Constant', '$state', 'localStorageService',
        function($ionicScrollDelegate, Constant, $state, localStorageService) {
            //$ionicScrollDelegate.$getByHandle('mainScroll').freezeScroll(true);

        }
    ])
    .controller('KPIDetailCtrl', ['$scope', 'KPIDetail', 'Constant', '$stateParams', 'MetaDataSvc', '$state', 'localStorageService', 'MenuList',
        function($scope, KPIDetail, Constant, $stateParams, MetaDataSvc, $state, localStorageService, MenuList) {

            $scope.aspect = $stateParams.aspect;

            $scope.goKPIDetail = function(state, BizType, isPercentage, isInvalid) {
                if (isInvalid) {
                    return;
                }
                $state.go(state ? state : 'kpi-item', {
                    "isPercentage": isPercentage + '',
                    "aspect": $stateParams.aspect,
                    "PageType": $stateParams.PageType,
                    "BizType": BizType,
                    "isLine": $stateParams.isLine
                });
            }
            $scope.isLine = $stateParams.isLine;
            var type = $stateParams.aspect;
            for (var idx = 0, idlen = Constant.kpis.length; idx < idlen; idx++) {
                if (Constant.kpis[idx].type == type) {
                    $scope.aspectTitle = Constant.kpis[idx].name;
                    break;
                }
            }
            $scope.$on('$ionicView.enter', function(e) {
                $scope.criteriaFromCache = localStorageService.get('criteria');

                KPIDetail(type, $scope.isLine).then(function(menus) {

                    MenuList.getList(menus, $scope.isLine, {
                        WareHouseId: $scope.criteriaFromCache.kuqu ? $scope.criteriaFromCache.kuqu.Id : -1,
                        ZoneId: $scope.criteriaFromCache.banzu ? $scope.criteriaFromCache.banzu.Id : -1
                    }).then(function(menus) {
                        $scope.menus = menus;
                    });

                    if (type == 'security') {
                        // Green Cross
                        //$scope.menus[0].hatColor = ''; 
                    }
                }, function() {});

                MetaDataSvc($stateParams.PageType).then(function(data) {
                    $scope.metaData = data;
                });

            });

        }
    ])
    .controller('KucunCtrl', ['$scope', 'localStorageService', '$state', '$stateParams', '$http', '$rootScope', 'Backend',
        function($scope, localStorageService, $state, $stateParams, $http, $rootScope, Backend) {
            $scope.itemCode = $stateParams.itemCode;

            function loadList(params) {
                $scope.loadingStatus = '加载中';
                $scope.data = [];
                $http({
                    method: 'GET',
                    url: Backend().kucunListURL + '?itemCode=' + $scope.itemCode + '&whseId=' + $rootScope.loginUser.whseId
                }).
                success(function(data, status, headers, config) {
                    $scope.loadingStatus = '';
                    if (data && Object.prototype.toString.call(data) === '[object Array]') {
                        $scope.data = data;
                        if (!$scope.data.length) {
                            $scope.loadingStatus = '暂无数据';
                        }
                    } else {
                        $scope.data = [];
                        $scope.loadingStatus = (data && data.respCode) ? data.respCode : '加载失败';
                    }
                }).
                error(function(data, status, headers, config) {
                    $scope.loadingStatus = '加载失败';
                    $scope.data = [];
                });
            };
            $scope.loadList = loadList;
            $scope.$on('$ionicView.enter', function(e) {
                loadList();
            });
        }
    ])
    .controller('LoginCtrl', ['$scope', 'AD', '$state', 'localStorageService', function($scope, AD, $state, localStorageService) {
        $scope.params = {};
        $scope.login = function() {
            $scope.errorMsg = '';
            if (!$scope.params.name) {
                $scope.errorMsg = '请输入用户名';
                return;
            }
            if (!$scope.params.pwd) {
                $scope.errorMsg = '请输入密码';
                return;
            }
            AD.login($scope.params).then(function(data) {
                if (data.permssionMap.SFM && data.permssionMap.SFM.length && data.permssionMap.AD && data.permssionMap.AD.length) {
                    $state.go('login-dashboard');
                } else if (data.permssionMap.SFM && data.permssionMap.SFM.length) {
                    if (data.permssionMap.SFM.length === 1) {
                        if (data.permssionMap.SFM[0] === 'line') {
                            // 线板
                            $state.go('kpi-view-board');
                        } else if (data.permssionMap.SFM[0] === 'board') {
                            // 看板
                            $state.go('dash');
                        }
                    } else if (data.permssionMap.SFM.length >= 2) {
                        $state.go('entry');
                    }
                } else if (data.permssionMap.AD && data.permssionMap.AD.length) {
                    if (data.permssionMap.AD.length === 1) {
                        $state.go('ad-' + data.permssionMap.AD[0]);
                    } else if (data.permssionMap.AD.length >= 2) {
                        $state.go('ad-sub-permssion');
                    }
                } else {
                    $scope.errorMsg = '权限不足';
                }
            }, function(error) {
                if (!error) {
                    $scope.errorMsg = '服务器异常';
                    return;
                }

                if (error.respCode === 'unknow') {
                    $scope.errorMsg = error.errorMsg;
                } else if (error.respCode === 500) {
                    $scope.errorMsg = '服务器异常';
                } else if (error.respCode === 403) {
                    $scope.errorMsg = '权限不足';
                }
            })
        };
        $scope.$on('$ionicView.enter', function(e) {
            $scope.errorMsg = '';
            localStorageService.set('loginUser', null);
            $scope.params.pwd = '';
        });
    }])
    .controller('AdMemberCtrl', ['AD', '$scope', '$rootScope', '$q', '$http', 'Backend', '$ionicPopup',
        function(AD, $scope, $rootScope, $q, $http, Backend, $ionicPopup) {

            if ($rootScope.loginUser.groupId === '0') {
                $scope.noPermission = '用户班组未维护';
                return;
            }
            $scope.noPermission = null;

            // An alert dialog
            $scope.showAlert = function(msg, isSuccess, errorMsg) {
                var alertPopup = $ionicPopup.alert({
                    template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
                    okText: '知道了'
                });
                alertPopup.then(function(res) {});
            };

            $scope.showModifyMember = function(item, isRevert) {
                var htmlSelect = '<select id="memberSelection">';
                for (var i = 0, len = $scope.members.length; i < len; i++) {
                    htmlSelect += '<option value="' + $scope.members[i] + '">' + $scope.members[i] + '</option>';
                }
                htmlSelect += '</selct>';
                var confirmPopup = $ionicPopup.confirm({
                    scope: $scope,
                    title: '人员修改',
                    cancelText: '取消',
                    okText: '确认',
                    template: '<div class="member"><table><tr><td class="name">当前选择零件号：</td><td><span>' + item.itemCode + '</span></td></tr><tr><td class="name">人员：</td><td>' + htmlSelect + '</td></tr></table></div>'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        doModify(item, document.getElementById('memberSelection').value, isRevert);
                    }
                });
            };
            // $scope.showAlert('修改成功', true);
            $scope.loadList = function() {
                $scope.errorMsg = '加载中';
                $scope.itemMembers = [];
                $q.all([
                    $scope.loadItemMembers(),
                    $scope.getMembers()
                ]).then(function(datas) {
                    $scope.errorMsg = null;
                    $scope.itemMembers = datas[0].map(function(elem) {
                        elem.txt = (elem.firstUser === elem.lastUser) ? '修改' : '还原';
                        return elem;
                    });
                    $scope.members = datas[1];
                    if (!$scope.itemMembers.length) {
                        $scope.errorMsg = '暂无数据';
                    }
                }).catch(function(errors) {
                    $scope.errorMsg = '加载失败';
                });
            };
            $scope.loadItemMembers = function() {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: Backend().adMemberURL + '?groupId=' + $rootScope.loginUser.groupId
                }).
                success(function(data, status, headers, config) {
                    if (data && Object.prototype.toString.call(data) === '[object Array]') {
                        deferred.resolve(data);
                    } else {
                        deferred.reject(null);
                    }
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(null);
                });
                return deferred.promise;
            };
            $scope.modifyMember = function(item) {
                // 修改中, 还原中
                if (item.txt.indexOf('中') !== -1) {
                    return;
                }
                // 还原中
                var isRevert = (item.firstUser !== item.lastUser);
                if (isRevert) {
                    doModify(item, item.firstUser, isRevert);
                } else {
                    $scope.showModifyMember(item, isRevert);
                }
            };

            function doModify(item, lastName, isRevert) {
                item.txt = item.txt + '中';
                var typeMsg = isRevert ? '还原' : '修改';
                $http({
                    method: 'GET',
                    url: Backend().adModifyMemberURL + '?id=' + item.id + '&lastName=' + lastName + '&userName=' + $rootScope.loginUser.loginNme
                }).
                success(function(data) {
                    item.txt = item.txt.replace('中', '');
                    if (data && data.respCode === 'success') {
                        $scope.showAlert(typeMsg + '成功', true);
                        $scope.loadList();
                    } else {
                        $scope.showAlert(typeMsg + '失败', false, (data && data.respCode) ? data.respCode : '服务器异常');
                    }
                }).
                error(function() {
                    item.txt = item.txt.replace('中', '');
                    $scope.showAlert(typeMsg + '失败', false, '服务器异常');
                });
            }
            $scope.getMembers = function() {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: Backend().adAllMemberURL + '?groupId=' + $rootScope.loginUser.groupId
                }).
                success(function(data, status, headers, config) {
                    if (data && Object.prototype.toString.call(data) === '[object Array]') {
                        deferred.resolve(data);
                    } else {
                        deferred.reject(null);
                    }
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(null);
                });
                return deferred.promise;
            };
            $scope.$on('$ionicView.enter', function(e) {
                if ($rootScope.loginUser.groupId === '0') {
                    $scope.noPermission = '用户班组未维护';
                    return;
                }
                $scope.noPermission = null;
                $scope.loadList();
            });
        }
    ])
    .controller('LoginDashboard', ['$scope', function($scope) {}])
    .controller('AdPullHisotryCtrl', ['$scope', '$http', 'Backend', '$rootScope', function($scope, $http, Backend, $rootScope) {
        $scope.getList = function() {
            $scope.errorMsg = '加载中';
            $scope.menus = [];
            $http({
                method: 'GET',
                url: Backend().pullHistoryURL + '?whseId=' + $rootScope.loginUser.whseId + '&userName=' + $rootScope.loginUser.loginNme
            }).
            success(function(data, status, headers, config) {
                if (data && Object.prototype.toString.call(data) === '[object Array]') {
                    $scope.menus = data;
                    $scope.errorMsg = null;
                    if (!data.length) {
                        $scope.errorMsg = '暂无数据';
                    }
                } else {
                    $scope.menus = [];
                    $scope.errorMsg = (data && data.respCode) ? data.respCode : '暂无数据';
                }
            }).
            error(function(data, status, headers, config) {
                $scope.menus = [];
                $scope.errorMsg = '加载失败';
            });
        };
        $scope.$on('$ionicView.enter', function(e) {
            $scope.getList();
        });
    }])
    .controller('AdStartCtrl', ['$scope', '$state', '$http', 'Backend', '$rootScope', '$ionicPopup',
        function($scope, $state, $http, Backend, $rootScope, $ionicPopup) {

            // An alert dialog
            $scope.showAlert = function(msg, isSuccess, errorMsg) {
                var alertPopup = $ionicPopup.alert({
                    template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
                    okText: '知道了'
                });
                alertPopup.then(function(res) {});
            };

            $scope.start = function(item) {
                if (item.txt === '上线中') {
                    return;
                }
                item.txt = '上线中';

                $http({
                    method: 'GET',
                    url: Backend().startActionURL +
                        '?groupNo=' + item.groupNo +
                        '&whseId=' + $rootScope.loginUser.whseId +
                        '&whseName=' + $rootScope.loginUser.whseCode +
                        '&userName=' + $rootScope.loginUser.loginNme +
                        '&factoryCode=' + $rootScope.loginUser.factoryCode +
                        '&zoneId=' + $rootScope.loginUser.zoneId
                }).
                success(function(data, status, headers, config) {
                    if (data && data.respCode === 'success') {
                        $scope.showAlert('上线成功', true);
                        $scope.getList();
                    } else {
                        $scope.showAlert('上线失败', false, (data && data.respCode) ? data.respCode : null);
                    }
                }).
                error(function(data, status, headers, config) {
                    $scope.showAlert('上线失败', false, '服务器异常');
                });
            };
            $scope.getList = function() {
                $scope.errorMsg = '加载中';
                $scope.menus = [];
                $http({
                    method: 'GET',
                    url: Backend().startListURL + '?whseId=' + $rootScope.loginUser.whseId
                }).
                success(function(data, status, headers, config) {
                    $scope.errorMsg = null;
                    if (data && Object.prototype.toString.call(data) === '[object Array]') {
                        $scope.menus = data;
                        if (!data.length) {
                            $scope.errorMsg = '暂无数据';
                        }
                        $scope.menus = $scope.menus.map(function(d) {
                            d.txt = '上线';
                            return d;
                        });
                    } else {
                        $scope.menus = [];
                        $scope.errorMsg = (data && data.respCode) ? data.respCode : '加载失败';
                    }
                }).
                error(function(data, status, headers, config) {
                    $scope.menus = [];
                    $scope.errorMsg = '加载失败';
                });
            };
            $scope.$on('$ionicView.enter', function(e) {
                $scope.getList();
            });
        }
    ])
    .controller('AdPullCtrl', ['$scope', '$state', '$http', 'Backend', '$rootScope', '$ionicPopup',
        function($scope, $state, $http, Backend, $rootScope, $ionicPopup) {
            $scope.goPullHistory = function() {
                $state.go('ad-pull-hisotry');
            };
            // An alert dialog
            $scope.showAlert = function(msg, isSuccess, errorMsg) {
                var alertPopup = $ionicPopup.alert({
                    template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
                    okText: '知道了'
                });
                alertPopup.then(function(res) {
                    // $scope.getList();
                });
            };
            $scope.pull = function(item) {
                if ($scope.isPulling) {
                    return;
                }
                item.isPulling = $scope.isPulling = true;
                $http({
                    method: 'GET',
                    url: Backend().pullActionURL +
                        '?itemCode=' + item.itemCode +
                        '&routeCode=' + item.routeCode +
                        '&lsa=' + item.lsa +
                        '&whseId=' + $rootScope.loginUser.whseId +
                        '&zoneId=' + $rootScope.loginUser.zoneId +
                        '&userName=' + $rootScope.loginUser.loginNme
                }).
                success(function(data, status, headers, config) {
                    item.isPulling = $scope.isPulling = false;
                    if (data && data.respCode === 'success') {
                        $scope.showAlert('拉动成功', true);
                        $scope.getList();
                    } else {
                        $scope.showAlert('拉动失败', false, data.respCode);
                    }
                }).
                error(function(data, status, headers, config) {
                    item.isPulling = $scope.isPulling = false;
                    $scope.showAlert('拉动失败', false, '服务器异常');
                });
            };
            $scope.getList = function() {
                // $scope.errorMsg = '加载中';
                $http({
                    method: 'GET',
                    url: Backend().pullListURL + '?userId=' + $rootScope.loginUser.userId
                }).
                success(function(data, status, headers, config) {
                    if (data && Object.prototype.toString.call(data) === '[object Array]') {
                        $scope.menus = data;
                        $scope.errorMsg = null;
                        if (!data.length) {
                            $scope.errorMsg = '暂无数据';
                        }
                    } else {
                        $scope.menus = [];
                        $scope.errorMsg = (data && data.respCode) ? data.respCode : '暂无数据';
                    }
                }).
                error(function(data, status, headers, config) {
                    $scope.menus = [];
                    $scope.errorMsg = '加载失败';
                });
            };
            $scope.$on('$ionicView.enter', function(e) {
                $scope.getList();
            });
        }
    ])
    .controller('AdSubMenuCtrl', ['$scope', 'localStorageService', '$state', function($scope, localStorageService, $state) {
        $scope.menuConfig = {
            off: {
                name: '下架',
                enName: 'off the shelf',
                show: false
            },
            start: {
                name: '上线',
                enName: 'on-line',
                show: false
            },
            pull: {
                name: '拉动',
                enName: 'kick-start',
                show: false
            },
            member: {
                name: '人员调整',
                enName: 'turnover',
                show: false
            }
        };
        $scope.menus = Object.keys($scope.menuConfig);
        $scope.$on('$ionicView.enter', function(e) {
            var loginUser = localStorageService.get('loginUser');
            if (!loginUser) {
                $state.go('ad-login');
                return;
            }
            var permssions = loginUser.permssionMap.AD;
            for (var i = 0, len = permssions.length; i < len; i++) {
                $scope.menuConfig[permssions[i]].show = true;
            }
        });
    }])
    .controller('XiaJiaCtrl', ['$scope', 'XiaJia', 'localStorageService', '$state', '$ionicPopup', '$rootScope',
        function($scope, XiaJia, localStorageService, $state, $ionicPopup, $rootScope) {


            // An alert dialog
            $scope.showAlert = function(msg, isSuccess, errorMsg) {
                var alertPopup = $ionicPopup.alert({
                    template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
                    okText: '知道了'
                });
                alertPopup.then(function(res) {});
            };

            $scope.off = function(item) {
                item.txt = '下架中';
                XiaJia.xiajia('?epsSupplyId=' + item.id + '&userName=' + $scope.loginUser.loginNme).then(function() {
                    $scope.showAlert('下架成功', true);
                    loadList();
                }).catch(function(errorMsg) {
                    $scope.showAlert('下架失败', false, errorMsg);
                    item.txt = '下架';
                });
            };

            $scope.loadList = function() {
                $scope.loadingStatus = '加载中';
                $scope.data = [];
                XiaJia.getList('?whseId=' + $rootScope.loginUser.whseId).then(function(data) {
                    $scope.loadingStatus = '';
                    $scope.data = data;
                    if (!$scope.data.length) {
                        $scope.loadingStatus = '暂无数据';
                        return;
                    }

                    $scope.data = $scope.data.map(function(d) {
                        d.txt = '下架';
                        return d;
                    });
                }, function() {
                    $scope.loadingStatus = '加载失败';
                    $scope.data = [];
                });
            };
            $scope.$on('$ionicView.enter', function(e) {
                $scope.loadList();
            });
        }
    ])
    .controller('GwrxCtrl', ['localStorageService', '$scope', 'Backend', '$stateParams', 'MetaDataSvc',
        function(localStorageService, $scope, Backend, $stateParams, MetaDataSvc) {

            $scope.loadingStatus = '';

            function convertObj(val) {
                var obj = {}
                if (!val) {
                    obj.isVal = true;
                    obj.val = '';
                    return obj;
                }
                var arr = val.split('/')
                if (arr.length == 1) {
                    obj.isVal = true;
                    obj.val = val;
                } else if (arr.length == 2) {
                    obj.isSkill = true;
                    obj.skill = arr[0];
                    obj.bg = arr[1];
                } else if (arr.length == 3) {
                    obj.isCertificate = true;
                    obj.bg = arr[1];
                    obj.cert = arr[2];
                }
                return obj
            }
            $scope.loadGwrx = function(WareHouseId, ZoneId, ShiftId) {
                $scope.loadingStatus = '加载中';
                Backend().gwrx.query({
                    'WareHouseId': WareHouseId,
                    'ZoneId': ZoneId,
                    'ShiftId': ShiftId
                }, function(data) {
                    $scope.loadingStatus = '';

                    $scope.records = data.map(function(d) {
                        for (var p in d) {
                            if (d.hasOwnProperty(p)) {
                                d[p] = convertObj(d[p]);
                            }
                        }
                        return d;
                    });
                    if (!$scope.records || !$scope.records.length) {
                        $scope.loadingStatus = '暂无数据';
                        return;
                    } else if (data.length == 1 && data[0].ErrorCode !== undefined) {
                        $scope.loadingStatus = '加载失败';
                        return;
                    }
                    $scope.headers = Object.keys(data[0]).filter(function(data) {
                        return data != '序号' && data != '班组' && data != '班次';
                    });
                }, function() {
                    $scope.loadingStatus = '加载失败';
                });
            };
            $scope.$on('$ionicView.enter', function(e) {
                $scope.selectedCriteria = localStorageService.get('criteria');
                $scope.loadGwrx($scope.selectedCriteria.kuqu.Id, $scope.selectedCriteria.banzu.Id, $scope.selectedCriteria.banci.ID);

                MetaDataSvc($stateParams.PageType).then(function(data) {
                    $scope.metaData = data;
                });
            });

        }
    ])
    .controller('LgjhCtrl', ['localStorageService', '$scope', 'Backend', 'MetaDataSvc', '$stateParams',
        function(localStorageService, $scope, Backend, MetaDataSvc, $stateParams) {


            $scope.loadingStatus = '';
            $scope.loadLgjh = function(WareHouseId, ZoneId, ShiftId) {
                $scope.loadingStatus = '加载中';
                Backend().lgjh.query({
                    'WareHouseId': WareHouseId,
                    'ZoneId': ZoneId,
                    'ShiftId': ShiftId
                }, function(data) {
                    $scope.loadingStatus = '';
                    if (!data || !data.length) {
                        $scope.loadingStatus = '暂无数据';
                        return;
                    } else if (data.length == 1 && data[0].ErrorCode !== undefined) {
                        $scope.loadingStatus = '加载失败';
                        return;
                    }
                    data.sort(function(a, b) {
                        return parseInt(a.Order_number) - parseInt(b.Order_number);
                    })
                    var rows = [];
                    /*
                      rows = [{
                        name: 
                        items: [{
                          operator:,
                          rotate: ,
                          months: [1,0,0,1,1,0,0,1,1,0,0,1]
                        }]
                      }]
                    */

                    /*
                      {
                        "Job_name":"检验",
                        "month_r":"11",
                        "Order_number":7,
                        "Operate_Name":"张四",
                        "Rotation_Name":"张五"
                      }
                    */
                    for (var i = 0, len = data.length; i < len; i++) {
                        // find job type
                        var jobType = {};
                        var record = data[i];
                        for (var j = 0, jl = rows.length; j < jl; j++) {
                            if (rows[j] && rows[j].name == record.Job_name) {
                                jobType = rows[j];
                                break;
                            }
                        }
                        if (j == jl) {
                            jobType.name = record.Job_name;
                            jobType.items = [];
                            rows.push(jobType);
                        }
                        // find items
                        var months = [];
                        var items = {};
                        for (var k = 0, lk = jobType.items.length; k < lk; k++) {
                            if (record.Operate_Name == jobType.items[k].operator &&
                                record.Rotation_Name == jobType.items[k].rotate) {
                                items = jobType.items[k];
                                break;
                            }
                        }
                        if (k == lk) {
                            items.operator = record.Operate_Name;
                            items.rotate = record.Rotation_Name;
                            // 12 months
                            items.months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            jobType.items.push(items);
                        }
                        items.months[record.month_r - 1] = 1;
                    }
                    $scope.rows = rows;
                    console.log(rows);
                }, function() {
                    $scope.loadingStatus = '加载失败';
                });

            };
            $scope.$on('$ionicView.enter', function(e) {
                $scope.selectedCriteria = localStorageService.get('criteria');
                $scope.loadLgjh($scope.selectedCriteria.kuqu.Id, $scope.selectedCriteria.banzu.Id, $scope.selectedCriteria.banci.ID);

                MetaDataSvc($stateParams.PageType).then(function(data) {
                    $scope.metaData = data;
                });
            });

        }
    ]);
