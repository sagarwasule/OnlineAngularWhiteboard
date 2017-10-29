"use strict";
define(['application-configuration'],
    function () {

        var app = angular.module('ToasterService', ['toaster']);

        app.service('toasterMessageService', ['toaster',
        function (toaster) {

            this.SetValidationErrors = function (scope, validationErrors) {

                for (var prop in validationErrors) {
                    var property = prop + "InputError";
                    scope[property] = true;
                }

            };

            this.ShowErrorToast = function (message, toasterid, title) {

                var messageBox = formatMessage(message);
                toaster.clear();
                var toasterTitle = "";
                var id = 1;
                if (toasterid) {
                    id = toasterid;
                }
                if (title)
                    toasterTitle = title;
                toaster.pop({ type: "error", title: toasterTitle, body: messageBox, toasterId: id });

            };

            this.ShowStickyErrorToast = function (message, toasterid, title) {

                var messageBox = formatMessage(message);
                toaster.clear();
                var toasterTitle = "";
                var id = 1;
                if (toasterid) {
                    id = toasterid;
                }
                if (title)
                    toasterTitle = title;
                toaster.pop({ type: "error", title: toasterTitle, body: messageBox, toasterId: id, timeout: 0 });

            };

            this.ShowSuccessToast = function (message, toasterid, title) {

                var messageBox = formatMessage(message);
                toaster.clear();
                var toasterTitle = "";
                var id = 1;
                if (toasterid) {
                    id = toasterid;
                }
                if (title)
                    toasterTitle = title;
                toaster.pop({ type: "success", title: toasterTitle, body: messageBox, toasterId: id });
            };

            this.ShowWarningToast = function (message, toasterid, title) {

                var messageBox = formatMessage(message);
                toaster.clear();
                var toasterTitle = "";
                var id = 1;
                if (toasterid) {
                    id = toasterid;
                }
                if (title)
                    toasterTitle = title;
                toaster.pop({ type: "warning", title: toasterTitle, body: messageBox, toasterId: id });
            };

            this.ShowInfoToast = function (message, toasterid, title) {
                var messageBox = formatMessage(message);
                toaster.clear();
                var toasterTitle = "";
                var id = 1;
                if (toasterid) {
                    id = toasterid;
                }
                if (title)
                    toasterTitle = title;
                toaster.pop({ type: "info", title: toasterTitle, body: messageBox, toasterId: id });
            };

            function formatMessage(message) {
                var messageBox = "";
                if (angular.isArray(message) == true) {
                    for (var i = 0; i < message.length; i++) {
                        messageBox = messageBox + message[i] + "<br/>";
                    }
                } else {
                    messageBox = message;
                }

                return messageBox;

            }
        }]);
    });
