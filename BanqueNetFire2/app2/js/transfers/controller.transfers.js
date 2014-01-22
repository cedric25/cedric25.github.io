'use strict';

angular.module('banqueNetApp.controllers.transfers', ['banqueNetApp.services.transfers', 'banqueNetApp.services.accounts'])

	.controller('TransfersController', ['$scope', '$rootScope', '$routeParams', '$location', '$firebase', 'TransfersService', 'AccountsService',
		function($scope, $rootScope, $routeParams, $location, $firebase, TransfersService, AccountsService) {

			$scope.transferId = $routeParams.transferId;

			/**
			 * List of all transfers
			 */
			$scope.findAllTransfers = function() {
				$scope.transfersList = TransfersService.collection($rootScope.auth.user.id);
			};

			/**
			 * List of all accounts
			 * Fill 'from account' and 'to account' lists
			 */
			$scope.findAllAccounts = function() {
				$scope.accountsList = AccountsService.collection($rootScope.auth.user.id);
			};

			/**
			 * Display details of a transfer
			 */
			$scope.findOneTransfer = function() {
				if (!!$scope.transferId) {
					$firebase(TransfersService.findOne($scope.transferId), $scope, 'transfer')
				}
			};

			/**
			 * Make a transfer
			 */
			$scope.create = function() {
				// Fill accounts' name
				var accountFrom = _.find($scope.accountsList, function(account) { return account.$id == $scope.transfer.fromAccountId });
				var accountTo = _.find($scope.accountsList, function(account) { return account.$id == $scope.transfer.toAccountId });
				$scope.transfer.fromAccountName = accountFrom.name;
				$scope.transfer.toAccountName = accountTo.name;
				TransfersService.create($scope.transfer, $rootScope.auth.user.id).then(function(transferId) {
					$scope.transfer = null;
					$location.path('/transfers/' + transferId);
				})
			};

		}]);