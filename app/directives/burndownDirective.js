;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('burndown', function(d3Service) {
		var linker,
			adjustData;

		linker = function linker(scope, element) {
			var d3 = d3Service,
				svg;

			var margin = {
					top: 20,
					right: 20,
					bottom: 20,
					left: 20
				};

			var width = scope.width - margin.left - margin.right;
				var height = scope.height - margin.top - margin.bottom;

			svg = d3.select(element[0].querySelector('.vis'))
					.append('svg')
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
					.append('g')
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			scope.render = function(data) {

				adjustData(data.days, data.goal);
				
				var startDate = new Date(data.startDate);
				var endDate = new Date(data.endDate);

				var x = d3.time.scale()
					.domain([startDate, endDate])
					.range([30, width]);

				var y = d3.scale.linear()
						.domain([0, data.goal])
						.range([height, 0]);

				var line = d3.svg.line()
					.x(function(d) { 
						return x(new Date(d.date));
					})
					.y(function(d) { 
						return y(d.remaining);
					});

				var lineUp = d3.svg.line()
					.x(function(d) { 
						return x(new Date(d.date));
					})
					.y(function(d) { 
						return y(d.done);
					}); 

				// Define the axes
				var xAxis = d3.svg.axis().scale(x)
				    .orient('bottom');

				var yAxis = d3.svg.axis().scale(y)
					    .orient('left').ticks(5);

				//clear old data
				svg.selectAll('*').remove();

				//Add ideal line
				svg.append('path')
				.attr('d', line([{date: startDate, remaining: 40}, {date: endDate, remaining: 0}]))
				.style({
					fill: 'none',
					stroke: '#000'
				});

				//Add burndown
				svg.append('path')
				.attr('d', line(data.days))
				.style({
					fill: 'none',
					stroke: '#000'
				});

				//Add burnup
				svg.append('path')
				.attr('d', lineUp(data.days))
				.style({
					fill: 'none',
					stroke: '#000'
				});

				svg.append('g')
				.attr('class', 'x axis')
		        .attr('transform', 'translate(0,'+ height +')')
		        .call(xAxis);
		        // .selectAll('text')  
	         //    .style('text-anchor', 'end')
	         //    .attr('dx', '-.8em')
	         //    .attr('dy', '.15em')
	         //    .attr('transform', function(d) {
	         //        return 'rotate(-65)' 
	         //    });

			    // Add the Y Axis
			    svg.append('g')
			        .attr('class', 'y axis')
			        .attr('transform', 'translate(30, 0)')
			        .call(yAxis);

			    //Add overview
			    scope.overview = data.days[data.days.length -1].remaining;
			};

			//only render after we have the data
			scope.data.$loaded(function() {
				scope.$watch('data', function(newValue) {
					if(newValue) {
						scope.render(scope.data);
					}
				}, true);
			});
		};

		adjustData = function adjustData(days, goal) {
			for (var i = 0; i < days.length; i++) {
				if(i === 0) {
					days[i].remaining = goal;
					days[i].done = 0;
				} else {
					days[i].remaining = days[i-1].remaining - days[i].qty;
					days[i].done = days[i-1].done + days[i].qty;
				}
			}
		};

		return {
			restrict: 'E',
			scope: {
				data: '=',
				width: '@',
				height: '@'
			},
			templateUrl: 'views/burndownDirective.html',
			link: linker,
			transclude: true
		};
	});
})();