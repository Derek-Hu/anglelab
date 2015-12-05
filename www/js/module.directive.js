"use strict"
angular.module('starter.directives',['d3'])
  .directive('kaoQinChart', ['d3', '$window', function(d3, $window) {

    var textPadding = 0.5, textMargin=1.5, lineH = 0.1, lineP = 0.2;
    var bottomR = 3*textMargin+textPadding, topTableBorder = textMargin+textPadding+lineP;
    var middleTableBorder = bottomR-lineP-textPadding, barIndcatorPos = 2*textMargin-lineP;
    var lastRow = bottomR+textMargin, middleRow = 2*textMargin;
    var chartCls ='svg-content';
    var percentage = d3.format(".2");
    return {
      restrict: 'E',
      scope: {
        data : '=',
        title: '@',
        ylabel: '@',
        width: '=',
        height:'=',
        xlabel: '@',
        isDouble: '='
      },
      link: function(scope, element, attrs) {

          var fontSize = parseInt(d3.select("body").style("font-size"));
          var margin = {top: fontSize*3, right: fontSize*9, bottom: fontSize*10, left: fontSize*3};
          var data = scope.data, title=scope.title, yLabel=scope.ylabel;

          scope.$watch('data', function(n, o){
            
            var data = scope.data;
            if(!data){
              return;
            }
            if(n===o){
              return;
            }
            var isRate = data && !!data.filter(function(d){
              if(d.TARGET){
                return d.TARGET.indexOf('%')!=-1;
              }
              return false;
            }).length;
            var dimension = getDimension();
            var width = dimension[0], height = dimension[1];

            var chart = drawSchetch(data, width, height, isRate);
            //checkData(scope.data, );
            sketch(chart.svg, chart.x, chart.y, width, height, data, chart.line, isRate);
            dynamicRender(chart.svg, chart.x, chart.y, width, height, data, chart.line, isRate);

          })

          function getDimension(){
            var kpiCharts = $('.kpiChart');
            var totalW = $(kpiCharts[0]).width();
            var totalH = $(kpiCharts[0]).height();
            console.log('scope.isDouble='+scope.isDouble);
            for(var ki =0; ki<kpiCharts.length;ki++){
              if($(kpiCharts[ki]).width()>totalW){
                totalW = $(kpiCharts[ki]).width();
              }
              if($(kpiCharts[ki]).height()>totalH){
                totalH = $(kpiCharts[ki]).height();
              }
            }
            if(scope.isDouble){
              //totalW = totalW/2;
              totalH = totalH/2;
            }
            return [totalW - margin.left - margin.right, totalH - margin.top - margin.bottom];
          }

          function drawSchetch(data, width, height, isRate){

            var x = d3.scale.ordinal().rangeRoundBands([fontSize, width], .1);
            var y = d3.scale.linear().range([height, 0]);

            var yMax = d3.max([
              d3.max(data, function(d) { return parseFloat(d.ACTUAL); }), 
              d3.max(data, function(d) { return parseFloat(d.TARGET); })
              ]);
            x.domain(data.map(function(d) { return d.month; }));
            y.domain([0, yMax?yMax : 1]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickFormat(function(d) { return d + (scope.xlabel?scope.xlabel: '')})
                .outerTickSize(0);

            
            var yAxis =d3.svg.axis()
                .scale(y)
                .orient("right");

              yAxis = isRate? yAxis.ticks(15, "%"): yAxis.ticks(15, "");

            var svg, svgXA, svgYA;
            // reset
            d3.select(element[0]).html('');
            svg = d3.select(element[0]).append("div")
                .attr("class", chartCls)
                .style("width", width+'px').append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svgXA = svg.append("g").attr("class", "x axis");
            svgYA = svg.append("g").attr("class", "y axis");

            svgXA.attr("transform", "translate(0," + height + ")").call(xAxis);
            svgYA.attr("transform", "translate("+ width+ ", 0)").call(yAxis)
            var line = d3.svg.line()
              .x(function(d) { return x(d.month); })
              .y(function(d) { return y(parseFloat(d.TARGET)?parseFloat(d.TARGET):0); });
            return {
              svg: svg,
              x: x,
              y: y,
              line: line
            }
          }

          function checkData(data, totalNum){
            if(!data){
              data=[];
            }
            // 12 month 
            //data.length=12;
            var records = [];

            for(var i=0,len=totalNum;i<len;i++){
              records.push(false);            
            }
            for(var i=0,len=data.length;i<len;i++){
              if(data[i]){ // missing a month data
  /*              data[i]={
                  month: i+1
                };*/
                records[data[i].month-1]=true;
              }
            }
            for(var i=0,len=totalNum;i<len;i++){
              if(!records[i]){
                data.push({
                  month: i+1
                })
              }
            }
            data.sort(function(a, b){
              return a.month - b.month
            })
            return data;
          }
          
          function sketch(svg, x, y, width, height, data, line, isRate){
            var barWidth = x.rangeBand();
            var xRange = x.range();
            var xExtent = x.rangeExtent();
            var xStep = xRange[1] - xRange[0] - barWidth;
            var xStart = xRange[0];
            
            
              /* Border of the table's row */
            svg.append("line")
                .attr("class", "dtline")
                .attr("x1", 0)
                .attr("y1", fontSize*topTableBorder)
                .attr("x2", xExtent[1]+fontSize*(lastRow+textPadding))
                .attr("y2", fontSize*topTableBorder)
                .attr("transform", "translate(0, " + height + ")")

            /* Border of the table's row */
            svg.append("line")
                .attr("class", "dtline")
                .attr("x1", 0)
                .attr("y1", fontSize*middleTableBorder)
                .attr("x2", xExtent[1]+fontSize*(lastRow+textPadding))
                .attr("y2", fontSize*middleTableBorder)
                .attr("transform", "translate(0," + height + ")")
            /* Border of the table's row */
            svg.append("line")
                .attr("class", "dtline")
                .attr("x1", 0)
                .attr("y1", fontSize*(lastRow-lineH))
                .attr("x2", xExtent[1]+fontSize*(lastRow+textPadding))
                .attr("y2", fontSize*(lastRow-lineH))
                .attr("transform", "translate(0," + height + ")")
            /* Second Left of the table's col */
            svg.append("line")
                .attr("class", "dtline")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", fontSize*(lastRow-lineH))
                .attr("transform", "translate(0," + height + ")");
            /* Left Border of the table */
            svg.append("line")
                .attr("class", "dtline")
                .attr("x1", xExtent[1]+fontSize*(lastRow+textPadding)*2)
                .attr("y1", fontSize*topTableBorder)
                .attr("x2", xExtent[1]+fontSize*(lastRow+textPadding)*2)
                .attr("y2", fontSize*(lastRow-lineH))
                .attr("transform", "translate("+(-fontSize*(lastRow+textPadding))+"," + height + ")");

            /* Right Border of the table's col */
            svg.append("line")
                .attr("class", "dtline")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", fontSize*(lastRow-lineH))
                .attr("transform", "translate("+xExtent[1]+"," + height + ")");

            /* XY Padding */
            svg.append("path")
                .attr("class", "xyPadding")
                .attr("d", "M0,0H"+(fontSize+1))
                .attr("transform", "translate(0," + height + ")");

            /* Vertical Line of the table */
            svg.selectAll(".vtline")
              .data(data)
              .enter().append("line")
                .attr("class", "dtline")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", fontSize*(lastRow-lineH))
                .attr("transform", function(d, i){if(i==0){return ""}; return "translate("+(xRange[i]-xStep/2)+"," + height + ")"})
                .style("display", function(d, i){if(i==0){return "none"}});

            svg.append("text")
                //.attr("transform", function(d){return "translate("+d.month+","+d.TARGET+")"})
                .attr("class", "val")
                .attr("x", xExtent[1]/2)
                .attr("y", -textMargin*fontSize)
                .style("text-anchor", "middle")
                .text(title);

            

            /* target indicator in the bottom table */
            svg.append("rect")
                .attr("class", "actualIndicator")
                .attr("x", width)
                .attr("width", fontSize*(lastRow+textPadding))
                .attr("y", fontSize*topTableBorder)
                .attr("height", fontSize*(middleTableBorder-topTableBorder))
                .attr("transform", "translate(0," + height + ")");

            /* actual indicator in the bottom table */
            svg.append("rect")
                .attr("class", "actualIndicator")
                .attr("x", width)
                .attr("width", fontSize*(lastRow+textPadding))
                .attr("y", fontSize*middleTableBorder)
                .attr("height", fontSize*(middleTableBorder-topTableBorder))
                .style("fill", "#A1B752")
                .attr("transform", "translate(0," + height + ")");

            /* Text 'Actual' in the bottom table */
            svg.append("text")
                //.attr("transform", function(d){return "translate("+d.month+","+d.TARGET+")"})
                .attr("class", "val")
                .attr("x", width+fontSize*4)
                .attr("y", fontSize*middleRow)
                .attr("dx", fontSize/4)
                .attr("dy", ".71em")
                .attr("transform", "translate(0," + height + ")")
                .style("text-anchor", "end")
                .style("fill", "#FFF")
                .text("Actual");

            /* Text 'Target' in the bottom table */
            svg.append("text")
                //.attr("transform", function(d){return "translate("+d.month+","+d.TARGET+")"})
                .attr("class", "val")
                .attr("x", width+fontSize*4)
                .attr("y", fontSize*bottomR)
                .attr("dx", fontSize/4)
                .attr("dy", ".71em")
                .attr("transform", "translate(0," + height + ")")
                .style("text-anchor", "end")
                .style("fill", "#FFF")
                .text("Target");

          }
          function dynamicRender(svg, x, y, width, height, data, line, isRate){
            var barWidth = x.rangeBand();
            var xRange = x.range();
            var xExtent = x.rangeExtent();
            var xStep = xRange[1] - xRange[0] - barWidth;
            var xStart = xRange[0];
            /* bar Axis */
            /* Actual value in the table */
            svg.selectAll(".text")
                .data(data)
              .enter().append("text")
                .attr("class", "val targetVal")
                .attr("x", function(d,i){return barWidth/2 + xRange[i]})
                .attr("y", function(d){return fontSize*bottomR;})
                .attr("dx", fontSize/4)
                .attr("dy", ".71em")
                .attr("transform", "translate(0," + height + ")")
                .style("text-anchor", "middle")
                .text(function(d){
                  if(typeof d.TARGET==='undefined') {
                    return '';
                  }
                  return isRate?(Math.ceil(parseFloat(d.TARGET)*10000)/100)+'%': d.TARGET
                });
            /* Target value in the table */
            svg.selectAll(".text")
                .data(data)
              .enter().append("text")
                .attr("class", "val actualVal")
                .attr("x", function(d,i){return barWidth/2 + xRange[i]})
                .attr("y", function(d){return fontSize*middleRow;})
                .attr("dx", fontSize/4)
                .attr("dy", ".71em")
                .attr("transform", "translate(0," + height + ")")
                .style("text-anchor", "middle")
                .text(function(d){if(typeof d.ACTUAL==='undefined') {
                    return '';
                  }
                  return isRate?(Math.ceil(parseFloat(d.ACTUAL)*10000)/100)+'%': d.ACTUAL
                });
                
            svg.selectAll(".chartBar")
                .data(data)
              .enter().append("rect")
                .attr("class", "chartBar")
                .attr("x", function(d) { return x(d.month); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(parseFloat(d.ACTUAL)?parseFloat(d.ACTUAL):0); })
                .attr("height", function(d) { return height - y(parseFloat(d.ACTUAL)?parseFloat(d.ACTUAL):0); });
            /* Target line */
            svg.append("path")
                .datum(data.filter(function(ele){
                    return typeof ele.TARGET!=='undefined';
                }).map(function(d){
                  d.TARGET = parseFloat(d.TARGET);
                  return d;
                }))
                .attr("class", "line targetPath")
                .attr("d", line)
                .attr("transform", "translate(" + barWidth/2 + ",0)");
            /* dot in target line */
            svg.selectAll(".dot")
                .data(data.filter(function(ele){
                    return typeof ele.TARGET !== 'undefined'
                }).map(function(d){
                  d.TARGET = parseFloat(d.TARGET);
                  return d;
                }))
              .enter().append("rect")
                .attr("class", "dot targetDot")

                .attr("x", function(d) { return x(d.month); })
                .attr("width", fontSize)
                .attr("y", function(d) { return y(parseFloat(d.TARGET)?parseFloat(d.TARGET):0); })
                .attr("height", fontSize)

                /*.attr("r", middleRow+textPadding)
                .attr("cx", function(d) { return x(d.month); })
                .attr("cy", function(d) { return y(d.TARGET?d.TARGET:0); })*/

                .attr("transform", "translate(" + (barWidth/2-fontSize/2) + ","+(-fontSize/2)+")");

          }
      }
    }
  }]).directive('org', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directive.org.html',
      scope: {
        group : '=',
        title: '@'
      },
      link: function(scope, element, attrs) {
        scope.$watch('group', function(){
          scope.subTeams = [];
          if(scope.group && scope.group.members){
            var totalNum = scope.group.members.length;
            scope.col= Math.max(Math.ceil(totalNum/4), 3);
            if(totalNum){
              var subTeamNum = totalNum > scope.col ? scope.col:totalNum;
              scope.oddTeam = (subTeamNum % 2 === 1);
              for(var i = 0; i < subTeamNum; i++){
                scope.subTeams[i] = []; 
              }
              for(var i = 0; i < totalNum; i++){
                scope.subTeams[i%subTeamNum].push(scope.group.members[i]);
              }
            }
          }
        });
      }
    }
  }).directive('onDoubleClick', function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, $elm, $attrs) {
      var clicks = 0;
      var lastClick = new Date();
              $elm.bind('click', function (evt) {
                  var dateDiff = new Date() - lastClick;
                  if (dateDiff > 300) { // 300 ms
                      clicks = 0;
                  }
                  lastClick = new Date();
                  clicks++;
                  console.log('clicks'+clicks);
                  if (clicks == 1) {
                      $timeout(function () {
                          if (clicks == 1) {
                              //....
                          } else {
                              $scope.$apply(function () {
                                  $scope.$eval($attrs.onDoubleClick);
                              });
                          }
                      }, 300);
                  }
              });
          }
      };
    })
.directive('zoomable', ['$timeout',function($timeout) {
  return {
    restrict: 'A',
    scope: true,
    link: function($scope, $element, $attrs) {
      var target = $element[0];

      var styleTarget = target.children[0].children[0].children[0];
      //console.log(target, target.children[0],styleTarget);
      styleTarget.style.webkitTransition = 'all linear 0.05s';



      touch.on(target, 'touchstart', function(ev){
        ev.preventDefault();
      });

      var initialScale = 1;
      var currentScale;

      touch.on(target, 'pinchend', function(ev){
        currentScale = ev.scale - 1;
        currentScale = initialScale + currentScale;
        currentScale = currentScale > 2 ? 2 : currentScale;
        currentScale = currentScale < 0.5 ? 0.5 : currentScale;
        styleTarget.style.webkitTransform = 'scale(' + currentScale + ')';
      });
      touch.on(target, 'pinchend', function(ev){
        initialScale = currentScale;
      });

      var clicks = 0;
      var lastClick = new Date();
      $element.bind('click', function (evt) {
          var dateDiff = new Date() - lastClick;
          //console.log('dateDiff', dateDiff);
          if (dateDiff > 300) { // 300 ms
              clicks = 0;
          }
          lastClick = new Date();
          clicks++;
          //console.log('clicks'+clicks);
          if (clicks == 1) {
              $timeout(function () {
                  if (clicks == 1) {
                      //....
                  } else {
                      if(currentScale!== undefined && currentScale!==1){
                        currentScale = 1;
                        styleTarget.style.webkitTransform = 'scale(' + currentScale + ')';
                      }else{
                        if($attrs.onDoubleClick){
                          $scope.$apply(function () {
                              $scope.$eval($attrs.onDoubleClick);
                          });
                        }
                      }
                  }
              }, 300);
          }
      });
    }
  };
}])
.directive('scrollArea', ['$window',function($window) {
  return {
    restrict: 'A',
    scope: true,
    link: function($scope, $element, $attrs) {
      //console.log($window.innerWidth, $window.innerHeight, $element)
      var cssText='width:'+$window.innerWidth+'px;height:'+$window.innerHeight+'px;';
      //console.log(cssText);
      $element[0].style.cssText = cssText;
    }
  }
}]);

