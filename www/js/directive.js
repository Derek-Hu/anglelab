angular.module('starter.directives')
.directive('singleTitle', function() {
  return {
    restrict: 'E',
    templateUrl: './js/singleTitle.html',  
    scope: {
        title: '@'
    },
    link: function($scope, $element, $attrs) {
    }
  }
});