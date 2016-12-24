var app = angular.module('starter.components');

var singleTitle = require('./single-title');
var d3 = require('./d3');
var kaoqinChart = require('./kao-qin-chart');
var orgChart = require('./org-chart');


app.service(d3.name, d3.fn);
app.directive(singleTitle.name, singleTitle.fn);
app.directive(kaoqinChart.name, kaoqinChart.fn);
app.directive(orgChart.name, orgChart.fn);

module.exports app.name;