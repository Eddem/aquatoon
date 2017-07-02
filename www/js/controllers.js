angular.module('starter.controllers', [])
    .factory("Items", function ($firebaseArray) {
        var itemsRef = new Firebase("https://airqcloud.firebaseio.com/feed");
        return $firebaseArray(itemsRef);
    })
    .directive('input', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&',
                'onFocus': '&',
                'onBlur': '&'
            },
            link: function(scope, element, attr) {
                element.bind('focus', function(e) {
                    if (scope.onFocus) {
                        $timeout(function() {
                            scope.onFocus();
                        });
                    }
                });
                element.bind('blur', function(e) {
                    if (scope.onBlur) {
                        $timeout(function() {
                            scope.onBlur();
                        });
                    }
                });
                element.bind('keydown', function(e) {
                    if (e.which == 13) {
                        if (scope.returnClose) element[0].blur();
                        if (scope.onReturn) {
                            $timeout(function() {
                                scope.onReturn();
                            });
                        }
                    }
                });
            }
        }
    })
    .controller('Messages', function($scope, $timeout, $ionicScrollDelegate) {

        $scope.hideTime = true;

        var alternate,
            isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        $scope.sendMessage = function() {
            alternate = !alternate;

            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

            $scope.messages.push({
                userId: '54321',
                text: $scope.data.message,
                time: d
            });
            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);

        };


        $scope.inputUp = function() {
            if (isIOS) $scope.data.keyboardHeight = 216;
            $timeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
            }, 300);

        };

        $scope.inputDown = function() {
            if (isIOS) $scope.data.keyboardHeight = 0;
            $ionicScrollDelegate.resize();
        };

        $scope.closeKeyboard = function() {
            // cordova.plugins.Keyboard.close();
        };


        $scope.data = {};
        $scope.myId = '12345';
        $scope.messages = [{
            userId: "12345",
            text: "Hoi, waarmee kan ik je helpen?",
            time:"Vandaag"

        }];


    })
.controller('DashCtrl', function($scope) {
    $scope.settings = {
        enableDangerNotifications: true,
        enableWaterNotification: false,
        enableElectricityNotification: true
    };

})
    .controller('FeedCtrl', function ($scope, Items) {
        $scope.items = Items;
        $scope.addItem = function () {
            var feed = "De gemeente Dordrecht waarschuwt voor hoogwater. Het water in de rivieren rondom het eiland van Dordt is hoger dan gebruikelijk door een combinatie van Noordwesterstorm op zee en springtij."
            var time = "Recent"
            if (feed) {
                $scope.items.$add({
                    "feed": feed,
                    "time": time
                });
            }
        };
    })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
    .controller("PredictionCtrl", function($scope) {

        $scope.labels = ["30 juni 2017", "1 juli 2017", "2 juli 2017", "3 juli 2017", "4 juli 2017", "5 juli 2017", "6 juli 2017"];
        $scope.series = ['Verwachting'];
        $scope.data = [
            [2.11, 2.14, 1.97, 1.95, 2.05, 2.10, 2.6]
        ];

        $scope.dohnutdata = [1.5, 59, 80, 81, 56, 55, 40];
        $scope.piedata = [65, 59, 80, 81, 56, 55, 40];
        $scope.polardata = [65, 59, 80, 81, 56, 55, 40];

        $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];


        //Globals
        $scope.myChartOptions = {
            // Boolean - Whether to animate the chart
            animation: true,

            // Number - Number of animation steps
            animationSteps: 60,

            // String - Animation easing effect
            animationEasing: "easeOutQuart",

            // Boolean - If we should show the scale at all
            showScale: true,

            // Boolean - If we want to override with a hard coded scale
            scaleOverride: false,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: null,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: null,
            // Number - The scale starting value
            scaleStartValue: null,

            // String - Colour of the scale line
            scaleLineColor: "rgba(0,0,0,.1)",

            // Number - Pixel width of the scale line
            scaleLineWidth: 1,

            // Boolean - Whether to show labels on the scale
            scaleShowLabels: true,

            // Interpolated JS string - can access value
            scaleLabel: "<%=value%>",

            // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
            scaleIntegersOnly: true,

            // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: false,

            // String - Scale label font declaration for the scale label
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Scale label font size in pixels
            scaleFontSize: 12,

            // String - Scale label font weight style
            scaleFontStyle: "normal",

            // String - Scale label font colour
            scaleFontColor: "#666",

            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: true,

            // Boolean - Determines whether to draw tooltips on the canvas or not
            showTooltips: false,

            // Array - Array of string names to attach tooltip events
            tooltipEvents: ["mousemove", "touchstart", "touchmove"],

            // String - Tooltip background colour
            tooltipFillColor: "rgba(0,0,0,0.8)",

            // String - Tooltip label font declaration for the scale label
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip label font size in pixels
            tooltipFontSize: 14,

            // String - Tooltip font weight style
            tooltipFontStyle: "normal",

            // String - Tooltip label font colour
            tooltipFontColor: "#fff",

            // String - Tooltip title font declaration for the scale label
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip title font size in pixels
            tooltipTitleFontSize: 14,

            // String - Tooltip title font weight style
            tooltipTitleFontStyle: "bold",

            // String - Tooltip title font colour
            tooltipTitleFontColor: "#fff",

            // Number - pixel width of padding around tooltip text
            tooltipYPadding: 6,

            // Number - pixel width of padding around tooltip text
            tooltipXPadding: 6,

            // Number - Size of the caret on the tooltip
            tooltipCaretSize: 8,

            // Number - Pixel radius of the tooltip border
            tooltipCornerRadius: 6,

            // Number - Pixel offset from point x to tooltip edge
            tooltipXOffset: 10,

            // String - Template string for single tooltips
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

            // String - Template string for single tooltips
            multiTooltipTemplate: "<%= value %>",

            // Function - Will fire on animation progression.
            onAnimationProgress: function(){},

            // Function - Will fire on animation completion.
            onAnimationComplete: function(){}
        };
    })

    .controller("SensorGraphCtrl", function($scope) {

        $scope.labels = ["23 juni 2017", "24 juni 2017", "25 juni 2017", "26 juni 2017", "27 juni 2017", "28 juni 2017", "29 juni 2017"];
        $scope.series = ['Grondwaterpeil','Richtlijn grondwaterpeil','Grondwaterpeil eigen sensor'];
        $scope.data = [
            [1.91, 2.14, 1.97, 1.83, 1.98, 2.17, 2.6],
            [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0],
            [2.18, 1.94, 2.02, 1.89, 1.90, 2.30, 2.45]
        ];

        $scope.dohnutdata = [1.5, 59, 80, 81, 56, 55, 40];
        $scope.piedata = [65, 59, 80, 81, 56, 55, 40];
        $scope.polardata = [65, 59, 80, 81, 56, 55, 40];

        $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

    })
        .controller("GraphCtrl", function($scope) {

        $scope.labels = ["23 juni 2017", "24 juni 2017", "25 juni 2017", "26 juni 2017", "27 juni 2017", "28 juni 2017", "29 juni 2017"];
        $scope.series = ['Grondwaterpeil'];
        $scope.data = [
            [1.91, 2.14, 1.97, 1.83, 1.98, 2.17, 2.6]
        ];

        $scope.dohnutdata = [1.5, 59, 80, 81, 56, 55, 40];
        $scope.piedata = [65, 59, 80, 81, 56, 55, 40];
        $scope.polardata = [65, 59, 80, 81, 56, 55, 40];

        $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];


        //Globals
        $scope.myChartOptions = {
            // Boolean - Whether to animate the chart
            animation: true,

            // Number - Number of animation steps
            animationSteps: 60,

            // String - Animation easing effect
            animationEasing: "easeOutQuart",

            // Boolean - If we should show the scale at all
            showScale: true,

            // Boolean - If we want to override with a hard coded scale
            scaleOverride: false,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: null,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: null,
            // Number - The scale starting value
            scaleStartValue: null,

            // String - Colour of the scale line
            scaleLineColor: "rgba(0,0,0,.1)",

            // Number - Pixel width of the scale line
            scaleLineWidth: 1,

            // Boolean - Whether to show labels on the scale
            scaleShowLabels: true,

            // Interpolated JS string - can access value
            scaleLabel: "<%=value%>",

            // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
            scaleIntegersOnly: true,

            // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: false,

            // String - Scale label font declaration for the scale label
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Scale label font size in pixels
            scaleFontSize: 12,

            // String - Scale label font weight style
            scaleFontStyle: "normal",

            // String - Scale label font colour
            scaleFontColor: "#666",

            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: true,

            // Boolean - Determines whether to draw tooltips on the canvas or not
            showTooltips: false,

            // Array - Array of string names to attach tooltip events
            tooltipEvents: ["mousemove", "touchstart", "touchmove"],

            // String - Tooltip background colour
            tooltipFillColor: "rgba(0,0,0,0.8)",

            // String - Tooltip label font declaration for the scale label
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip label font size in pixels
            tooltipFontSize: 14,

            // String - Tooltip font weight style
            tooltipFontStyle: "normal",

            // String - Tooltip label font colour
            tooltipFontColor: "#fff",

            // String - Tooltip title font declaration for the scale label
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip title font size in pixels
            tooltipTitleFontSize: 14,

            // String - Tooltip title font weight style
            tooltipTitleFontStyle: "bold",

            // String - Tooltip title font colour
            tooltipTitleFontColor: "#fff",

            // Number - pixel width of padding around tooltip text
            tooltipYPadding: 6,

            // Number - pixel width of padding around tooltip text
            tooltipXPadding: 6,

            // Number - Size of the caret on the tooltip
            tooltipCaretSize: 8,

            // Number - Pixel radius of the tooltip border
            tooltipCornerRadius: 6,

            // Number - Pixel offset from point x to tooltip edge
            tooltipXOffset: 10,

            // String - Template string for single tooltips
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

            // String - Template string for single tooltips
            multiTooltipTemplate: "<%= value %>",

            // Function - Will fire on animation progression.
            onAnimationProgress: function(){},

            // Function - Will fire on animation completion.
            onAnimationComplete: function(){}
        };
    })

    .controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
