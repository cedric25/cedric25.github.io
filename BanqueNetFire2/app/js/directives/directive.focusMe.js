'use strict';

angular.module('banqueNetApp.controllers.transfers')

	.directive('focusMe', function ($timeout, $parse) {
		return {
			link: function (scope, element, attrs) {
				var model = $parse(attrs.focusMe);
				scope.$watch(model, function (value) {
					element[0].focus();
				});
			}
		};
	});