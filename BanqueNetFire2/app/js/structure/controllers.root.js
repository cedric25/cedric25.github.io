'use strict';

angular.module('banqueNetApp.controllers.root', ['banqueNetApp.services.notifications'])

  /**
   * Contrôleur parent de tous les autres contrôleurs.
   * Toutes ces méthodes sont accessibles depuis les autres contrôleurs.
   */
  .controller('RootController', ['$scope', '$rootScope', 'Notifications',
    function ($scope, $rootScope, Notifications) {

      /* METHODES UTILITAIRES */

      $rootScope.hasGreenMessage = function () {
        return Notifications.hasGreenMessage();
      };
      $rootScope.getGreenMessage = function () {
        return Notifications.getGreenMessage();
      };
      $rootScope.hasRedMessage = function () {
        return Notifications.hasRedMessage();
      };
      $rootScope.getRedMessage = function () {
        return Notifications.getRedMessage();
      };

    }]);