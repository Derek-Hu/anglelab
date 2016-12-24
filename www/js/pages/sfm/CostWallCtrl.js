var Controller = function($scope, Constant, localStorageService, MetaDataSvc, $stateParams, KPIItem) {
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
            });

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

            for (i = 0, len = rows.length; i < len; i++) {
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


module.exports = {
    name: "CostWallCtrl",
    $fn: ['$scope', 'Constant', 'localStorageService', 'MetaDataSvc', '$stateParams', 'KPIItem', Controller]
};
