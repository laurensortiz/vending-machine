'use strict';

/**
 * @ngdoc overview
 * @name vendingMachineApp
 * @description
 * # vendingMachineApp
 *
 * Main module of the application.
 */
angular
  .module('vendingMachineApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
