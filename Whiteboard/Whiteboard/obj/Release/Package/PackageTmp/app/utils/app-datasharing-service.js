"use strict";
define(['application-configuration'],
    function () {

        var app = angular.module('DataSharingService', []);

        app.service('dataSharingService', [ function () {
            var obj = {};

            this.getData = function (parameter) {
                return obj[parameter];
            }

            this.setData = function (parameter, data) {
                obj[parameter] = data;
            }

            this.clearData = function (parameter) {
                obj[parameter] = undefined;
            }

        }]);

    });
