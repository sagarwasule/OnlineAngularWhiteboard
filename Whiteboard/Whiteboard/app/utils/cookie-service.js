"use strict";
define(['application-configuration'],
    function () {

        var app = angular.module('CookieService', []);

        app.service("cookieService", ['$cookies', 'CookieKeyConfig', function ($cookies, CookieKeyConfig) {
            this.get = function (key) {
                return $cookies.getObject(key);
            };

            this.put = function (key, value, options) {
                if (angular.isUndefined(options))
                    options = { secure: CookieKeyConfig.isSecured };
                else
                    options = angular.extend(options, { secure: CookieKeyConfig.isSecured });
                $cookies.putObject(key, value, options);
            };

            this.putPermanent = function (key, value) {
                var self = this;
                //ToDo
                //var cookieOptions = { expires: util.addDaysToDate(new Date(), CookieKeyConfig.permanentCookieExpiryDays) };
                var cookieOptions = { expires: new Date() };
                self.put(key, value, cookieOptions);
            };

            this.remove = function (key) {
                $cookies.remove(key);
            };

        }]);


    });
