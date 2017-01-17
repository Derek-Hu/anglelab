var LocalStorageModule = require('angular-local-storage');
var ngResource = require('angular-resource');
// var componentsModule = require('../components');

var app = angular.module('starter.services', ['ng', 'ngCordova', ngResource, LocalStorageModule]);

var services = [
    require('./Constant'),
    require('./Backend'),
    require('./AD'),
    require('./XiaJia'),
    require('./MetaDataSvc'),
    require('./KPIItem'),
    require('./Util'),
    require('./MenuList'),
    require('./MenuBorder'),
    require('./KPIDetail'),
    require('./DateUtil'),
    require('./Warehouse'),
    require('./Zone'),
    require('./Shift'),
    require('./Charge')
];

for (var i = 0, len = services.length; i < len; i++) {
    app.service(services[i].name, services[i].fn);
}

module.exports = app.name;
