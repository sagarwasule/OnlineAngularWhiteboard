"use strict";
define(['application-configuration'],
    function () {
        var app = angular.module('WhiteboardHub', []);

        app.service('whiteboardHubService', [function () {
            var whiteboardHub;

            this.initHub = function () {
                //$.connection.hub.url = 'http://localhost:12211/signalR/hubs';

                whiteboardHub = $.connection.onlineHub;
                console.log("Init");
            }

            this.joinGroup = function (sessionToken) {

                $.connection.hub.start().done(function () {
                    whiteboardHub.server.joinGroup(sessionToken);
                })
                .fail(function (err) {
                    console.log('Could not Connect! --- ' + err);
                });

            }

            this.sendToWhiteboardGroup = function (message, sessionToken, clientId) {
                
                $.connection.hub.start().done(function () {
                    whiteboardHub.server.sendDraw(message, sessionToken, clientId);
                    //console.log("send draw -- " + clientId);
                })
                .fail(function (err) {
                    console.log('Could not Connect! --- ' + err);
                });

            }

            this.handleDraw = function (sessionToken, currentclientId, updatecanvas) {

                whiteboardHub = $.connection.onlineHub;
                whiteboardHub.client.handleDraw = function (message, clientId) {
                    if (currentclientId != clientId) {
                        //console.log("message -- " + message);
                        //console.log("handle draw -- " + currentclientId + " ---- " + clientId);
                        updatecanvas(message);
                    }
                }
            }

        }]);
    });
