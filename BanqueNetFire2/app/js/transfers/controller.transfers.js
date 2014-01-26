'use strict';

angular.module('banqueNetApp.controllers.transfers', ['banqueNetApp.services.transfers', 'banqueNetApp.services.accounts'])

	.controller('TransfersController', ['$scope', '$rootScope', '$routeParams', '$location', '$firebase', 'TransfersService', 'AccountsService', 'firebaseRef',
		function($scope, $rootScope, $routeParams, $location, $firebase, TransfersService, AccountsService, firebaseRef) {

			$scope.transferId = $routeParams.transferId;

			$scope.accountsList = [];

			$scope.transfersList = [];

			$scope.findAllUserTransfers = function() {
				var transfersRef = TransfersService.getTransfersRef();
				var userTransfersRef = TransfersService.getUserTransfersRef($rootScope.auth.user.id);
				userTransfersRef.on("child_added", function(transfer) {
					transfersRef.child(transfer.name()).once("value", function(objTransfer) {
						$scope.transfersList.push({id: objTransfer.name(), val: objTransfer.val()});
						$scope.$apply();
					});
				});
			};

			/**
			 * List of all accounts
			 * Fill 'from account' and 'to account' lists
			 */
			$scope.findAllAccounts = function() {
				var accountsRef = AccountsService.getAccountsRef();
				var userAccountsRef = AccountsService.getUserAccountsRef($rootScope.auth.user.id);
				userAccountsRef.on("child_added", function(account) {
					accountsRef.child(account.name()).once("value", function(objAccount) {
						$scope.accountsList.push({id: objAccount.name(), val: objAccount.val()});
						$scope.$apply();
					});
				});
			};

			/**
			 * Display details of a transfer
			 */
			$scope.findOneTransfer = function() {
				if (!!$scope.transferId) {
					// Transfer details
					TransfersService.getTransferRef($scope.transferId).once("value", function(snap) {
						$scope.transfer = snap.val();
						$scope.$apply();
					});
				}
			};

			/**
			 * Make a transfer
			 */
			$scope.create = function() {
				// Fill accounts' name
				//var accountFrom = _.find($scope.accountsList, function(key, account) { return key == $scope.transfer.fromAccountId });
				//var accountTo = _.find($scope.accountsList, function(key, account) { return key == $scope.transfer.toAccountId });
				//$scope.transfer.fromAccountName = accountFrom.name;
				//$scope.transfer.toAccountName = accountTo.name;
				TransfersService.create($scope.transfer, $rootScope.auth.user.id)
					.then(function(transferId) {
						$scope.transfer = null;
						$location.path('/transfers/' + transferId);
					});
			};

		}]);