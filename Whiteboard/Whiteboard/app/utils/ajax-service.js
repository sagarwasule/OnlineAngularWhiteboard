"use strict";
define(['application-configuration'],
    function () {

        var app = angular.module('AjaxService', []);

        app.service('ajaxService', [
            '$http', '$cookieStore', '$q', 'CookieKeyConfig',
            function ($http, $cookieStore, $q, CookieKeyConfig) {

                this.AjaxPost = function (data, route) {
                    var authCookie = $cookieStore.get(CookieKeyConfig.authKey);
                    return $http.post(route, data, { "headers": { "X-AuthHeader": authCookie } });

                };

                this.AjaxPostWithNoAuthenication = function (data, route, successFunction, errorFunction) {
                    $http.post(route, data).success(function (response, status, headers, config) {
                        successFunction(response, status);
                    }).error(function (response) {
                        errorFunction(response);
                    });

                };

                this.AjaxGet = function (route) {
                    var authCookie = $cookieStore.get(CookieKeyConfig.authKey);
                    return $http({ method: 'GET', url: route, headers: { "X-AuthHeader": authCookie } });

                };

                this.CancellableAjaxGet = function (route) {
                    var httpTimeout = $q.defer();
                    var authCookie = $cookieStore.get(CookieKeyConfig.authKey);
                    var request = $http({ method: 'GET', url: route, timeout: httpTimeout.promise, headers: { "X-AuthHeader": authCookie } });
                    var promise = request.then(function (response) { return response.data; });
                    promise._httpTimeout = httpTimeout;
                    return (promise);
                };

                this.cancelRequest = function (promise) {
                    /* If the promise does not contain a hook into the deferred timeout,
                       the simply ignore the cancel request. */
                    if (promise && promise._httpTimeout && promise._httpTimeout.resolve) {
                        promise._httpTimeout.resolve();

                    }
                };

                this.AjaxGetWithData = function (data, route) {
                    var authCookie = $cookieStore.get(CookieKeyConfig.authKey);
                    return $http({ method: 'GET', url: route, params: data, headers: { "X-AuthHeader": authCookie } });

                };

                this.AjaxPostWithBufferData = function (data, route) {
                    var authCookie = $cookieStore.get(CookieKeyConfig.authKey);
                    return $http.post(route, data,
                    { "headers": { "X-AuthHeader": authCookie }, responseType: "arraybuffer" });
                }

            }
        ]);
    });
