"use strict";
define(['application-configuration'],
    function () {

        var app = angular.module('BlockUiService', []);

        app.factory("blockUIService", ['blockUI', function (blockUI) {
            return {
                startBlocking: function () {
                    blockUI.start();
                },
                stopBlocking: function () {
                    blockUI.stop();
                }
            };
        }])


    });
