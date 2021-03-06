'use strict';

angular.module('banqueNetApp.controllers.accounts',
		['banqueNetApp.services.accounts', 'banqueNetApp.services.operations', 'banqueNetApp.service.firebase', 'banqueNetApp.services.notifications'])

	.controller('AccountsController', ['$scope', '$rootScope', '$routeParams', '$location', 'AccountsService', 'OperationsService', 'Notifications',
		function($scope, $rootScope, $routeParams, $location, AccountsService, OperationsService, Notifications) {

			$scope.accountId = $routeParams.accountId;
			$scope.noAccount = !$routeParams.accountId;

			$scope.account = {};
			$scope.accountsList = [];
			$scope.accountOperationsList = [];

			$scope.findAllUserAccounts = function() {

				// Reinit list
				$scope.accountsList = [];

				var accountsRef = AccountsService.getAccountsRef();
				var userAccountsRef = AccountsService.getUserAccountsRef($rootScope.auth.user.id);
				userAccountsRef.on("child_added", function(account) {
					accountsRef.child(account.name()).once("value", function(objAccount) {
						$scope.accountsList.push({id: objAccount.name(), val: objAccount.val()});
						// Sorting
						$scope.accountsList.sort(function(a, b) {
							if (a.val.name < b.val.name) return -1;
							if (b.val.name < a.val.name) return 1;
							return 0;
						});
						$scope.$apply();
					});
				});
			};

			$scope.findOneAccount = function () {
				if (!!$scope.accountId) {

					// Account details
					AccountsService.getAccountRef($scope.accountId).once("value", function(snap) {
						$scope.account = snap.val();
						$scope.$apply();
					});

					// Operations list
					var operationsRef = OperationsService.getOperationsRef();
					var accountOperationsRef = OperationsService.getAccountOperationsRef($scope.accountId);
					accountOperationsRef.on("child_added", function(operation) {
						operationsRef.child(operation.name()).once("value", function(objOperation) {
							$scope.accountOperationsList.push({id: objOperation.name(), val: objOperation.val()});
							$scope.$apply();
						});
					});

				}
			};

      $scope.update = function() {
        if (!validateUpdate()) {
          return;
        }
        if (!!$scope.accountId) {
          AccountsService.updateName($scope.accountId, $scope.account.name);
          $scope.account = null;
          Notifications.setGreenMessage('Account name updated.', true);
          $location.path('/accounts');
        }
      };

      function validateUpdate() {
        if (!$scope.account.name) {
          Notifications.setRedMessage('Please enter a name.');
          return false;
        }
        return true;
      }

			$scope.create = function() {

				AccountsService.create($scope.account, $rootScope.auth.user.id);

				$scope.account = null;
				$location.path('/accounts');
			};

			$scope.removeAccount = function(accountId) {
				AccountsService.removeAccount($rootScope.auth.user.id, accountId);
				$scope.findAllUserAccounts();
			}

		}]);