'use strict';

angular.module('banqueNetApp.controllers.header', ['banqueNetApp.services.login'])

	.controller('HeaderController', ['$scope', '$rootScope', '$location', 'loginService', '$firebase', 'FBURL', '$translate',
		function($scope, $rootScope, $location, loginService, $firebase, FBURL, $translate) {

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
			});

      $scope.changeLanguage = function (langKey) {
        $translate.uses(langKey);
      };

		}]);