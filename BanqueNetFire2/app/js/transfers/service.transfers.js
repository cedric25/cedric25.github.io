'use strict';

angular.module('banqueNetApp.services.transfers', ['banqueNetApp.service.firebase', 'banqueNetApp.services.accounts', 'banqueNetApp.services.operations'])

	.factory('TransfersService', ['$q', '$firebase', 'firebaseRef', 'OperationsService', 'AccountsService',
		function($q, $firebase, firebaseRef, OperationsService, AccountsService) {

			var getTransfersRef = function() {
				return firebaseRef('transfers');
			};

			var getTransferRef = function(transferId) {
				return firebaseRef('transfers').child(transferId);
			};

			var getUserTransfersRef = function(authId) {
				return firebaseRef('users').child('/' + authId).child('/transfers');
			};

			return {

				getTransfersRef: getTransfersRef,
				getTransferRef: getTransferRef,
				getUserTransfersRef: getUserTransfersRef,

				create: function(transfer, authId) {

					var dateCrea = new Date().toLocaleString();

					var objTransfer = {
						fromAccountId: transfer.fromAccount.id,
						fromAccountName: transfer.fromAccount.val.name,
						toAccountId: transfer.toAccount.id,
						toAccountName: transfer.toAccount.val.name,
						amount: transfer.amount,
						creatorId: authId,
						dateCrea: dateCrea
					};

					var deferred = $q.defer();

					var newTransfer = getTransfersRef().push();
					newTransfer.set(objTransfer, function(err) {
						if (!err) {
							var name = newTransfer.name();
							// Link with user (as a callback)
							getUserTransfersRef(authId).child('/' + name).set(true);
						}
					});

					// --- Register operations in both 'from' and 'to' accounts

					var fromAccountOperation = {
						amount: -transfer.amount,
						dateCrea: dateCrea,
						desc: 'Transfer to ' + transfer.toAccount.val.name
					};
					OperationsService.create(transfer.fromAccount.id, fromAccountOperation);

					var toAccountOperation = {
						amount: transfer.amount,
						dateCrea: dateCrea,
						desc: 'Transfer from ' + transfer.fromAccount.val.name
					};
					OperationsService.create(transfer.toAccount.id, toAccountOperation);

					// --- Update accounts' balance
					AccountsService.updateBalance(transfer.fromAccount.id, -transfer.amount);
					AccountsService.updateBalance(transfer.toAccount.id, transfer.amount);

					deferred.resolve(newTransfer.name());
					return deferred.promise;
				}

			}

		}]);