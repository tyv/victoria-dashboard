;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('satisfaction', function(d3Service) {
		var linker;

		linker = function linker(scope, element) {
			var d3 = d3Service,
				svg,
				margin,
				width,
				height,
				vis,
				percToDeg,
				degToRad,
				percToRad,
				numSections,
				barWidth,
				arcStartRad,
				arcEndRad,
				sectionPerc,
				padRad,
				i,
				radius,
				chartInset,
				needleLength,
				needleRadius,
				perc,
				evaluateChange,
				radToDeg;

			margin = {
				top: 20,
				right: 20,
				bottom: 10,
				left: 40
			};

			numSections = 4;
			barWidth = 15;
			sectionPerc = 1 / numSections / 2;
			padRad = 0.05;
			chartInset = 10;
			needleLength = 100;
			needleRadius = 10;

			vis = element[0].querySelector('.vis');
			width = scope.width - margin.left - margin.right;
			height = scope.height - margin.top - margin.bottom;
			radius = width / 2;

			scope.render = function render(){

				var startPadRad,
					endPadRad,
					arc,
					needle,
					thetaRad,
					totalPercent = 0.75; //270deg

				//Remove any old svg
				d3.select(vis)
					.selectAll('svg')
					.remove();

				svg = d3.select(vis)
						.append('svg')
						.attr('class', 'satisfaction-vis')
						.attr('width', width + margin.left + margin.right)
						.attr('height', height + margin.top + margin.bottom)
						.append('g')
						.attr('transform', 'translate(' + scope.width / 2 + ',' + height + ')');

				needle = function needle() {
					var halfCircle,
					centerX,
					centerY,
					topX,
					topY,
					leftX,
					leftY,
					rightX,
					rightY;

					halfCircle = perc / 2;
					thetaRad = percToRad(halfCircle);
					centerX = 0;
					centerY = 0;
					topX = centerX - needleLength * Math.cos(thetaRad);
					topY = centerY - needleLength * Math.sin(thetaRad);
					leftX = centerX - needleRadius * Math.cos(thetaRad - Math.PI / 2);
					leftY = centerY - needleRadius * Math.sin(thetaRad - Math.PI / 2);
					rightX = centerX - needleRadius * Math.cos(thetaRad + Math.PI / 2);
					rightY = centerY - needleRadius * Math.sin(thetaRad + Math.PI / 2);

					return 'M'+leftX+' '+leftY+' L '+topX+' '+topY+' L '+rightX+' '+rightY;
				};

				//clear old data
				svg.selectAll('*').remove();

				//Build the arc
				for(i=0; i<numSections; i++) {
					arcStartRad = percToRad(totalPercent);
					arcEndRad = arcStartRad + percToRad(sectionPerc);
					totalPercent += sectionPerc;

					if(i === 0) {
						startPadRad = 0;
					} else {
						startPadRad = padRad / 2;
					}

					if(i === numSections) {
						endPadRad = 0;
					} else {
						endPadRad = padRad / 2;
					}

					arc = d3.svg.arc()
						.outerRadius(radius - chartInset)
						.innerRadius(radius - chartInset - barWidth)
						.startAngle(arcStartRad + startPadRad)
						.endAngle(arcEndRad - endPadRad);

					svg.append('path')
						.attr('class', 'arc chart-color-'+i)
						.attr('d', arc);
				}

				//build the needle
				svg.append('circle')
					.attr('class', 'needle-center')
					.attr('cx', 0)
					.attr('cy', 0)
					.attr('r', needleRadius);

				svg.append('path')
					.attr('class', 'needle')
					.attr('d', needle);
			};

			percToDeg = function percToDeg(perc) {
				return perc * 360;
			};

			percToRad = function percToRad(perc) {
				var deg = percToDeg(perc);
				return degToRad(deg);
			};

			degToRad = function degToRad(deg) {
				return deg * Math.PI / 180;
			};

			radToDeg = function radToDeg(rad) {
				return rad * 180 / Math.PI;
			};

			evaluateChange = function evaluateChange() {
				scope.percentChange = Math.floor(((scope.data.currentSatisfaction - scope.data.prevSatisfaction) / scope.data.prevSatisfaction) * 100);
				if(scope.percentChange < 0) {
					scope.rotation = 90;
					scope.changeClass = 'negative';
				} else if(scope.percentChange > 0) {
					scope.rotation = 270;
					scope.changeClass = 'positive';
				}
			};

			//only render after we have the data
			scope.data.$loaded(function() {
				scope.$watch('data', function(newValue) {
					if(newValue) {
						if(!scope.data.currentSatisfaction) {
							scope.nodata = true;
							return;
						}
						perc = scope.data.currentSatisfaction / 100;
						//Evaluate change
						evaluateChange();
						scope.render(scope.data);
					}
				}, true);
			});
		};

		return {
			restrict: 'E',
			scope: {
				data: '=',
				width: '@',
				height: '@'
			},
			templateUrl: 'views/satisfactionDirective.html',
			link: linker,
			transclude: true
		};
	});
})();