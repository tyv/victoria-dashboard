;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('burndown', function(d3Service, momentService) {
		var linker,
			adjustData;

		linker = function linker(scope, element) {
				var d3 = d3Service,
					svg,
					margin,
					width,
					height,
					graphWidth,
					vis,
					moment = momentService;

				margin = {
					top: 20,
					right: 20,
					bottom: 30,
					left: 40
				};

				vis = element[0].querySelector('.vis');
				width = scope.width - margin.left - margin.right;
				height = scope.height - margin.top - margin.bottom;
				graphWidth = width - 250;


			scope.render = function(data) {

				var filteredDays,
					startDate,
					endDate,
					x,
					y,
					xAxis,
					yAxis,
					line;

				svg = d3.select(vis)
						.append('svg')
						.attr('class', 'burndown-vis')
						.attr('width', width + margin.left + margin.right)
						.attr('height', height + margin.top + margin.bottom)
						.append('g')
						.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
				//remove the empty values
				//
				filteredDays = adjustData(data.days, data.goal);

				startDate = new Date(moment(data.startDate).subtract(1, 'days').format());
				endDate = new Date(data.endDate);

				x = d3.time.scale()
					.domain([startDate, endDate])
					.range([0, graphWidth]);

				y = d3.scale.linear()
						.domain([0, data.goal])
						.range([height, 0]);

				// Define the axes
				xAxis = d3.svg.axis().scale(x)
				    .orient('bottom').ticks(filteredDays.length);

				yAxis = d3.svg.axis().scale(y)
					    .orient('left').ticks(5);

				line = d3.svg.line()
					.x(function(d) { 
						return x(new Date(d.date));
					})
					.y(function(d) { 
						return y(d.remaining);
					});

				//clear old data
				svg.selectAll('*').remove();

				// Add the X Axis
				svg.append('g')
				.attr('class', 'x-axis')
		        .attr('transform', 'translate(0,'+ height +')')
		        .call(xAxis);

			    // Add the Y Axis
			    svg.append('g')
			        .attr('class', 'y-axis')
			        .call(yAxis);

				//Add ideal line
				svg.append('path')
				.attr('d', line([{date: startDate, remaining: data.goal}, {date: endDate, remaining: 0}]))
				.attr('class', 'ideal-line');
				
				//Add burndown
				svg.append('path')
				.attr('d', line(filteredDays))
				.attr('class', 'burndown-line');

				//Add circles to burndown
				svg.selectAll('dot')
					.data(filteredDays)
					.enter().append('circle')
					.attr('class', 'burndown-dots')
					.attr('r', 5)
					.attr('cx', function(d) { return x(new Date(d.date)); })
					.attr('cy', function(d) { return y(d.remaining); });

				//Add overview
				svg.append('text')
					.attr('x', graphWidth + 70)
					.attr('y', 30 + margin.top)
					.attr('class', 'title')
					.text(data.remaining + '/' + data.goal);
			};

			//only render after we have the data
			scope.data.$loaded(function() {
				scope.$watch('data', function(newValue) {
					if(!scope.data.days) {
						scope.nodata = true;
						return;
					}
					if(newValue) {
						scope.render(scope.data);
					}
				}, true);
			});
		};

		adjustData = function adjustData(days, goal) {
			var filteredDays;

			filteredDays = days.filter(function(item) {
				return item.qty !== '';
			});

			for (var i = 0; i < filteredDays.length; i++) {
				if(i === 0) {
					filteredDays[i].remaining = goal;
					filteredDays[i].done = 0;
				} else {
					filteredDays[i].remaining = filteredDays[i-1].remaining - filteredDays[i].qty;
					filteredDays[i].done = filteredDays[i-1].done + filteredDays[i].qty;
				}
			}

			return filteredDays;
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