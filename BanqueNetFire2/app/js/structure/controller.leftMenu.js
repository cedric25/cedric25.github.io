'use strict';

angular.module('banqueNetApp.controllers.leftMenu', [])

	.controller('LeftMenuController', ['$scope', '$location',
		function($scope, $location) {

			$scope.leftMenuEntries = [
				{
					"title": "Accounts",
					"link": "/accounts"
				},
				{
					"title": "Transfers",
					"link": "/transfers"
				}
			];

			$scope.$on('$routeChangeSuccess', function() {
				$scope.leftMenuEntries.forEach(
					function(data) {
						data.isActive = ($location.path().indexOf(data.link) == 0);
					}
				)
			})

		}]);