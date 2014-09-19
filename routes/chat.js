/*
 * GET home page.
 */
var socketIO = require('socket.io');

var chat = function (settings) {
    // private properties
    var privateProperties = {};
    privateProperties.server = settings.server;
    privateProperties.users = [];
    privateProperties.io = socketIO(server);

    var _init = function () {
        privateProperties.io.on('connection', function (socket) {
            socket.on('login', function (data) {
                console.log('User [%s] connected', data.username);
                privateProperties.users.push(data.username);
                privateProperties.io.emit('userLogin', {
                    'users': users
                });
            });

            socket.on('disconnect', function () {
                console.log('User [%s] disconnected', socket.id);
            });

            socket.on('message', function (message) {
                privateProperties.io.emit('message', message);
            });
        });
    };

    _init();

    var that = {};
    that.publishBuildStatus = function (buildHistory) {
        privateProperties.io.emit('newBuild', {
            'buildHistory': buildHistory
        });
    };

    return that;
};

exports.chat = chat;