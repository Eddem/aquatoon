// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase', 'starter.controllers', 'starter.services', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dash', {
                url: '/dash',
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings.html',
                controller: 'DashCtrl'
            })
            .state('prediction', {
                url: '/prediction',
                templateUrl: 'templates/prediction.html',
                controller: 'PredictionCtrl'
            })
            .state('risks', {
                url: '/risks',
                templateUrl: 'templates/risks.html',
                controller: 'DashCtrl'
            })
            .state('contactselect', {
                url: '/contactselect',
                templateUrl: 'templates/contactselect.html',
                controller: 'DashCtrl'
            })
            .state('chat', {
                url: '/chat',
                templateUrl: 'templates/chat.html',
                controller: 'Messages'
            })
            .state('sensor', {
                url: '/sensor',
                templateUrl: 'templates/sensor.html',
                controller: 'SensorGraphCtrl'
            })
            .state('graph', {
                url: '/graph',
                templateUrl: 'templates/grondwaterpeil.html',
                controller: 'SensorGraphCtrl'
            });
        $urlRouterProvider.otherwise('/dash');
    });