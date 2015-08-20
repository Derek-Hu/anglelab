angular.module('starter.directives',['d3'])
  .directive('kaoQinChart', ['d3', '$window', function(d3, $window) {

    var textPadding = 0.5, textMargin=1.5, lineH = 0.1, lineP = 0.2;
    var bottomR = 3*textMargin+textPadding, topTableBorder = textMargin+textPadding+lineP;
    var middleTableBorder = bottomR-lineP-textPadding, barIndcatorPos = 2*textMargin-lineP;
    var lastRow = bottomR+textMargin, middleRow = 2*textMargin;
    var chartCls ='svg-content';
    var percentage = d3.format(".2%");
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

          var totalW = scope.width || $window.innerWidth, totalH = scope.height || $window.innerHeight, data = scope.data, title=scope.title, yLabel=scope.ylabel;

          // todo Deal with empty month
          var margin = {top: fontSize*3, right: fontSize*2, bottom: fontSize*10, left: fontSize*8};

          var width = totalW - margin.left - margin.right,
              height = totalH - margin.top - margin.bottom;

          var x = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1);

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .tickFormat(function(d) { return d+'月'});

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .ticks(20, "%");

          var line = d3.svg.line()
              .x(function(d) { return x(d.month); })
              .y(function(d) { return y(d.expect?d.expect:0); });

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
              d3.max(data, function(d) { return d.frequency; }), 
              d3.max(data, function(d) { return d.expect; })
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
            svgYA.call(yAxis)
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
                .attr("x1", -fontSize*(lastRow+textPadding))
                .attr("y1", fontSize*topTableBorder)
                .attr("x2", xExtent[1])
                .attr("y2", fontSize*topTableBorder)
                .attr("transform", "translate(0, " + height + ")")

            /* Border of the table's row */
            svg.append("line")
                .attr("class", "dtline")
                .attr("x1", -fontSize*(lastRow+textPadding))
                .attr("y1", fontSize*middleTableBorder)
                .attr("x2", xExtent[1])
                .attr("y2", fontSize*middleTableBorder)
                .attr("transform", "translate(0," + height + ")")
            /* Border of the table's row */
            svg.append("line")
                .attr("class", "dtline")
                .attr("x1", -fontSize*(lastRow+textPadding))
                .attr("y1", fontSize*(lastRow-lineH))
                .attr("x2", xExtent[1])
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
                .attr("x1", 0)
                .attr("y1", fontSize*topTableBorder)
                .attr("x2", 0)
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

          /* Vertical Line of the table */
          svg.selectAll(".vtline")
            .data(data)
            .enter().append("line")
              .attr("class", "dtline")
              .attr("x1", 0)
              .attr("y1", 0)
              .attr("x2", 0)
              .attr("y2", fontSize*(lastRow-lineH))
              .attr("transform", function(d, i){if(i==0){return ""}; return "translate("+(xRange[i]-xStep/2)+"," + height + ")"});

          svg.append("text")
              //.attr("transform", function(d){return "translate("+d.month+","+d.expect+")"})
              .attr("class", "val")
              .attr("x", xExtent[1]/2)
              .attr("y", -textMargin*fontSize)
              .style("text-anchor", "middle")
              .text(title);

          /* Text 'Actual' in the bottom table */
          svg.append("text")
              //.attr("transform", function(d){return "translate("+d.month+","+d.expect+")"})
              .attr("class", "val")
              .attr("x", -fontSize)
              .attr("y", fontSize*middleRow)
              .attr("dx", fontSize/4)
              .attr("dy", ".71em")
              .attr("transform", "translate(0," + height + ")")
              .style("text-anchor", "end")
              .text("Actual");

          /* Text 'Target' in the bottom table */
          svg.append("text")
              //.attr("transform", function(d){return "translate("+d.month+","+d.expect+")"})
              .attr("class", "val")
              .attr("x", -fontSize)
              .attr("y", fontSize*bottomR)
              .attr("dx", fontSize/4)
              .attr("dy", ".71em")
              .attr("transform", "translate(0," + height + ")")
              .style("text-anchor", "end")
              .text("Target");

          /* bar indicator in the bottom table */
          svg.append("rect")
              .attr("class", "actualIndicator")
              .attr("x", -fontSize*lastRow)
              .attr("width", fontSize*2)
              .attr("y", fontSize*barIndcatorPos)
              .attr("height", fontSize)
              .attr("transform", "translate(0," + height + ")");

          /* line indicator in the bottom table */
          svg.append("line")
              .attr("class", "line")
              .attr("x1", -fontSize*lastRow)
              .attr("y1", fontSize*(bottomR+textPadding))
              .attr("x2", fontSize*2-fontSize*lastRow)
              .attr("y2", fontSize*(bottomR+textPadding))
              .attr("transform", "translate(0," + height + ")");

          /* dot indicator in the bottom table */
          svg.append("circle")
              .attr("class", "dotIndicator")
              .attr("r", middleRow+textPadding)
              .attr("cx", -fontSize*lastRow+fontSize)
              .attr("cy", fontSize*(bottomR+textPadding))
              .attr("transform", "translate(0," + height + ")");
          }
          function dynamicRender(){
            /* bar Axis */
          svg.selectAll(".chartBar")
              .data(data)
            .enter().append("rect")
              .attr("class", "chartBar")
              .attr("x", function(d) { return x(d.month); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.frequency?d.frequency:0); })
              .attr("height", function(d) { return height - y(d.frequency?d.frequency:0); });
          /* Target line */
          svg.append("path")
              .datum(data.filter(function(ele){
                  return typeof ele.expect!=='undefined';
              }))
              .attr("class", "line targetPath")
              .attr("d", line)
              .attr("transform", "translate(" + barWidth/2 + ",0)");
          /* dot in target line */
          svg.selectAll(".dot")
              .data(data.filter(function(ele){
                  return typeof ele.expect !== 'undefined'
              }))
            .enter().append("circle")
              .attr("class", "dot targetDot")
              .attr("r", middleRow+textPadding)
              .attr("cx", function(d) { return x(d.month); })
              .attr("cy", function(d) { return y(d.expect?d.expect:0); })
              .attr("transform", "translate(" + barWidth/2 + ",0)");
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
              .text(function(d){if(typeof d.expect==='undefined') return '';return percentage(d3.round(d.expect, 4))});
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
              .text(function(d){if(typeof d.frequency==='undefined') return '';return percentage(d3.round(d.frequency, 4))});
          }
      }
    }
  }]);
