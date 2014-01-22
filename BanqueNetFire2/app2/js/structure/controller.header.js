'use strict';

angular.module('banqueNetApp.controllers.header', ['banqueNetApp.services.login'])

	.controller('HeaderController', ['$scope', '$rootScope', '$location', 'loginService', '$firebase', 'FBURL',
		function($scope, $rootScope, $location, loginService, $firebase, FBURL) {

			$scope.$on("angularFireAuth:login", function() {
				$firebase(new Firebase(FBURL + '/users/' + $rootScope.auth.id), $scope, 'user');
			});

			$scope.logout = function() {
				loginService.logout('/signin');
			};

			$scope.headerEntries = [
				{
					"title": "Home",
					"link": "/"
				}
			];

			$scope.$on('$routeChangeSuccess', function() {
				$scope.headerEntries.forEach(
					function(data) {
						data.isActive = ($location.path().indexOf(data.link) == 0);
					}
				)
			})

		}]);