'use strict';

angular.module('banqueNetApp.services.transfers', ['banqueNetApp.services.accounts', 'banqueNetApp.service.firebase'])

	.factory('TransfersService', ['$q', '$firebase', 'firebaseRef', 'AccountsService',
		function($q, $firebase, firebaseRef, AccountsService) {

			var getUserTransfersRef = function(authId) {
				return firebaseRef('users').child('/' + authId).child('/transfers');
			};

			return {

				collection: function(authId, callback) {
					return $firebase(getUserTransfersRef(authId), callback);
				},

				create: function(transfer, authId, cb) {

					var dateCrea = new Date().toLocaleString();

					var objTransfer = {
						fromAccountId: transfer.fromAccountId,
						fromAccountName: transfer.fromAccountName,
						toAccountId: transfer.toAccountId,
						toAccountName: transfer.toAccountName,
						amount: transfer.amount,
						creatorId: authId,
						dateCrea: dateCrea
					};

					var deferred = $q.defer();
					var name = getUserTransfersRef(authId).push(objTransfer, cb).name();

					// --- Register operations in both 'from' and 'to' accounts
					// and update accounts' balance

					AccountsService.registerOperation(authId, transfer.fromAccountId, {
						amount: -transfer.amount,
						dateCrea: dateCrea,
						desc: 'Transfer to ' + transfer.toAccountName
					});

					AccountsService.registerOperation(authId, transfer.toAccountId, {
						amount: transfer.amount,
						dateCrea: dateCrea,
						desc: 'Transfer from ' + transfer.toAccountName
					});

					deferred.resolve(name);
					return deferred.promise;
				},

				findOne: function(transferId) {
					return firebaseRef('transfers').child(transferId);
				}

			}

		}]);