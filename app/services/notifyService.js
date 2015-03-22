;(function() {
	'use strict';
	angular.module('dashboard')
	.factory('notifyService', function notifyService($timeout) {

		var to,
			message,
			service,
			showing = false,
			counter = 0;

		message = {
			display: false,
			type: '',
			msg: ''
		};

		service = {
			message: message,
			alert: alert,
			success: success
		};

		function alert(msg) {
			_show(msg, 'alert');
		}

		function success(msg) {
			_show(msg, 'success');
		}

		function _show(msg, type) {

			if(showing) {
				counter += 1;
				msg = msg + ' (' + counter + ')';
				$timeout.cancel(to);
			}

			message.type = type;
			message.msg = msg;

			showing = true;

			to = $timeout(function() {
				message.type = '';
				message.msg = '';
				showing = false;
				counter = 0;
			}, 2000);

		}
		return service;
	});
})();