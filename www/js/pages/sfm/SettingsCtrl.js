var Controller = function ($scope, Constant, $state, $window, $stateParams, Backend, $cordovaInAppBrowser, $cordovaFileTransfer, $timeout, $location, $cordovaFileOpener2) {
    $scope.settings = {};

    $scope.noHomeMenu = ('noHomeMenu' in $location.search());

    var isBackFromFolder = !!$stateParams.fromSelect;

    $scope.back = function () {
        $window.history.go(isBackFromFolder ? -3 : -1);
    };
    $scope.goToFolderSelector = function () {
        $state.go('folderPath', { select: true });
    };
    $scope.openModify = function () {
        $scope.isModify = true;
        $scope.settings.serverURL = $scope.serverAddr;
    };
    $scope.modify = function (serverURL) {
        $scope.isModify = false;
        Constant.updateServerURL(serverURL);
        $scope.serverAddr = serverURL;
        $scope.settings.serverURL = serverURL;
    };
    $scope.getURL = function () {
        return $scope.settings.serverURL;
    };
    $scope.cancelModify = function () {
        $scope.isModify = false;
        $scope.settings.serverURL = $scope.serverAddr;
    };

    $scope.openIntervalModify = function () {
        $scope.isIntervalModify = true;
        $scope.settings.editInterval = $scope.settings.timeInterval;
    };
    $scope.modifyInterval = function (time) {
        if (!time) {
            time = 1;
        }
        Constant.updateInterval(time);
        $scope.settings.timeInterval = time;
        $scope.isIntervalModify = false;
    };
    $scope.cancelIntervalModify = function () {
        $scope.isIntervalModify = false;
        $scope.settings.editInterval = $scope.settings.timeInterval;
    };
    $scope.getInterval = function () {
        return $scope.settings.timeInterval;
    };
    $scope.checkVersion = function () {
        $scope.checkVersionText = '版本检查中...';
        cordova.getAppVersion.getVersionNumber().then(function (version) {
            /*eslint-disable*/
            Backend().metaData.query({
                'BizType': 5,
                'Version': version
            }, function (resp) {
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
            }, function () {
                $scope.checkVersionText = '检查更新';
                $scope.hasNewVersion = '';
            });
        });
    };
    cordova.getAppVersion.getVersionNumber().then(function (version) {
        $scope.appVersion = version;
    });
    $scope.launchNavigator = function () {
        $cordovaInAppBrowser.open(Constant.baseURL() + '/DownLoad.aspx', '_system', {
            location: 'no',
            clearcache: 'no',
            toolbar: 'no'
        });
    };
    $scope.downloadVersion = function () {
        $scope.hasNewVersion = 'download';
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function gotFS(fileOuterSystem) {
            fileOuterSystem.root.getDirectory('SFMDownload', { create: true }, function fileSystemSuccess(fileSystem) {
                fileSystem.getFile($scope.apkName, { create: true, exclusive: false }, function gotFileEntry(fileEntry) {
                    var path = fileEntry.nativeURL.replace($scope.apkName, '');

                    // $scope.dbgMsg += JSON.stringify(fileEntry);
                    try {
                        fileEntry.remove();
                    /*eslint-disable*/
                    } catch (e) {}
                    $cordovaFileTransfer.download($scope.apkURL, path + '' + $scope.apkName, {}, true)
                        .then(function () {
                            // window.plugins.webintent.startActivity({
                            //     action: window.plugins.webintent.ACTION_VIEW,
                            //         // url: 'file://' + entry.fullPath,
                            //     url: path + '' + $scope.apkName,
                            //     type: 'application/vnd.android.package-archive'
                            // },
                            //     function () {},
                            //     function () { alert('Error launching app update'); }
                            // );
                            $cordovaFileOpener2.open(
                              // '/sdcard/Download/gmail.apk',
                              path + '' + $scope.apkName,
                              'application/vnd.android.package-archive'
                            ).then(function() {
                                // Success!
                            }, function(err) {
                                // An error occurred. Show a message to the user
                            });
                        }, function () {
                            alert('DownLoad Error');
                        }, function (progress) {
                            // alert(progress);
                            $timeout(function () {
                                $scope.downloadProgress = parseInt((progress.loaded / progress.total) * 100, 10) + '%';
                            });
                        });

                }, function () { alert('Read SDK Error'); });
            });
        }, function () { alert('App Not Ready to Load SDK'); });
    };
    $scope.checkVersionText = '检查更新';
    $scope.hasNewVersion = '';
    $scope.$on('$ionicView.enter', function () {
        $scope.hasNewVersion = '';
        $scope.settings.timeInterval = Constant.getInterval();
        $scope.settings.editInterval = $scope.settings.timeInterval;
        $scope.serverAddr = Constant.baseURL();
        $scope.settings.serverURL = $scope.serverAddr;
        $scope.isModify = false;
        $scope.isIntervalModify = false;
        $scope.settings.imagePath = Constant.getImagePath();

    });

};


module.exports = ['$scope', 'Constant', '$state', '$window', '$stateParams', 'Backend', '$cordovaInAppBrowser', '$cordovaFileTransfer', '$timeout', '$location', '$cordovaFileOpener2', Controller];
