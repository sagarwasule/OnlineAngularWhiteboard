define(['application-configuration'], function (app) {
    app.register.controller('whiteboardController', ['$scope', '$stateParams', '$location', '$window', 'util',
        function ($scope, $stateParams, $location, $window, util) {
            console.log("WhiteboardCanvasControl");

            $scope.initializeController = function () {

                $scope.testData = "Test Data";
                $scope.clientId = util.generateRandomId();

                if ($stateParams.ShareToken) {
                    $scope.ShareToken = $stateParams.ShareToken;
                } else {
                    $scope.ShareToken = util.generateRandomId();
                }

                $scope.shareUrl = $location.absUrl() + "/" + $scope.ShareToken;
            }

            $scope.openShareUrl = function () {
                $window.open($scope.shareUrl, '_blank');
            }

            $scope.changeSketchBoard = function (type) {
                if (type == "E") {
                    $scope.sketchFill = "red";
                }
                else if (type == "A") {
                    $scope.sketchFill = "blue";
                }
                else {
                    $scope.sketchFill = "#fff"
                }

            }

        }]);
});