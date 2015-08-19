angular.module('myApp.directives', ['d3'])
  .directive('barChart', ['d3Service', function(d3) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
          // d3 is the raw d3 object
          var svg = d3.select(ele[0]).append('svg');
        });
      }}
  }]);