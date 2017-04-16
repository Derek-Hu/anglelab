var Controller = function ($ionicPopup, localStorageService, Backend, $scope, DateUtil, $ionicScrollDelegate, $state, $stateParams, MetaDataSvc) {
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
    var headerCols = ['工号', '姓名'];

    // An alert dialog
    $scope.showAlert = function (msg, isSuccess, errorMsg) {
        var alertPopup = $ionicPopup.alert({
            template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
            okText: '知道了'
        });

        alertPopup.then(function () {
            // $scope.getList();
        });
    };

    $scope.sendPicker = function (isSendEmail) {
        var values, daysNum, i, len;

        try {
            values = angular.element(document.getElementById('selectedMonth')).val().match(/(\d{4}).*(\d{2})/);

            if (values) {
                $scope.selectedYear = values[1];
                $scope.selectedMonth = values[2];

                daysNum = DateUtil.getLastDay($scope.selectedYear, $scope.selectedMonth);

                $scope.headers = headerCols;
                $scope.daysArr = [];

                for (i = 1, len = daysNum; i <= len; i++) {
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

    $scope.loadingStatus = '';
    // var tailCols = ['迟到', '早退', '正班', '加班', '旷工', '请假', '休假','调休','签名'];
    $scope.loadData = function (WareHouseId, ZoneId, ShiftId, Date, IsSendEmail) {
        $scope.loadingStatus = '加载中';
        $scope.data = [];
        /*eslint-disable*/
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
                if(IsSendEmail){
                  $scope.showAlert('邮件已发送', true);
                }
                return;
            } else if (data.length === 1 && data[0].ErrorCode !== undefined) {
                $scope.loadingStatus = '加载失败';
                if(IsSendEmail){
                  $scope.showAlert('邮件发送失败', false, '服务器异常');
                }
                return;
            }
            if(IsSendEmail){
              $scope.showAlert('邮件已发送', true);
            }
            $scope.loadingStatus = '';
            $scope.data = data;
        }, function () {
            $scope.loadingStatus = '加载失败';
            if(IsSendEmail){
              $scope.showAlert('邮件发送失败', false, '服务器异常');
            }
        });
    };


    $scope.$on('$ionicView.enter', function () {
        $scope.selectedCriteria = localStorageService.get('criteria');

        var daysNum = DateUtil.getLastDay();

        $scope.headers = headerCols;
        $scope.daysArr = [];

        var i, len;

        for (i = 1, len = daysNum; i <= len; i++) {
            $scope.daysArr.push(i);
        }
        $scope.headers = $scope.headers.concat($scope.daysArr);

        var today = new Date();

        $scope.selectedYear = today.getFullYear();
        $scope.selectedMonth = today.getMonth() + 1;
        $scope.loadData($scope.selectedCriteria.kuqu.Id, $scope.selectedCriteria.banzu.Id, $scope.selectedCriteria.banci.ID, $scope.selectedYear + '-' + $scope.selectedMonth, 0);
        /*eslint-disable*/
        MetaDataSvc($stateParams.PageType).then(function (data) {
            $scope.metaData = data;
        });
    });
};


module.exports = ['$ionicPopup', 'localStorageService', 'Backend', '$scope', 'DateUtil', '$ionicScrollDelegate', '$state', '$stateParams', 'MetaDataSvc', Controller];
