module.exports = {
    name: 'Backend',
    fn: ['$resource', 'Constant', function($resource, Constant) {
        // Might use a resource here that returns a JSON array
        var baseURL = '',
            kaoqin, kuqu, banzu, banci, metaData, org, gwrx, lgjh, kpi;

        /*
        var org = $resource('js/test/org.json');
        var gwrx = $resource('js/test/gwrx.json');
        var kpi = $resource('js/test/1-2.json');
        var kaoqin = $resource('js/test/kqhz.json');
        var lgjh = $resource('js/test/lgjh.json');
        var metaData = $resource('js/test/meta.json');
        var banci = $resource('js/test/banci.json');
        var kuqu = $resource('js/test/kuqu.json');
        var banzu = $resource('js/test/banzu.json');
        var banCharge = $resource('js/test/banCharge.json');*/

        return function() {
            if (baseURL != Constant.baseURL()) {
                baseURL = Constant.baseURL();
                kaoqin = $resource(baseURL + '/EmployeeDutyListSub.aspx');
                kuqu = $resource(baseURL + '/Warehouse.aspx');
                banzu = $resource(baseURL + '/Zone.aspx');
                banci = $resource(baseURL + '/Shift.aspx');
                metaData = $resource(baseURL + '/Index.aspx');
                org = $resource(baseURL + '/EmployeeDutyList.aspx');
                gwrx = $resource(baseURL + '/PositionFlexible.aspx');
                lgjh = $resource(baseURL + '/DutyRotation.aspx');
                kpi = $resource(baseURL + '/KPI.aspx');

                // http://localhost:1460/AdPull/GetDownList.aspx?whseId=1
                xiajiaListURL = baseURL + '/AdPull/GetDownList.aspx';
                // http://localhost:1460/AdPull/DownShelves.aspx?epsSupplyId=1&userName=2
                xiajiaURL = baseURL + '/AdPull/DownShelves.aspx';
                pullListURL = baseURL + '/AdPull/GetItemPullInfo.aspx';
                startListURL = baseURL + '/AdPull/SelectGroupNos.aspx';
                startActionURL = baseURL + '/AdPull/GroupOnline.aspx';
                pullActionURL = baseURL + '/AdPull/LinePull.aspx';
                pullHistoryURL = baseURL + '/AdPull/GetPullHis.aspx';
                // http://localhost:1460/AdPull/SelectStock.aspx?itemCode=1&whseId=2
                kucunListURL = baseURL + '/AdPull/SelectStock.aspx';
                adMemberURL = baseURL + '/AdPull/GetItemUsers.aspx';
                adAllMemberURL = baseURL + '/AdPull/SelectUserByGroup.aspx';
                adModifyMemberURL = baseURL + '/AdPull/UpdateItemUser.aspx';
                // http://192.168.0.147:8083/AdPull/Login.aspx?name=wmh&pwd=1111
                login = baseURL + '/AdPull/Login.aspx';
                userAuth = baseURL + '/AdPull/UserAuthority.aspx';
            }

            return {
                kaoqin: kaoqin,
                kuqu: kuqu,
                banzu: banzu,
                banci: banci,
                metaData: metaData,
                gwrx: gwrx,
                lgjh: lgjh,
                org: org,
                kpi: kpi,
                xiajiaListURL: xiajiaListURL,
                xiajiaURL: xiajiaURL,
                kucunListURL: kucunListURL,
                adMemberURL: adMemberURL,
                adAllMemberURL: adAllMemberURL,
                adModifyMemberURL: adModifyMemberURL,
                login: login,
                userAuth: userAuth,
                pullListURL: pullListURL,
                pullActionURL: pullActionURL,
                startListURL: startListURL,
                startActionURL: startActionURL,
                pullHistoryURL: pullHistoryURL
            };
        };
    }]
};
