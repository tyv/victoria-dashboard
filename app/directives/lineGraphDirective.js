;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('lineGraph', function(d3Service, momentService) {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			link: function(scope, element, attrs) {
				var d3 = d3Service,
					svg;

				svg = d3.select(element[0])
						.append('svg')
						.style('width', '500px')
						.style('height', '570px');

				scope.render = function(data) {
					//massage the data

					for (var i = 0; i < data.length; i++) {
						if(i === 0) {
							data[i].remaining = scope.data.goal;
						} else {
							data[i].remaining = data[i-1].remaining - data[i].qty;
						}
					}
					
					var startDate = new Date(scope.data.startDate);
					var endDate = new Date(scope.data.endDate);

					var x = d3.time.scale()
						.domain([startDate, endDate])
						.range([30, 400]);

					var y = d3.scale.linear()
							.domain([0, 40])
							.range([500, 0]);

					var line = d3.svg.line()
						.x(function(d) { 
							return x(new Date(d.date));
						})
						.y(function(d) { 
							return y(d.remaining);
						});

					// var lineUp = d3.svg.line()
					// 	.x(function(d) { 
					// 		return x(new Date(d.date));
					// 	})
					// 	.y(function(d) { 
					// 		return y(d.qty);
					// 	}); 

					// Define the axes
					var xAxis = d3.svg.axis().scale(x)
					    .orient('bottom').ticks(10);

					var yAxis = d3.svg.axis().scale(y)
						    .orient('left').ticks(5);

					//Add ideal line
					svg.append('path')
					.attr('d', line([{date: scope.data.startDate, remaining: 40}, {date: scope.data.endDate, remaining: 0}]))
					.style({
						fill: 'none',
						stroke: '#000'
					});

					//Add burnup

					//Add burndown
					svg.append('path')
					.attr('d', line(data))
					.style({
						fill: 'none',
						stroke: '#000'
					});

					svg.append('g')
					.attr('class', 'x axis')
			        .attr('transform', 'translate(0,500)')
			        .call(xAxis)
			        .selectAll('text')  
		            .style('text-anchor', 'end')
		            .attr('dx', '-.8em')
		            .attr('dy', '.15em')
		            .attr('transform', function(d) {
		                return 'rotate(-65)' 
		                });

				    // Add the Y Axis
				    svg.append('g')
				        .attr('class', 'y axis')
				        .attr('transform', 'translate(30, 0)')
				        .call(yAxis);

				};

				scope.data.$loaded(function() {
					scope.render(scope.data.days);
				});
				
			}
		};
	});
})();