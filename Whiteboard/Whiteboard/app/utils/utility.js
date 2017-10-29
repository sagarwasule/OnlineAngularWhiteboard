define(['application-configuration'], function (app) {

    var utility = angular.module("utility", []);


    utility.factory("util", ['$window', '$location', function ($window, $location) {

        function generateRandomId() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i <= 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text.toLowerCase();
        }

        return {
            generateRandomId: generateRandomId
        };
    }]);

    return utility;
});