"use strict";
define(['application-configuration'],
    function () {

        var app = angular.module('AppConstants', []);

        app.constant("appVersion", "1.0");
        app.constant("apiBaseUrl", "http://localhost:22411/");
        app.constant("CookieKeyConfig", {
            isSecured: false,
            permanentCookieExpiryDays: 30,
            authKey: "authCookie",
            analyticsId: "gaId",
            languageKey: "languageCookie",
            cookieUsageAgreement: "cookieUsageAgreement"
        });

        app.constant("DefaultConfig", {
            authHeader: "Authorization",
            languages: ["en"],
        });
    });
