"use strict";
define(['application-configuration'],
    function (app) {

        angular.module("AppRoutes", [])
            .constant('appRouteConfig', function ($stateProvider, $urlRouterProvider, appVersion, angularAMD) {

                $urlRouterProvider.when('', '/Home');
                $urlRouterProvider.otherwise('404');

                $stateProvider
                    .state("Default", angularAMD.route({
                        url: "/",
                        redirectTo: "Login"
                    }))
                    .state('Master', angularAMD.route({
                        templateUrl: function ($stateParams) {
                            return 'app/master/layout.html?v=' + appVersion;
                        },
                        resolve: {
                            loadController: [
                                '$q', '$stateParams', '$rootScope',
                                function ($q, $stateParams, $rootScope) {
                                    var controllerName = "app/master/layoutController";

                                    var deferred = $q.defer();

                                    require([controllerName], function () {
                                        $rootScope.$apply(function () {
                                            deferred.resolve();
                                        });
                                    });

                                    return deferred.promise;
                                }
                            ]
                        }
                    }))
                    .state("404", angularAMD.route({
                        url: "/404",
                        pageTitle : 'Not found',
                        parent: 'Master',
                        templateUrl: function ($stateParams) {
                            return 'app/modules/notfound/views/404.html?v=' + appVersion;
                        },
                        resolve: {
                            loadController: [
                                '$q', '$stateParams', '$rootScope',
                                function ($q, $stateParams, $rootScope) {
                                    var controllerName = "app/modules/notfound/controller/404Controller";

                                    var deferred = $q.defer();

                                    require([controllerName], function () {
                                        $rootScope.$apply(function () {
                                            deferred.resolve();
                                        });
                                    });

                                    return deferred.promise;
                                }
                            ]
                        }
                    }))
                    .state("NotAuthorised", angularAMD.route({
                        url: "/NotAuthorised",
                        pageTitle: 'Not authorised',
                        parent: 'Master',
                        templateUrl: function ($stateParams) {
                            return 'app/modules/notauthorised/views/notauthorised.html?v=' + appVersion;
                        },
                        resolve: {
                            loadController: [
                                '$q', '$stateParams', '$rootScope',
                                function ($q, $stateParams, $rootScope) {
                                    var controllerName = "app/modules/notauthorised/controller/notauthorisedController";

                                    var deferred = $q.defer();

                                    require([controllerName], function () {
                                        $rootScope.$apply(function () {
                                            deferred.resolve();
                                        });
                                    });

                                    return deferred.promise;
                                }
                            ]
                        }
                    }))
                    .state('Master.Home', angularAMD.route({
                        url: "/Home",
                        parent: 'Master',
                        templateUrl: function ($stateParams) {
                            return 'app/modules/publichome/views/home.html?v=' + appVersion;
                        },
                        resolve: {
                            loadController: [
                                '$q', '$stateParams', '$rootScope',
                                function ($q, $stateParams, $rootScope) {
                                    var controllerName = "app/modules/publichome/controller/homeController";

                                    var deferred = $q.defer();

                                    require([controllerName], function () {
                                        $rootScope.$apply(function () {
                                            deferred.resolve();
                                        });
                                    });

                                    return deferred.promise;
                                }
                            ]
                        }
                    }))
                    .state('Master.Whiteboard', angularAMD.route({
                        url: "/Whiteboard/:ShareToken",
                        parent: 'Master',
                        params: {
                            ShareToken: { squash: true, value: null }
                        },
                        templateUrl: function ($stateParams) {
                            return 'app/modules/whiteboard/views/Whiteboard.html?v=' + appVersion;
                        },
                        resolve: {
                            loadController: [
                                '$q', '$stateParams', '$rootScope',
                                function ($q, $stateParams, $rootScope) {
                                    var controllerName = "app/modules/whiteboard/controller/whiteboardController";

                                    var deferred = $q.defer();

                                    require([controllerName], function () {
                                        $rootScope.$apply(function () {
                                            deferred.resolve();
                                        });
                                    });

                                    return deferred.promise;
                                }
                            ]
                        }
                    }))
                    .state('Master.OnlineWhiteboard', angularAMD.route({
                        url: "/OnlineWhiteboard/:ShareToken",
                        parent: 'Master',
                        params: {
                            ShareToken: { squash: true, value: null }
                        },
                        templateUrl: function ($stateParams) {
                            return 'app/modules/onlinewhiteboard/views/Whiteboard.html?v=' + appVersion;
                        },
                        resolve: {
                            loadController: [
                                '$q', '$stateParams', '$rootScope',
                                function ($q, $stateParams, $rootScope) {
                                    var controllerName = "app/modules/onlinewhiteboard/controller/whiteboardController";

                                    var deferred = $q.defer();

                                    require([controllerName], function () {
                                        $rootScope.$apply(function () {
                                            deferred.resolve();
                                        });
                                    });

                                    return deferred.promise;
                                }
                            ]
                        }
                    }))
                    .state('Login', angularAMD.route({
                        url: "/Login",
                        pageTitle: 'Login',
                        templateUrl: function ($stateParams) {
                            return 'app/modules/account/views/login.html?v=' + appVersion;
                        },
                        resolve: {
                            loadController: [
                                '$q', '$stateParams', '$rootScope',
                                function ($q, $stateParams, $rootScope) {
                                    var controllerName = "app/modules/account/controller/loginController";

                                    var deferred = $q.defer();

                                    require([controllerName], function () {
                                        $rootScope.$apply(function () {
                                            deferred.resolve();
                                        });
                                    });

                                    return deferred.promise;
                                }
                            ]
                        }
                    }));

            });
    });