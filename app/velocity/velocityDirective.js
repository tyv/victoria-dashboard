;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('velocity', function(d3Service, momentService) {
		var linker,
			sortData,
			moment = momentService;

		linker = function linker(scope, element) {
			var d3 = d3Service,
				svg,
				margin,
				width,
				height,
				vis;

			margin = {
				top: 30,
				right: 40,
				bottom: 30,
				left: 40
			};

			vis = element[0].querySelector('.vis');
			width = scope.width - margin.left - margin.right;
			height = scope.height - margin.top - margin.bottom;

			scope.render = function(data) {

				//Remove any old svg
				d3.select(vis)
					.selectAll('svg')
					.remove();

				svg = d3.select(vis)
					.append('svg')
					.attr('class', 'burndown-vis')
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
					.append('g')
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				var sortedData = sortData(data);

				var x = d3.time.scale()
					.domain(d3.extent(sortedData, function(d) { return new Date(d.date);}))
					.range([0, width]);

				var y = d3.scale.linear()
						.domain(d3.extent(sortedData, function(d) {return d.score;}))
						.range([height, 0]);

				var line = d3.svg.line()
					.x(function(d) { 
						return x(new Date(d.date));
					})
					.y(function(d) { 
						return y(d.score);
					});

				// clear old data
				svg.selectAll('*').remove();
				
				//Add burndown
				svg.append('path')
				.attr('d', line(sortedData))
				.attr('class', 'velocity');

				//Add circles to burndown
				svg.selectAll('dot')
					.data(sortedData)
					.enter().append('circle')
					.attr('class', 'velocity-dots')
					.attr('r', 5)
					.attr('cx', function(d) { return x(new Date(d.date)); })
					.attr('cy', function(d) { return y(d.score); });

			};

			//only render after we have the data
			scope.data.$loaded(function() {
				scope.$watch('data', function(newValue) {
					if(newValue) {
						if(!scope.data.velocities || scope.data.velocities.length < 2) {
							scope.nodata = true;
							return;
						}
						scope.render(scope.data.velocities);
					}
				}, true);
			});
		};

		sortData = function sortData(data) {
			return data.sort(function(a, b) {
				return moment(a.date).isAfter(b.date);
			});
		};

		return {
			restrict: 'E',
			scope: {
				data: '=',
				width: '@',
				height: '@'
			},
			templateUrl: 'views/velocityDirective.html',
			link: linker,
			transclude: true
		};
	});
})();