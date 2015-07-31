'use strict';

angular.module('vendingMachineApp')
  .factory('vendingMachineUI', function () {

    var service = {};

    service.getProductPrice = function () {
      return [0.01, 0.03, 0.10, 0.02, 0.50, 0.25, 1.50, 5.0];
    };

    service.getProductByKey = function (keyProduct) {
      //The second product is out of stock
      return ( keyProduct !== 1 );
    };

    service.getChangeCoin = function () {
      return true;
    };

    return service;

  });