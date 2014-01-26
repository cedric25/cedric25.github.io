'use strict';

angular.module('banqueNetApp.services.operations', ['banqueNetApp.service.firebase'])

	.factory('OperationsService', ['firebaseRef',
		function (firebaseRef) {

			var getOperationsRef = function() {
				return firebaseRef('operations');
			};

			var getOperationtRef = function(operationId) {
				return firebaseRef('operations/' + operationId);
			};

			var getAccountOperationsRef = function(accountId) {
				return firebaseRef('accounts').child(accountId + '/operations');
			};

			var create = function(accountId, operation) {
				// 1) Create account
				var newOperation = getOperationsRef().push();
				newOperation.set(operation, function(err) {
					if (!err) {
						var name = newOperation.name();
						// 2) Link with account (as a callback)
						getAccountOperationsRef(accountId).child('/' + name).set(true);
					}
				});
			};

			return {

				getOperationsRef: getOperationsRef,
				getOperationtRef: getOperationtRef,
				getAccountOperationsRef: getAccountOperationsRef,
				create: create

			};

		}]);