"use strict";
define(['application-configuration'],
    function (app) {

        angular.module("AppConfig", [])
            .constant('blockUIConfiguration', function (blockUIConfig) {

                /* block UI configurations */
                blockUIConfig.autoBlock = false;
                blockUIConfig.autoInjectBodyBlock = false;
                blockUIConfig.templateUrl = "templates/loader.html";

            });
    });