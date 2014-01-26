'use strict';

angular.module('banqueNetApp.services.accounts', ['banqueNetApp.service.firebase'])

	.factory('AccountsService', ['firebaseRef',
		function (firebaseRef) {

			var getAccountsRef = function() {
				return firebaseRef('accounts');
			};

			var getAccountRef = function(accountId) {
				return firebaseRef('accounts').child(accountId);
			};

			var getUserAccountsRef = function(authId) {
				return firebaseRef('users').child(authId + '/accounts');
			};

			var getUserOneAccountRef = function(authId, accountId) {
				return getUserAccountsRef(authId).child('/' + accountId);
			};

			var updateBalance = function(accountId, operationAmount) {
				getAccountRef(accountId).once('value', function(snapshot) {
					var actualBalance = snapshot.val().balance;
					actualBalance = parseFloat(actualBalance);
					var newBalance = actualBalance + parseFloat(operationAmount);
					getAccountRef(accountId).child('balance').set(newBalance);
				});
			};

			return {

				getAccountsRef: getAccountsRef,
				getAccountRef: getAccountRef,
				getUserAccountsRef: getUserAccountsRef,
				updateBalance: updateBalance,

				collection: function (authId) {
					return getUserAccountsRef(authId);
				},

				find: function(authId, accountId) {
					return getUserOneAccountRef(authId, accountId);
				},

				create: function(account, authId) {

					var accountToPush = {
						name: account.name,
						balance: 0
					};

					// 1) Create account
					var newAccount = getAccountsRef().push();
					newAccount.set(accountToPush, function(err) {
						if (!err) {
							var name = newAccount.name();
							// 2) Link with user (as a callback)
							getUserAccountsRef(authId).child('/' + name).set(true);
						}
					});
				},

				removeAccount: function(authId, accountId) {

					// 1) Remove account
					getAccountRef(accountId).remove();

					// 2) Remove link with user
					getUserOneAccountRef(authId, accountId).remove();
				},

				registerOperation: function(authId, accountId, operation) {

					// 1) Create operation

					var accountRef = firebaseRef('users').child('/' + authId + '/accounts/' + accountId);

					accountRef.on('value', function(snapshot) {
						debugger
						var actualBalance = snapshot.balance;
						actualBalance = parseFloat(actualBalance);
						var amount = parseFloat(operation.amount);
						var newBalance = actualBalance + amount;
						getUserOneAccountRef(authId, accountId).child('/balance').set(newBalance);
					});
				}

			};

		}]);