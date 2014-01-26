'use strict';

angular.module('banqueNetApp.services.users', ['banqueNetApp.service.firebase'])

	.factory('UsersService', ['$firebase', 'firebaseRef',
		function ($firebase, firebaseRef) {

			return {

				collection: function () {
					return $firebase(firebaseRef.usersRef());
				}

			}

		}]);