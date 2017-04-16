var ConfigFileName = 'SFM-cfg-url.properties';
var ConfigIntervalName = 'SFM-cfg-interval.properties';
var ConfigImgPathName = 'SFM-cfg-img-path.properties';
var settings = {
    cacheURL: 'http://221.181.71.171:8082',
    timeInterval: 10,
    imagePath: { name: '目录暂未选择', nativeURL: null }
};

module.exports = {
    name: 'Constant',
    fn: ['$q', '$cordovaFile', function ($q, $cordovaFile) {
        function readFromFile(fileName) {
            var defer = $q.defer();

            $cordovaFile.checkFile(cordova.file.dataDirectory, fileName)
                .then(function () {
                    $cordovaFile.readAsText(cordova.file.dataDirectory, fileName)
                        .then(function (value) {
                            // alert('Fetch ' + fileName + ' value = '+ value);
                            defer.resolve(value);
                        }, function () {
                            defer.resolve(null);
                        });
                }, function () {
                    defer.resolve(null);
                });
            return defer.promise;
        }

        function saveToFile(fileName, value) {
            var defer = $q.defer();

            $cordovaFile.createFile(cordova.file.dataDirectory, fileName, true)
                .then(function () {
                    $cordovaFile.writeFile(cordova.file.dataDirectory, fileName, value, true)
                        .then(function () {
                            // alert('save to ' + fileName + ' value = '+ value);
                            defer.resolve(value);
                        }, function () {
                            defer.resolve(null);
                        });
                }, function () {
                    defer.resolve(null);
                });
            return defer.promise;
        }

        return {
            initBackendURL: function () {
                return $q.all([readFromFile(ConfigFileName),
                    readFromFile(ConfigIntervalName),
                    readFromFile(ConfigImgPathName)
                ]).then(function (values) {
                    if (values) {
                        if (values[0]) {
                            settings.cacheURL = values[0];
                        }
                        if (values[1]) {
                            settings.timeInterval = values[1];
                        }
                        if (values[2]) {
                            try {
                                settings.imagePath = JSON.parse(values[2]);
                            } catch (e) {}
                        }
                    }
                });
            },
            baseURL: function () {
                return settings.cacheURL;
            },
            getInterval: function () {
                return settings.timeInterval;
            },
            updateInterval: function (timeInterval, callback) {
                return saveToFile(ConfigIntervalName, timeInterval).then(function (time) {
                    if (time) {
                        settings.timeInterval = time;
                    }
                    if (callback) {
                        callback();
                    }
                });
            },
            updateServerURL: function (url, callback) {
                return saveToFile(ConfigFileName, url).then(function (backendURL) {
                    if (backendURL) {
                        settings.cacheURL = url;
                    }
                    if (callback) {
                        callback();
                    }
                });
            },
            getImagePath: function () {
                return settings.imagePath;
            },
            setImagePath: function (imagePath, callback) {
                return saveToFile(ConfigImgPathName, JSON.stringify(imagePath)).then(function (path) {
                    if (path) {
                        // path is string, imagePath is the original object
                        settings.imagePath = imagePath;
                    }
                    if (callback) {
                        callback();
                    }
                });
            },
            lineKpiPageType: 10,
            loading: '加载中',
            loadingError: '加载失败',
            supportedExt: ['.jpg', '.jpeg', '.bmp', '.png', '.gif', '.tif'],
            isExtSupport: function (name) {
                var nameLen, extName, i, len;

                if (!name) {
                    return false;
                }
                nameLen = name.length;

                for (i = 0, len = this.supportedExt.length; i < len; i++) {
                    extName = this.supportedExt[i];

                    if (name.substring(nameLen - extName.length, nameLen) === extName) {
                        return true;
                    }
                }
                return false;
            },

            viewBoard: {

                menus: [{
                    'MenuId': '1',
                    'PageType': 1,
                    'nm': '班组结构图',
                    'enm': 'Team Structure',
                    'fc': '#36CD14',
                    'state': 'org',
                    'bg': 'img/svg/team-structure.svg'
                }, {
                    'MenuId': '2',
                    'PageType': 2,
                    'nm': '考勤汇总',
                    'enm': 'Attendance Summary',
                    'fc': '#62839D',
                    'state': 'kqhz',
                    'bg': 'img/svg/attendance-summary.svg'
                }, {
                    'MenuId': '3',
                    'PageType': 3,
                    'nm': '岗位柔性表',
                    'enm': 'Flexible Job List',
                    'fc': '#aaa',
                    'bg': 'img/svg/flexible-job-list.svg',
                    'state': 'gwrx'
                }, {
                    'MenuId': '4',
                    'PageType': 4,
                    'nm': '轮岗计划',
                    'enm': 'Rotation Plan',
                    'fc': '#aaa',
                    'bg': 'img/svg/rotation-plan.svg',
                    'state': 'lgjh'
                }, {
                    'MenuId': '5',
                    'PageType': 5,
                    'nm': 'KPI跟踪',
                    'enm': 'KPI Tracking',
                    'fc': '#aaa',
                    'state': 'kpi',
                    'bg': 'img/svg/kpi-tracking.svg'
                }, {
                    'MenuId': '6',
                    'PageType': 6,
                    'nm': '问题跟踪推进',
                    'enm': 'Problem Tracking',
                    'fc': '#aaa',
                    'bg': 'img/svg/problem-tracking.svg',
                    'state': ''
                }, {
                    'MenuId': '7',
                    'PageType': 7,
                    'nm': '变更点管理',
                    'enm': 'Change Point Management',
                    'fc': '#aaa',
                    'bg': 'img/svg/change-point-management.svg',
                    'state': ''
                }, {
                    'MenuId': '8',
                    'PageType': 8,
                    'nm': '岗位工时平衡墙',
                    'enm': 'Job Time Balance Wall',
                    'fc': '#aaa',
                    'bg': 'img/svg/job-time-balance-wall.svg',
                    'state': ''
                }, {
                    'MenuId': '9',
                    'PageType': 9,
                    'nm': '班组园地',
                    'enm': 'Team Garden',
                    'fc': '#aaa',
                    'bg': 'img/svg/team-garden.svg',
                    'state': 'bzGarden'
                }]
            },
            kpiColor: {
                '红': '#E73334',
                '绿': '#A2D329',
                '黄': '#F2E439',
                '蓝': '#12AAEB',
                '橙': '#F5AA35',
                '紫': '#800080',
                '黑': '#000'
            },
            hatImage: {
                '红': 'red',
                '绿': 'green'
            },
            kpis: [{
                'MenuId': '5-1-0',
                name: '安全',
                PageType: 5,
                logo: '1900959231.jpg',
                id: 1,
                type: 'security'
            }, {
                'MenuId': '5-5-0',
                name: '质量',
                PageType: 5,
                logo: '1453182686.jpg',
                id: 5,
                type: 'quality'
            }, {
                'MenuId': '5-2-0',
                PageType: 5,
                name: '流程',
                logo: '1032454182.jpg',
                id: 2,
                type: 'flow'
            }, {
                'MenuId': '5-3-0',
                PageType: 5,
                logo: '628902908.jpg',
                name: '人员',
                id: 3,
                type: 'member'
            }, {
                'MenuId': '5-4-0',
                PageType: 5,
                logo: '1975774961.jpg',
                name: '成本',
                id: 4,
                type: 'cost'
            }],
            kpiBizType: {
                'kpiHome': '0-0',
                'security': '1-0',
                'flow': '2-0',
                'member': '3-0',
                'cost': '4-0',
                'quality': '5-0'
            },
            kpiMenus: {
                'security': [{
                    'nm': '安全绿十字',
                    'MenuId': '5-1-1',
                    'BizType': '1-1',
                    'enm': 'Green Cross',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/green-cross.svg',
                    'url': 'green-cross'
                }, {
                    'nm': '实时工伤次数率',
                    'MenuId': '5-1-2',
                    'BizType': '1-2',
                    'enm': 'Frequency of Injury',
                    'fc': '#aaa',
                    'bg': 'img/svg/frequency-of-injury.svg',
                    'bc': '#049BF4'
                }],
                'flow': [{
                    'nm': '生产停线时间',
                    'MenuId': '5-2-1',
                    'BizType': '2-1',
                    'enm': 'Turnover Rate',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/turnover-rate.svg'
                }, {
                    'nm': '收发货及时率',
                    'MenuId': '5-2-2',
                    'BizType': '2-2',
                    'enm': 'Timely Delivery Rate',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/timely-delivery-rate.svg',
                    'invalid': true
                }],
                'quality': [{
                    'nm': '库存准确率',
                    'MenuId': '5-5-1',
                    'BizType': '5-1',
                    'enm': 'Inventory Accuracy',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/inventory-accuracy.svg',
                    'isPercentage': true
                }, {
                    'nm': 'FIFO符合率',
                    'MenuId': '5-5-2',
                    'BizType': '5-2',
                    'enm': 'FIFO Coincidence Rate',
                    'fc': '#aaa',
                    'bg': 'img/svg/FIFO-coincidence-rate.svg',
                    'bc': '#049BF4',
                    'isPercentage': true
                }, {
                    'nm': '库位一致性',
                    'MenuId': '5-5-3',
                    'BizType': '5-3',
                    'enm': 'Library Level Consistency',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/library-level-consistency.svg',
                    'isPercentage': true
                }, {
                    'nm': '非规范性操作',
                    'MenuId': '5-5-4',
                    'BizType': '5-4',
                    'enm': 'Non Normative Operation',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/non-normative-operation.svg',
                    'isPercentage': false
                }, {
                    'nm': '清洁度',
                    'MenuId': '5-5-5',
                    'BizType': '5-5',
                    'enm': 'Cleanliness',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/logistics-cleanliness.svg',
                    'isPercentage': false
                }, {
                    'nm': '工位器具',
                    'MenuId': '5-5-6',
                    'BizType': '5-6',
                    'enm': 'Working Position Apparatus',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/material-box-cleanness.svg',
                    'isPercentage': false
                }
                    /* ,{
                      "nm": "物流工废索赔额",
                      'MenuId': '5-5-7',
                      "BizType": '5-7',
                      "enm": "Industry Waste Claims",
                      "fc": "#aaa",
                      "bc": "#049BF4",
                      "bg": 'img/svg/industry-waste-claims.svg'
                    }*/
                ],
                'member': [{
                    'nm': '离职率',
                    'MenuId': '5-3-1',
                    'BizType': '3-1',
                    'enm': 'Turnover Rate',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/turnover-rate.svg',
                    'isPercentage': true
                }, {
                    'nm': '缺勤率',
                    'MenuId': '5-3-2',
                    'BizType': '3-2',
                    'enm': 'AbsentTeeism Rate',
                    'fc': '#aaa',
                    'bg': 'img/svg/absent-teeism-rate.svg',
                    'bc': '#049BF4',
                    'isPercentage': true
                }],
                'cost': [{
                    'nm': 'AGV开动率',
                    'MenuId': '5-4-1',
                    'BizType': '4-1',
                    'enm': 'AGV Development Rate',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img//svg/avg-development-rate.svg',
                    'isPercentage': true
                }, {
                    'nm': '移动设备开动率',
                    'MenuId': '5-4-2',
                    'BizType': '4-2',
                    'enm': 'Mobile Device Starting Rate',
                    'fc': '#aaa',
                    'bg': 'img/svg/mobile-device-starting-rate.svg',
                    'bc': '#049BF4',
                    'isPercentage': true
                }, {
                    'nm': '移动设备完好率',
                    'MenuId': '5-4-3',
                    'BizType': '4-3',
                    'enm': 'Mobile Device Integrity',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/mobile-device-integrity.svg',
                    'isPercentage': true
                }, {
                    'nm': '劳动生产率VBZ',
                    'MenuId': '5-4-4',
                    'BizType': '4-4',
                    'enm': 'Labor Productivity VBZ',
                    'fc': '#aaa',
                    'bc': '#049BF4',
                    'bg': 'img/svg/labor-productivity-VBZ.svg',
                    'isPercentage': true
                }]
            }
        };
    }]
};
