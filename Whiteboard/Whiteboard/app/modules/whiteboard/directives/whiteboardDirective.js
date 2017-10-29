define(['application-configuration', 'whiteboardHubService'], function (app) {
    var module = angular
        .module('WhiteboardCanvasControl', [])
        .directive("whiteboardCanvas", ['whiteboardHubService', function (whiteboardHubService) {
            return {
                restrict: 'E',
                scope: {
                    shareToken: '=',
                    clientId: '='
                },
                template: '<canvas id="scope.canvas" style="cursor: crosshair; position: fixed; border : solid;">' +
                            'Sorry, your browser does not support HTML5 canvas technology.' +
                           '</canvas>',
                link: function (scope, element, attr) {

                    whiteboardHubService.handleDraw(scope.imgdata, scope.shareToken, scope.clientId, handlecanvas);

                    whiteboardHubService.joinGroup(scope.shareToken);

                    function DrawObject() {

                    }

                    var DrawState =
                    {
                        Started: 0,
                        Inprogress: 1,
                        Completed: 2
                    }

                    function updatecanvas() {
                        scope.context.drawImage(scope.canvas, 0, 0);
                    }

                    function handlecanvas(message) {
                        console.log("handlecanvas --- " + message);
                        if (message) {
                            var drawObjectCollection = jQuery.parseJSON(message)
                            for (var i = 0; i < drawObjectCollection.length; i++) {
                                DrawIt(drawObjectCollection[i], false);
                            }
                        }
                    }

                    function DrawIt(drawObject, syncServer) {

                        switch (drawObject.currentState) {
                            case DrawState.Started:
                                scope.context.beginPath();
                                scope.context.moveTo(drawObject.StartX, drawObject.StartY);
                                break;
                            case DrawState.Inprogress:
                            case DrawState.Completed:
                                scope.context.lineTo(drawObject.CurrentX, drawObject.CurrentY);
                                scope.context.stroke();
                                if (drawObject.currentState == DrawState.Completed) {
                                    updatecanvas();
                                }
                                break;
                        }

                        if (syncServer) {
                            var message = JSON.stringify(drawObjectsCollection);
                            whiteboardHubService.sendToWhiteboardGroup(message, scope.shareToken, scope.clientId);
                        }
                    }

                    scope.canvas = element.find('canvas')[0];
                    scope.context = scope.canvas.getContext('2d');

                    scope.canvas.width = 450;
                    scope.canvas.height = 450;

                    // Set Background Color
                    scope.context.fillStyle = "#fff";
                    scope.context.fillRect(0, 0, scope.canvas.width, scope.canvas.height);

                    // Mouse Event Handlers
                    if (scope.canvas) {
                        var isDown = false;
                        var canvasX, canvasY;
                        scope.context.lineWidth = 2;

                        drawObjectsCollection = [];

                        $(scope.canvas)
                        .mousedown(function (ev) {
                            isDown = true;
                            canvasX = ev.pageX - scope.canvas.offsetLeft;
                            canvasY = ev.pageY - scope.canvas.offsetTop;

                            var drawObject = new DrawObject();
                            drawObject.currentState = DrawState.Started;
                            drawObject.StartX = canvasX;
                            drawObject.StartY = canvasY;
                            DrawIt(drawObject, true);
                            drawObjectsCollection.push(drawObject);
                        })
                        .mousemove(function (ev) {
                            if (isDown !== false) {
                                canvasX = ev.pageX - scope.canvas.offsetLeft;
                                canvasY = ev.pageY - scope.canvas.offsetTop;

                                var drawObject = new DrawObject();
                                drawObject.currentState = DrawState.Inprogress;
                                drawObject.CurrentX = canvasX;
                                drawObject.CurrentY = canvasY;
                                DrawIt(drawObject, true);
                                drawObjectsCollection.push(drawObject);
                            }
                        })
                        .mouseup(function (ev) {
                            if (isDown !== false) {

                                var drawObject = new DrawObject();
                                drawObject.currentState = DrawState.Completed;
                                drawObject.CurrentX = ev.pageX - scope.canvas.offsetLeft;
                                drawObject.CurrentY = ev.pageY - scope.canvas.offsetTop;
                                DrawIt(drawObject, true);
                                drawObjectsCollection.push(drawObject);

                                var message = JSON.stringify(drawObjectsCollection);
                                whiteboardHubService.sendToWhiteboardGroup(message, scope.shareToken, scope.clientId);
                            }
                            isDown = false;
                        })
                        .mouseout(function (ev) {
                            if (isDown !== false) {
                            
                                var message = JSON.stringify(drawObjectsCollection);
                                whiteboardHubService.sendToWhiteboardGroup(message, scope.shareToken, scope.clientId);

                            }
                            isDown = false;
                        });
                    }

                    // Touch Events Handlers
                    draw = {
                        started: false,
                        start: function (evt) {

                            //scope.context.beginPath();
                            //scope.context.moveTo(
                            //    evt.touches[0].pageX,
                            //    evt.touches[0].pageY
                            //);

                            var drawObject = new DrawObject();
                            drawObject.currentState = DrawState.Started;
                            drawObject.CurrentX = evt.touches[0].pageX;
                            drawObject.CurrentY = evt.touches[0].pageY;
                            DrawIt(drawObject, true);
                            drawObjectsCollection.push(drawObject);

                            this.started = true;

                        },
                        move: function (evt) {

                            if (this.started) {
                                //scope.context.lineTo(
                                //    evt.touches[0].pageX,
                                //    evt.touches[0].pageY
                                //);

                                //scope.context.strokeStyle = "#000";
                                //scope.context.lineWidth = 5;
                                //scope.context.stroke();

                                var drawObject = new DrawObject();
                                drawObject.currentState = DrawState.Inprogress;
                                drawObject.CurrentX = evt.touches[0].pageX;
                                drawObject.CurrentY = evt.touches[0].pageY;
                                DrawIt(drawObject, true);
                                drawObjectsCollection.push(drawObject);
                            }
                        },
                        end: function (evt) {
                            this.started = false;

                            var drawObject = new DrawObject();
                            drawObject.currentState = DrawState.Completed;
                            drawObject.CurrentX = evt.touches[0].pageX;
                            drawObject.CurrentY = evt.touches[0].pageY;
                            DrawIt(drawObject, true);
                            drawObjectsCollection.push(drawObject);

                            var message = JSON.stringify(drawObjectsCollection);
                            whiteboardHubService.sendToWhiteboardGroup(message, scope.shareToken, scope.clientId);

                        }
                    };

                    // Touch Events
                    scope.canvas.addEventListener('touchstart', draw.start, false);
                    scope.canvas.addEventListener('touchend', draw.end, false);
                    scope.canvas.addEventListener('touchmove', draw.move, false);
                }
            };
        }]);
});