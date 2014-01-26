'use strict';

/* Directives */


angular.module('banqueNetApp.directives', [])

	.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
