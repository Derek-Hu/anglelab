var app = angular.module('starter.services', ['ngResource']);

var services = [
    require('./Backend'),
    require('./AD'),
    require('./XiaJia')
    require('./MetaDataSvc')
    require('./KPIItem')
    require('./Util')
    require('./MenuList')
    require('./MenuBorder')
    require('./KPIDetail')
    
    require('./Charge')
    require('./Constant')
    require('./DateUtil')
    require('./Shift')
    require('./Warehouse')
    require('./Zone')
];

for(var i=0, len = services.length;i<len;i++){
    app.service(services[i].name. services[i].fn);
}

module.exports app.name;