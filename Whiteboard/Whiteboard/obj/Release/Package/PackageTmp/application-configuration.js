"use strict";

define(['angularAMD', 'angular-sanitize', 'angular-ui-router', 'angular-css', 'blockUI', 'ui-bootstrap',
    'angular-translate', 'angular-animate', 'toaster', 'angular-cookies', 'app-routes', 'app-constants',
    'app-config', 'ajax-service', 'cookie-service', 'app-datasharing-service', 'app-redirect-service',
    'block-ui-service', 'cache-service', 'confirm-modal-service', 'rest-resources', 'toaster-message-service',
    'utility', 'whiteboardDirective'], //, 'whiteboardHubService'
    function (angularAMD) {

        var underscore = angular.module('underscore', [])
                                .factory('_', ['$window', function ($window) {
                                    return $window._;
                                }]);

        var app = angular.module("App", ['ui.router', 'ngAnimate', 'ngSanitize', 'angularCSS', 'pascalprecht.translate',
                        'toaster', 'ui.bootstrap', 'ngCookies', 'AppRoutes', 'AppConstants', 'DataSharingService',
                        'AppConfig', 'blockUI', 'AjaxService', 'CookieService', 'BlockUiService',
                        'ToasterService', 'ConfirmModalService', 'WhiteboardCanvasControl', 'WhiteboardHub', 'utility']);

        app.config(['$stateProvider', '$urlRouterProvider', 'appRouteConfig', 'appVersion', '$translateProvider',
            '$compileProvider', '$locationProvider', 'blockUIConfig', 'blockUIConfiguration',
                function ($stateProvider, $urlRouterProvider, appRouteConfig, appVersion, $translateProvider,
                    $compileProvider, $locationProvider, blockUIConfig, blockUIConfiguration) {

                    /**** debugging needs to be enabled for batarang and testing tools like protractor. But in production debugging should be disabled */
                    $compileProvider.debugInfoEnabled(false);

                    // Enable escaping of HTML
                    $translateProvider.useSanitizeValueStrategy('sanitize');
                    $translateProvider.useLoader('customTranslationLoader', { prefix: "resources/locale-", suffix: ".json?v=" + appVersion });

                    $locationProvider.hashPrefix();

                    appRouteConfig($stateProvider, $urlRouterProvider, appVersion, angularAMD);

                    blockUIConfiguration(blockUIConfig);

                }]);

        app.run(['$rootScope', '$translate', 'cookieService', 'CookieKeyConfig',
            function ($rootScope, $translate, cookieService, CookieKeyConfig) {


                if (cookieService.get(CookieKeyConfig.languageKey) != undefined) {
                    var userLang = cookieService.get(CookieKeyConfig.languageKey).split('-')[0]; //Browser locale format is - xx-XX, need only the xx part.
                    $translate.use(userLang);
                    //amMoment.changeLocale(userLang);//Set lang of moment 
                    $rootScope.selectedLanguage = userLang === "en" ? 1 : 0;
                }
                else if (cookieService.get(CookieKeyConfig.tempLangSelected) != undefined || (cookieService.get(CookieKeyConfig.tempLangSelected) != null)) {
                    var lang = cookieService.get(CookieKeyConfig.tempLangSelected);
                    $translate.use(lang);
                    //amMoment.changeLocale(lang);
                    $rootScope.selectedLanguage = lang === "en" ? 1 : 0;
                }
                else {
                    var userLang = navigator.languages ? navigator.languages[0].split('-')[0] : (navigator.language.split('-')[0] || navigator.userLanguage);
                    if (userLang === "en" || userLang === "nl") {
                        $translate.use(userLang);
                        //amMoment.changeLocale(userLang);
                        $rootScope.selectedLanguage = userLang === "en" ? 1 : 0;
                        cookieService.putPermanent(CookieKeyConfig.tempLangSelected, userLang);
                    } else {
                        var userLang = "en";
                        $translate.use(userLang);
                        //amMoment.changeLocale(userLang);
                        $rootScope.selectedLanguage = userLang === "en" ? 1 : 0;
                        cookieService.putPermanent(CookieKeyConfig.tempLangSelected, userLang);
                    }
                }

            }]);

        app.controller('appController', ['$scope', '$timeout', '$filter', 'blockUIService', 'cookieService',
            'confirmModalService', 'toasterMessageService', 'dataSharingService',
            function ($scope, $timeout, $filter, blockUIService, cookieService,
                confirmModalService, toasterMessageService, dataSharingService) {

                console.log("This is appController");

                $scope.initializeController = function () {

                    //Testing
                    //blockUIService.startBlocking();
                    //cookieService.put("key1", "data1");
                    //$scope.somedata = "test data";
                    //dataSharingService.setData('TempData', "This is temp data");
                    //$timeout(function () {
                    //    // Stop the block after some async operation.
                    //    blockUIService.stopBlocking();
                    //}, 20000);
                };
                
            }]);

        app.factory('customTranslationLoader', ['$http', '$q', function ($http, $q) {

            return function (options) {

                if (!options || (!angular.isArray(options.files) && (!angular.isString(options.prefix) || !angular.isString(options.suffix)))) {
                    throw new Error('Couldn\'t load static files, no files and prefix or suffix specified!');
                }

                if (!options.files) {
                    options.files = [{
                        prefix: options.prefix,
                        suffix: options.suffix
                    }];
                }

                var load = function (file) {
                    if (!file || (!angular.isString(file.prefix) || !angular.isString(file.suffix))) {
                        throw new Error('Couldn\'t load static file, no prefix or suffix specified!');
                    }

                    var deferred = $q.defer();

                    $http(angular.extend({
                        url: [
                          file.prefix,
                          options.key,
                          file.suffix
                        ].join(''),
                        method: 'GET',
                        params: ''
                    }, options.$http)).success(function (data) {
                        deferred.resolve(data);
                    }).error(function (data) {
                        deferred.reject(options.key);
                    });

                    return deferred.promise;
                };

                var deferred = $q.defer(),
                    promises = [],
                    length = options.files.length;

                for (var i = 0; i < length; i++) {
                    promises.push(load({
                        prefix: options.files[i].prefix,
                        key: options.key,
                        suffix: options.files[i].suffix
                    }));
                }

                $q.all(promises).then(function (data) {
                    var length = data.length,
                        mergedData = {};

                    for (var i = 0; i < length; i++) {
                        for (var key in data[i]) {
                            mergedData[key] = data[i][key];
                        }
                    }

                    deferred.resolve(mergedData);
                }, function (data) {
                    deferred.reject(data);
                });

                return deferred.promise;
            };
        }]);

        /* Bootstrap Angular when DOM is ready */
        angularAMD.bootstrap(app, true, undefined, {
            strictDi: false
        });

        return app;
    });
