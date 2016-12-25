var Controller = function ($scope, Constant, $state, localStorageService) {

    $scope.$on('$ionicView.enter', function () {
        $scope.selectedCriteria = localStorageService.get('criteria');
        $scope.myInterval = Constant.getInterval() * 1000;
        // $scope.msg = '';
        $scope.slides = [];
        var imagePath = Constant.getImagePath();

        if (imagePath && imagePath.nativeURL) {
            window.resolveLocalFileSystemURL(Constant.getImagePath().nativeURL, function (filesystem) {
                    // we must pass what the PhoneGap API doc examples call an "entry" to the reader
                    // which appears to take the form constructed below.
                var directoryReader = filesystem.createReader();

                    // Get a list of all the entries in the directory
                    // $scope.loading = Constant.loading;
                directoryReader.readEntries(function (entries) {
                        // $scope.loading = '';
                        // $scope.msg += '目录列表遍历中...';
                    if (!entries) {
                            // $scope.msg += '目录列表为空';
                        return;
                    }
                        // again, Eclipse doesn't allow object inspection, thus the stringify
                    $scope.slides = entries.filter(function (entry) {
                        return entry.name.indexOf('.') !== 0 && entry.isFile && Constant.isExtSupport(entry.name);
                    }).sort(function (a, b) {
                            // alphabetically sort the entries based on the entry's name
                        return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
                    }).map(function (d) {
                        return { image: d.nativeURL };
                    });
                        // $scope.msg += 'images============='+JSON.stringify($scope.images);
                        /* if(!$scope.slides || !$scope.slides.length){
                          
                        }*/
                    $scope.$apply();
                }, function () {
                        // $scope.loading = Constant.loadingError;
                        // $scope.msg += 'requestFileSystemSuccess目录'+path+'失败:'+JSON.stringify(err);
                });

            },
                function () {
                    // $scope.loading = Constant.loadingError;
                    // $scope.msg += 'beginBrowseForFiles目录失败:'+JSON.stringify(err);
                }
            );
        }

    });

    $scope.myInterval = Constant.getInterval() * 1000;

    $scope.noWrapSlides = false;
    $scope.slides = [];

    /* $scope.addSlide = function(imageURL) {
      //var newWidth = 600 + slides.length + 1;
      $scope.slides.push({
        image: imageURL
      });
    };*/

    $scope.next = function () {
        var i, len;

        for (i = 0, len = $scope.slides.length; i < len; i++) {
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
    };
    $scope.prev = function () {
        var i, len;

        for (i = 0, len = $scope.slides.length; i < len; i++) {
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
    };

};


module.exports = ['$scope', 'Constant', '$state', 'localStorageService', Controller];
