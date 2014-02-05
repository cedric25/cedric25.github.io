'use strict';

// Declare app level module which depends on filters, and services
angular.module('banqueNetApp', [
		'banqueNetApp.config',
		'banqueNetApp.routes',
		'banqueNetApp.filters',
		'banqueNetApp.directives',

    'banqueNetApp.controllers.root',
		'banqueNetApp.controllers.home',
		'banqueNetApp.controllers.header',
		'banqueNetApp.controllers.leftMenu',
		'banqueNetApp.controllers.login',
		'banqueNetApp.controllers.account',
		'banqueNetApp.controllers.accounts',
		'banqueNetApp.controllers.transfers',

		'waitForAuth',
		'routeSecurity',

    'ngCookies',
    'pascalprecht.translate',

    'ngAnimate'
])

  .run(['loginService', '$rootScope', 'FBURL', 'Notifications', function(loginService, $rootScope, FBURL, Notifications) {

    // establish authentication
    $rootScope.auth = loginService.init('/login');
    $rootScope.FBURL = FBURL;

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // Clear notifications
      if (!Notifications.isKeepMessage()) {
        Notifications.clear();
      } else {
        Notifications.setKeepMessage(false);
      }
    });
  }]);
