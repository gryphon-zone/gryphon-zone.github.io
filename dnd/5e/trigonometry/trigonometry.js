'use strict';

// Declare app level module which depends on views, and core components
let trigonometry = angular.module('dndApp.trigonometry', [
    'ngRoute'
]);

let TrigonometryCtrl = function($scope) {
    console.log('TrigonometryCtrl invoked');
    $scope.data = {};
    $scope.functions = {};

    $scope.data['boxes'] = {
      'a': 1,
      'b': 1,
      'c': 1
    };
    $scope.data['checkbox'] = 'a';

    function isNumber(c) {
      return '0123456789'.indexOf(c) !== -1;
    }

    $scope.functions.keyPress = function($event, box) {
      let str = String($scope.data.boxes[box]);
      let isValid = isNumber($event.key) || (str !== undefined && str !== null && $event.key === '.' && str.indexOf('.') === -1);   

      if (!isValid) {
        $event.preventDefault();
        return;
      }
    };

    $scope.functions.recalculate = function(box) {
      let isALocked = box === 'a' || $scope.data['checkbox'] === 'a';
      let isBLocked = box === 'b' || $scope.data['checkbox'] === 'b';
      let isCLocked = box === 'c' || $scope.data['checkbox'] === 'c';

      let a = $scope.data['boxes']['a'];
      let b = $scope.data['boxes']['b'];
      let c = $scope.data['boxes']['c'];

      // only one should ever be unlocked
      console.log(`a (locked == ${isALocked}) : ${a}, b (locked == ${isBLocked}): ${b}, c (locked == ${isCLocked}): ${c}`);

      if (!isALocked) {
        $scope.data['boxes']['a'] = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
      } else if (!isBLocked) {
        $scope.data['boxes']['b'] = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
      } else if (!isCLocked) {
        $scope.data['boxes']['c'] = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      } else {
        console.log('All three boxes are locked, something\'s wack');
      }
    };

    $scope.functions.recalculate('b');
};
TrigonometryCtrl.$inject = ['$scope'];
m.controller('TrigonometryCtrl', TrigonometryCtrl);

trigonometry.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/trigonometry', {
        'controller': 'TrigonometryCtrl',
        'templateUrl': 'trigonometry/trigonometry.html'
    });
}]);

