/**
 * Functions to communicate with agents
 */
var fs = require('fs');
var buildHisotry = {};

exports.receiveMsg = function (req, resp, chat) {
    var data = req.body;
    var clientIP = req.connection.remoteAddress;
    var fileName = './db/build/' + data.serviceName + '.json';
    fs.appendFile(fileName, JSON.stringify(data, null, 4) + ',',
        function (error) {
            if (error) {
                var errorContent = JSON.stringify(error);
                console.log(errorContent);
                resp.writeHead(400, {
                    'Content-Type': 'text/json'
                });
                resp.end(errorContent);
            } else {
                resp.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                resp.end();

                chat.publishBuildStatus(buildHisotry);
            }
        });
};
