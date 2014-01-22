"use strict";

angular.module('banqueNetApp.routes', ['ngRoute'])

   .config(['$routeProvider', function($routeProvider) {

			$routeProvider
				.when('/home', { templateUrl: 'views/home.html', controller: 'HomeCtrl' })

				.when('/login', 	{ templateUrl: 'views/users/login.html', controller: 'LoginCtrl' })
				.when('/signup', 	{ templateUrl: 'views/users/signup.html', controller: 'LoginCtrl' })

				.when('/accounts',                  { templateUrl: 'views/accounts/list.html', authRequired: true })
				.when('/accounts/create',           { templateUrl: 'views/accounts/edit.html', authRequired: true })
				.when('/accounts/:accountId',       { templateUrl: 'views/accounts/view.html', authRequired: true })
				.when('/accounts/:accountId/edit',  { templateUrl: 'views/accounts/edit.html', authRequired: true })

				.when('/transfers',                 { templateUrl: 'views/transfers/list.html', authRequired: true })
				.when('/transfers/create',          { templateUrl: 'views/transfers/create.html', authRequired: true })
				.when('/transfers/:transferId',     { templateUrl: 'views/transfers/view.html', authRequired: true })

      	.otherwise({ redirectTo: '/home' });

   }]);