angular.module('starter.directives',['d3'])
  .directive('kaoQinChart', ['d3', '$window', function(d3, $window) {

    var textPadding = 0.5, textMargin=1.5, lineH = 0.1, lineP = 0.2;
    var bottomR = 3*textMargin+textPadding, topTableBorder = textMargin+textPadding+lineP;
    var middleTableBorder = bottomR-lineP-textPadding, barIndcatorPos = 2*textMargin-lineP;
    var lastRow = bottomR+textMargin, middleRow = 2*textMargin;
    var chartCls ='svg-content';
    var percentage = d3.format(".2");
    var totalW, totalH;
    return {
      restrict: 'E',
      scope: {
        data : '=',
        title: '@',
        ylabel: '@',
        width: '=',
        height:'='
      },
      link: function(scope, element, attrs) {

          var fontSize = parseInt(d3.select("body").style("font-size"));

          var kpiCharts = $('.kpiChart');
          totalW = $(kpiCharts[0]).width();
          totalH = $(kpiCharts[0]).height();
          for(var ki =0; ki<kpiCharts.length;ki++){
            if($(kpiCharts[ki]).width()>totalW){
              totalW = $(kpiCharts[ki]).width();
            }
            if($(kpiCharts[ki]).height()>totalH){
              totalH = $(kpiCharts[ki]).height();
            }
          }
          data = scope.data, title=scope.title, yLabel=scope.ylabel;

          // todo Deal with empty month
          var margin = {top: fontSize*3, right: fontSize*10, bottom: fontSize*14, left: fontSize*3};

          var width = totalW - margin.left - margin.right,
              height = totalH - margin.top - margin.bottom;

          var x = d3.scale.ordinal()
              .rangeRoundBands([fontSize, width], .1);

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .tickFormat(function(d) { return d+'月'})
              .outerTickSize(0);

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("right")
              //.ticks(15, "%");
              .ticks(15, "");

          var line = d3.svg.line()
              .x(function(d) { return x(d.month); })
              .y(function(d) { return y(d.TARGET?d.TARGET:0); });

          var barWidth, xRange, xExtent, xStep, xStart;

          var svg, svgXA, svgYA;

          svg = d3.select(element[0]).append("div")
              .attr("class", chartCls)
              .style("width", width+'px').append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          svgXA = svg.append("g").attr("class", "x axis");
          svgYA = svg.append("g").attr("class", "y axis");

          checkData();
          setXYMax();          
          sketch();
          dynamicRender();

          function clearChart(){
            d3.selectAll('.targetPath.line').remove();
            d3.selectAll('.chartBar').remove();
            d3.selectAll('.targetDot.dot').remove();
            d3.selectAll('.targetVal.val').remove();
            d3.selectAll('.actualVal.val').remove();
          }
          scope.$watch('data', function(n, o){
            totalW = $(kpiCharts[0]).width();
            totalH = $(kpiCharts[0]).height();
            for(var ki =0; ki<kpiCharts.length;ki++){
              if($(kpiCharts[ki]).width()>totalW){
                totalW = $(kpiCharts[ki]).width();
              }
              if($(kpiCharts[ki]).height()>totalH){
                totalH = $(kpiCharts[ki]).height();
              }
            }
              data = scope.data = n;
              clearChart();
              checkData();
              setXYMax(); 
              //sketch();         
              dynamicRender();
          })
          function checkData(){
            if(!data){
              data=[];
            }
            // 12 month 
            //data.length=12;
            var monthRecords = [];

            for(var i=0,len=12;i<len;i++){
              monthRecords.push(false);            
            }
            for(var i=0,len=data.length;i<len;i++){
              if(data[i]){ // missing a month data
  /*              data[i]={
                  month: i+1
                };*/
                monthRecords[data[i].month-1]=true;
              }
            }
            for(var i=0,len=12;i<len;i++){
              if(!monthRecords[i]){
                data.push({
                  month: i+1
                })
              }
            }
            data.sort(function(a, b){
              return a.month - b.month
            })
          }
          function setXYMax(){
            var yMax = d3.max([
              d3.max(data, function(d) { return d.ACTUAL; }), 
              d3.max(data, function(d) { return d.TARGET; })
              ]);
            x.domain(data.map(function(d) { return d.month; }));
            y.domain([0, yMax?yMax : 1]);

            barWidth = x.rangeBand();
            xRange = x.range();
            xExtent = x.rangeExtent();
            xStep = xRange[1] - xRange[0] - barWidth;
            xStart = xRange[0];

              /* x Axis */
            svgXA.attr("transform", "translate(0," + height + ")").call(xAxis);
            /* y Axis */
            svgYA.attr("transform", "translate("+ width+ ".0)").call(yAxis)
          }
          
          function sketch(){

            svgYA.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(yLabel);

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

          /* line indicator in the bottom table */
          /*svg.append("line")
              .attr("class", "line")
              .attr("x1", -fontSize*lastRow)
              .attr("y1", fontSize*(bottomR+textPadding))
              .attr("x2", fontSize*2-fontSize*lastRow)
              .attr("y2", fontSize*(bottomR+textPadding))
              .attr("transform", "translate(0," + height + ")");*/

          /* dot indicator in the bottom table */
          /*svg.append("circle")
              .attr("class", "dotIndicator")
              .attr("r", middleRow+textPadding)
              .attr("cx", -fontSize*lastRow+fontSize)
              .attr("cy", fontSize*(bottomR+textPadding))
              .attr("transform", "translate(0," + height + ")");*/
          }
          function dynamicRender(){
            /* bar Axis */
          svg.selectAll(".chartBar")
              .data(data)
            .enter().append("rect")
              .attr("class", "chartBar")
              .attr("x", function(d) { return x(d.month); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.ACTUAL?d.ACTUAL:0); })
              .attr("height", function(d) { return height - y(d.ACTUAL?d.ACTUAL:0); });
          /* Target line */
          svg.append("path")
              .datum(data.filter(function(ele){
                  return typeof ele.TARGET!=='undefined';
              }))
              .attr("class", "line targetPath")
              .attr("d", line)
              .attr("transform", "translate(" + barWidth/2 + ",0)");
          /* dot in target line */
          svg.selectAll(".dot")
              .data(data.filter(function(ele){
                  return typeof ele.TARGET !== 'undefined'
              }))
            .enter().append("rect")
              .attr("class", "dot targetDot")

              .attr("x", function(d) { return x(d.month); })
              .attr("width", fontSize)
              .attr("y", function(d) { return y(d.TARGET?d.TARGET:0); })
              .attr("height", fontSize)

              /*.attr("r", middleRow+textPadding)
              .attr("cx", function(d) { return x(d.month); })
              .attr("cy", function(d) { return y(d.TARGET?d.TARGET:0); })*/

              .attr("transform", "translate(" + (barWidth/2-fontSize/2) + ","+(-fontSize/2)+")");
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
              .text(function(d){if(typeof d.TARGET==='undefined') return '';return percentage(d3.round(d.TARGET, 4))});
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
              .text(function(d){if(typeof d.ACTUAL==='undefined') return '';return percentage(d3.round(d.ACTUAL, 4))});
          }
      }
    }
  }]).directive('org', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directive.org.html',
      scope: {
        group : '='
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

