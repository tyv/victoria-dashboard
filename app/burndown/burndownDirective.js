;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('burndown', function(d3Service, momentService) {
		var linker,
			adjustData;

		linker = function linker(scope, element) {
			var d3 = d3Service,
				svg,
				moment = momentService;

			var margin = {
					top: 20,
					right: 20,
					bottom: 30,
					left: 30
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
				//remove the empty values
				var filteredDays = adjustData(data.days, data.goal);

				var startDate = new Date(moment(data.startDate).subtract(1, 'days').format());
				var endDate = new Date(data.endDate);

				var x = d3.time.scale()
					.domain([startDate, endDate])
					.range([0, width]);

				var y = d3.scale.linear()
						.domain([0, data.goal])
						.range([height, 0]);

				// Define the axes
				var xAxis = d3.svg.axis().scale(x)
				    .orient('bottom').ticks(filteredDays.length);

				var yAxis = d3.svg.axis().scale(y)
					    .orient('left').ticks(5);


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

				//clear old data
				svg.selectAll('*').remove();

				//Add ideal line
				svg.append('path')
				.attr('d', line([{date: startDate, remaining: data.goal}, {date: endDate, remaining: 0}]))
				.style({
					fill: 'none',
					stroke: '#ff00ff'
				});
				
				//Add burndown
				svg.append('path')
				.attr('d', line(filteredDays))
				.style({
					fill: 'none',
					stroke: '#fff'
				});

				//Add burnup
				svg.append('path')
				.attr('d', lineUp(filteredDays))
				.style({
					fill: 'none',
					stroke: '#fff'
				});

				// Add the X Axis
				svg.append('g')
				.attr('class', 'x axis')
		        .attr('transform', 'translate(0,'+ height +')')
		        .call(xAxis)
		        .selectAll('text')  
	            .style({'text-anchor': 'end', 'display': 'none'})
	            // .attr('dx', '-.8em')
	            // .attr('dy', '.15em')
	            // .attr('transform', function(d) {
	            //     return 'rotate(-65)' 
	            // });

			    // Add the Y Axis
			    svg.append('g')
			        .attr('class', 'y axis')
			        .call(yAxis);

			    //Add overview
			    scope.overview = data.remaining;
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