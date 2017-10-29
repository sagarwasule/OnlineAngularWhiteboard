define(['application-configuration'], function (app) {
    app.register.controller('loginController', ['$scope', function ($scope) {
        console.log("loginController");

        $scope.initializeController = function () {
            console.log("This is loginController");
        }
    }]);
});