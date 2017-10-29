define(['application-configuration'], function (app) {
    app.register.controller('404Controller', ['$scope', function ($scope) {
        console.log("404Controller");
    }]);
});