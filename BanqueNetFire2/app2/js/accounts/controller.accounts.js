'use strict';

angular.module('banqueNetApp.controllers.accounts', ['banqueNetApp.services.accounts', 'banqueNetApp.services.users'])

	.controller('AccountsController', ['$scope', '$rootScope', '$routeParams', '$location', '$firebase', 'AccountsService',
		function($scope, $rootScope, $routeParams, $location, $firebase, AccountsService) {

			$scope.accountId = $routeParams.accountId;
			$scope.noAccount = !$routeParams.accountId;

			$scope.findAllUserAccounts = function() {
				$scope.accountsList = AccountsService.collection($rootScope.auth.user.id);
			};

			$scope.findOneAccount = function () {
				if (!!$scope.accountId) {
					$firebase(AccountsService.find($rootScope.auth.user.id, $routeParams.accountId), $scope, 'account');
				}
			};

			$scope.create = function() {
				var accountId = AccountsService.create($scope.account, $rootScope.auth.user.id, function(err) {
					if (!err) {
						$scope.account = null;
						$location.path('/accounts/' + accountId);
						$scope.$apply();
					}
					else {
						$scope.err = err.message;
					}
				});
			};

			$scope.removeAccount = function(accountId) {
				AccountsService.removeAccount($rootScope.auth.user.id, accountId);
			}

		}]);