    
require.config({
    baseUrl: "",
    urlArgs: "v=1.0",
    waitSeconds: 60,
    // alias libraries paths
    paths: {
        'application-configuration': 'application-configuration',
        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.5.1/angular',
        'angularAMD': '_dependantLibs/angularjs/angularAMD.min',
        'angular-sanitize': '_dependantLibs/angularjs/angular-sanitize.min',
        'angular-cookies': '_dependantLibs/angularjs/angular-cookies.min',
        'angular-animate': '_dependantLibs/angularjs/angular-animate.min',
        'angular-translate': '_dependantLibs/angularjs/angular-translate.min',
        'bootstrap': '_dependantLibs/bootstrap/js/bootstrap.min',
        'ui-bootstrap': '_dependantLibs/ui-bootstrap/ui-bootstrap-tpls-2.5.0.min',
        'underScoreJs': '_dependantLibs/underscorejs/underscore-min',
        'toaster': '_dependantLibs/angular-toaster/toaster.min',
        'blockUI': '_dependantLibs/angular-block-ui/angular-block-ui.min',
        'angularticsgoogle': '_dependantLibs/angular-google-analytics/angular-google-analytics.min',
        'angular-ui-router': '_dependantLibs/ui-router/angular-ui-router.min',
        'angular-css': '_dependantLibs/angular-css/angular-css.min',
        'moment': '_dependantLibs/momentjs/moment-with-locales',
        'angular-moment': '_dependantLibs/momentjs/angular-moment.min',

        'app-routes': 'app/configs/app-routes',
        'app-constants': 'app/configs/app-constants',
        'app-config': 'app/configs/app-config',
        'ajax-service': 'app/utils/ajax-service',
        'cookie-service': 'app/utils/cookie-service',
        'app-datasharing-service': 'app/utils/app-datasharing-service',
        'app-redirect-service': 'app/utils/app-redirect-service',
        'block-ui-service': 'app/utils/block-ui-service',
        'cache-service': 'app/utils/cache-service',
        'confirm-modal-service': 'app/utils/confirm-modal-service',
        'rest-resources': 'app/utils/rest-resources',
        'toaster-message-service': 'app/utils/toaster-message-service',
        'utility': 'app/utils/utility',

        'whiteboardDirective': 'app/modules/whiteboard/directives/whiteboardDirective',
        'whiteboardHubService': 'app/modules/whiteboard/services/whiteboardHubService'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-cookies': ['angular'],
        'ui-bootstrap': ['angular'],
        'angular-animate': ['angular'],
        'underScoreJs': ['angular'],
        'toaster': ['angular'],
        'angular-translate': ['angular'],
        'blockUI': ['angular'],
        'angularticsgoogle': ['angular'],
        'moment': ['angular'],
        'angular-moment': ['angular', 'moment'],
        'angular-ui-router': ['angular'],
        'angular-css': ['angular'],

        'app-datasharing-service': ['angular']
    },

    // kick start application
    deps: ['application-configuration']
});
