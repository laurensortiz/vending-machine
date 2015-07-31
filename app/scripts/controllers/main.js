'use strict';

/**
 * @ngdoc function
 * @name vendingMachineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vendingMachineApp
 */
angular.module('vendingMachineApp')
  .controller('MainCtrl', function ($scope, $timeout, $filter, vendingMachineUI) {
    $scope.credit = 0;
    $scope.status = "";
    $scope.keyboardButtonsNum = _.range(0, 9);
    $scope.productPrices = vendingMachineUI.getProductPrice();
    $scope.userHasChange = false;
    $scope.showCoinChange = false;
    $scope.productSelect = 0;
    $scope.coinDenominations = [0.01, 0.05, 0.10, 0.25, 0.50, 1.0];
    $scope.allProducts = [
      {
        type : 'snack',
        price : '1¢'
      },
      {
        type : 'snack',
        price : '3¢'
      },
      {
        type : 'chocolate',
        price : '10¢'
      },
      {
        type : 'snack',
        price : '2¢'
      },
      {
        type : 'snack',
        price : '50¢'
      },
      {
        type : 'drink',
        price : '25¢'
      },
      {
        type : 'drink',
        price : '$1.50'
      },
      {
        type : 'drink',
        price : '$5'
      },
    ];

    function amount(price) {
      userMessage($filter('currency')(price, "$"));
    }

    function decrementCredit(value) {
      $scope.credit -= value;
      roundTwoDecimals();
    }

    function dispenseCoin(value) {
      if (value > $scope.credit || !vendingMachineUI.getChangeCoin()){
        return false;
      }
      decrementCredit(value);
      return true;
    }

    function dispenseProduct(keyProduct) {
      if (vendingMachineUI.getProductByKey(keyProduct)) {
        return true;
      }
      userMessage("No Product available");

      return false;
    }

    function getProductPrice(keyProduct) {
      return $scope.productPrices[keyProduct];
    }

    function hasSufficientCredit(price) {
      if ($scope.credit >= price) {
        return true;
      }
      amount(price);
      return false;
    }

    function incrementCredit(value) {
      $scope.credit += value;
      roundTwoDecimals();
    }

    function isKeyProductValid(slot) {
      if (slot < $scope.productPrices.length) {
        return true;
      }
      userMessage("Please select a correct product");

      return false;
    }

    function roundTwoDecimals() {
      // Let's avoid floating point weirdness.

      $scope.credit = Math.round($scope.credit * 100) / 100
    }

    function userMessage(message) {
      $scope.status = message;
      $timeout(function() { $scope.status = ""; }, 1000);
    }


    // Handler the coin select by the user
    $scope.coinSelected = function (value) {
      incrementCredit(value);
    };

    // called when the user hits the change button
    $scope.dispenseChange = function() {
      $scope.coinDenominations.forEach(function(value) {
        while (dispenseCoin(value)) { };
      });
      $scope.showCoinChange = true;

    };

    // called when the user enters a selection on the keypad
    $scope.selectProductByKey = function(keyProduct) {
      if (!isKeyProductValid(keyProduct)) return;
      var price = getProductPrice(keyProduct);

      if (!hasSufficientCredit(price)){
        userMessage("You don't have enough money");
        return;
      }
      if (!dispenseProduct(keyProduct)) {
        return;
      }

      $scope.productSelected = keyProduct;
      //Enable run the animation again
      $timeout(function() { $scope.productSelected = -1; }, 3000);
      decrementCredit(price);
      userMessage("Take your product");
    };

    //Show button TAKE CHANGE if the user has coins inside machine
    $scope.$watch('credit', function(newValue, oldValue) {
      $scope.userHasChange = (newValue > 0) ? true : false;
    });

  });
