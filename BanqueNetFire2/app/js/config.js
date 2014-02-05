'use strict';

angular.module('banqueNetApp.config', ['pascalprecht.translate'])

	.constant('version', '0.0.1')

	// where to redirect users if they need to authenticate (see module.routeSecurity)
	.constant('loginRedirectPath', '/login')

	// your Firebase URL goes here
	.constant('FBURL', 'https://1389448125924.firebaseio.com')

  // i18n
  .config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'locale/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
  }]);


/*********************
 * !!FOR E2E TESTING!!
 *
 * Must enable email/password logins and manually create
 * the test user before the e2e tests will pass
 *
 * user: test@test.com
 * pass: test123
 */
