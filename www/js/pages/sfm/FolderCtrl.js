var Controller = function($scope, Constant, $state, localStorageService, KPIDetail, $ionicScrollDelegate) {

    function directoryReaderSuccess(entries) {
        $scope.loading = '';
        // $scope.msg += '目录列表遍历中...';
        if (!entries) {
            // $scope.msg += '目录列表为空';
            return;
        }
        // again, Eclipse doesn't allow object inspection, thus the stringify
        $scope.folders = entries.filter(function(entry) {
            return entry.name.indexOf('.') !== 0 && (entry.isDirectory || Constant.isExtSupport(entry.name));
        }).sort(function(a, b) {
            // alphabetically sort the entries based on the entry's name
            return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
        });
        // $scope.msg += 'folders============='+JSON.stringify($scope.folders);
        /* if(!$scope.folders || !$scope.folders.length){
          
        }*/
        $scope.$apply();
    }


    function requestFileSystemSuccess(fileSystem) {
        // $scope.msg += '加载目录'+JSON.stringify(fileSystem)+'成功';
        // lets insert the current path into our UI
        $scope.folderName = fileSystem.root;
        // save this location for future use
        // $scope._currentFileSystem = fileSystem;
        // create a directory reader
        var directoryReader = fileSystem.root.createReader();

        // Get a list of all the entries in the directory
        $scope.loading = Constant.loading;
        directoryReader.readEntries(directoryReaderSuccess, function() {
            $scope.loading = Constant.loadingError;
            // $scope.folders = 'Error';
            // $scope.msg += 'requestFileSystemSuccess目录'+path+'失败:'+JSON.stringify(err);
        });
    }

    $scope.$on('$ionicView.enter', function() {
        $scope._treePath = [];
        document.addEventListener('deviceready', function() {
            $scope.beginBrowseForFiles();
        }, false);
    });

    $scope.goToSettings = function() {
        $state.go('settings', { fromSelect: true });
    };

    $scope.setImageFolder = function() {
        Constant.setImagePath({ name: $scope.folderName.fullPath, nativeURL: $scope.folderName.nativeURL }, function() {
            $state.go('settings');
        });
    };
    $scope.doDirectoryUp = function() {
        // var path = $scope._currentFileSystem.root.fullPath;
        // $scope.msg += '----doDirectoryUp'+path;
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
                    function() {
                        $scope.loading = Constant.loadingError;
                        // $scope.msg += '------------1-返回上级目录'+path+'失败:'+JSON.stringify(err);
                    }
                );
            },
            function() {
                $scope.loading = Constant.loadingError;
                // $scope.msg += '----------------2-返回上级目录'+path+'失败:'+JSON.stringify(err);
            }
        );
    };

    $scope.beginBrowseForFiles = function(file) {
        // $scope.msg = '';
        $scope.loading = Constant.loading;
        $scope.folders = [];
        $ionicScrollDelegate.scrollTop();
        // check subscription type
        if (!file) { // start load root folder
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, requestFileSystemSuccess,
                function() {
                    $scope.loading = Constant.loadingError;
                    // $scope.msg += JSON.stringify(evt);
                });
            return;
        }
        // $scope.msg += '----beginBrowseForFiles目录'+JSON.stringify(file);
        // this is used to get subdirectories
        $scope._treePath.push(file.nativeURL);
        window.resolveLocalFileSystemURL(file.nativeURL, function(filesystem) {
                // we must pass what the PhoneGap API doc examples call an "entry" to the reader
                // which appears to take the form constructed below.
                requestFileSystemSuccess({ root: filesystem });
            },
            function() {
                $scope.loading = Constant.loadingError;
                // $scope.msg += 'beginBrowseForFiles目录失败:'+JSON.stringify(err);
            }
        );
    };
    /*
    {
      isFile:false,
      isDirectory:true,
      name:'backups',
      fullPath:'file:///storage/sdcard0',
      filesystem:null
    }
    */

};

module.exports = ['$scope', 'Constant', '$state', 'localStorageService', 'KPIDetail', '$ionicScrollDelegate', Controller];
