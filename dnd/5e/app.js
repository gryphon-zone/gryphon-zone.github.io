'use strict';

// Declare app level module which depends on views, and core components
let m = angular.module('dndApp', [
    'ngRoute',
    'dndApp.trigonometry'
]);

let DefaultCtrl = function($scope, $location) {
    console.log('DefaultCtrl invoked');
};
DefaultCtrl.$inject = ['$scope', '$location'];
m.controller('DefaultCtrl', DefaultCtrl);

// sidebar controller
let SidebarCtrl = function($scope, $location) {
    console.log('SidebarCtrl invoked');

    $scope.activePath = function() {
        let p = $location.path();

        if (p[0] === '/') {
            p = p.substring(1, p.length);
        }

        let index = p.indexOf('/');

        if (index > 0) {
            p = p.substring(0, index);
        }

        return p;
    }

};
SidebarCtrl.$inject = ['$scope', '$location'];
m.controller('SidebarCtrl', SidebarCtrl);

m.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(false);

  $routeProvider
    .when('/home', {
        'controller': 'DefaultCtrl',
        'templateUrl': 'default.html'
    })
    .otherwise({
        'redirectTo': 'home'
    });
}]);

