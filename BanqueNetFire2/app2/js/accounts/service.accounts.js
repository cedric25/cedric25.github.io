'use strict';

angular.module('banqueNetApp.services.accounts', ['banqueNetApp.service.firebase'])

	.factory('AccountsService', ['$firebase', 'firebaseRef', 'Firebase', 'FBURL',
		function ($firebase, firebaseRef, Firebase, FBURL) {

			var getUserAccountsRef = function(authId) {
				return firebaseRef('users').child(authId + '/accounts');
			};

			var getUserOneAccountRef = function(authId, accountId) {
				return getUserAccountsRef(authId).child('/' + accountId);
			};

			return {

				collection: function(authId, callback) {
					return $firebase(getUserAccountsRef(authId), callback);
				},

				find: function(authId, accountId) {
					return getUserOneAccountRef(authId, accountId);
				},

				create: function(account, authId, callback) {
					return getUserAccountsRef(authId).push({
						name: account.name,
						balance: '0',
						operations: []
					}, callback).name();
				},

				removeAccount: function(authId, accountId) {
					var account = getUserOneAccountRef(authId, accountId);
					account.remove();
				},

				registerOperation: function(authId, accountId, operation) {

					var accountRef = firebaseRef('users').child('/' + authId + '/accounts/' + accountId);
					var account = $firebase(accountRef);

					var actualBalance = account.balance;
					actualBalance = parseFloat(actualBalance);
					var amount = parseFloat(operation.amount);
					var newBalance = actualBalance + amount;
					getUserOneAccountRef(authId, accountId).child('/balance').set(newBalance);
				}

			};

		}]);