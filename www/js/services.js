angular.module('starter.services', ['ngResource'])

.service('Backend', ['$resource', function($resource) {
  // Might use a resource here that returns a JSON array
  var menu = $resource('/js/menu.json');
  var kaoqin = $resource('/js/chart-data.json');
  return {
    menu:menu,
    kaoqin:kaoqin
  }
}]);
