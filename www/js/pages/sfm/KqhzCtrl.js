var Controller = function (localStorageService, Backend, $scope, DateUtil, $ionicScrollDelegate, $state, $stateParams, MetaDataSvc) {
    /* $scope.goHome = function(type) {
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
    $scope.openPicker = function () {
        $scope.selectPickerOpen = true;
    };
    $scope.closePicker = function () {
        $scope.selectPickerOpen = false;
    };
    $scope.sendPicker = function (isSendEmail) {
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
    };
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
    ];
    var headerCols = ['工号', '姓名'];
    $scope.loadingStatus = '';
    // var tailCols = ['迟到', '早退', '正班', '加班', '旷工', '请假', '休假','调休','签名'];
    $scope.loadData = function (WareHouseId, ZoneId, ShiftId, Date, IsSendEmail) {
        $scope.loadingStatus = '加载中';
        $scope.data = [];
        Backend().kaoqin.query({
            'WareHouseId': WareHouseId,
            'ZoneId': ZoneId,
            'ShiftId': ShiftId,
            // 2015-09
            'Date': Date,
            // 1 or 0
            'IsSendEmail': IsSendEmail
        }, function (data) {
            if (!data || !data.length) {
                $scope.loadingStatus = '暂无数据';
                return;
            } else if (data.length == 1 && data[0].ErrorCode !== undefined) {
                $scope.loadingStatus = '加载失败';
                return;
            }
            $scope.loadingStatus = '';
            $scope.data = data;
        }, function () {
            $scope.loadingStatus = '加载失败';
        });
    };


    $scope.$on('$ionicView.enter', function (e) {
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
        MetaDataSvc($stateParams.PageType).then(function (data) {
            $scope.metaData = data;
        });
    });
};


module.exports = ['localStorageService', 'Backend', '$scope', 'DateUtil', '$ionicScrollDelegate', '$state', '$stateParams', 'MetaDataSvc', Controller];
