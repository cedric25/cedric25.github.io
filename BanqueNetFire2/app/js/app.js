'use strict';

// Declare app level module which depends on filters, and services
angular.module('banqueNetApp', [
		'banqueNetApp.config',
		'banqueNetApp.routes',
		'banqueNetApp.filters',
		'banqueNetApp.directives',

		'banqueNetApp.controllers.home',
		'banqueNetApp.controllers.header',
		'banqueNetApp.controllers.leftMenu',
		'banqueNetApp.controllers.login',
		'banqueNetApp.controllers.account',
		'banqueNetApp.controllers.accounts',
		'banqueNetApp.controllers.transfers',

		'waitForAuth',
		'routeSecurity',

    'pascalprecht.translate'
])

  .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
    // establish authentication
    $rootScope.auth = loginService.init('/login');
    $rootScope.FBURL = FBURL;
  }]);
