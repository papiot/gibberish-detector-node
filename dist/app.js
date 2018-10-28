'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//we assume the text ends in [xxxxx]
var parseGibberishAnswer = function parseGibberishAnswer(stdout) {
    var max = stdout.length - 2;

    for (var i = max; i >= 0; i--) {
        if (stdout[i] === '[') {
            var substr = stdout.substring(i, max + 1);
            return substr;
        }
    }
};

var isGibberish = function isGibberish(textToTest) {
    return new Promise(function (resolve, reject) {
        (0, _child_process.exec)('nostril "' + textToTest + '"', function (error, stdout, stderr) {
            if (error) {
                console.log(error);
                console.log("An error has occured");
                return reject(Error("An error has occured"));
            }

            if (stdout) {
                return resolve(parseGibberishAnswer(stdout));
            }

            if (sterr) {
                console.log(stderr);
                return reject(Error("Stderror: " + stderr));
            }
        });
    });
};

var startServer = function startServer() {
    console.log("woot");
};

startServer();

isGibberish("jklasdjf;kl;lkk;lwerjkljkljk jkl///").then(function (textGibberishResult) {
    console.log(textGibberishResult);
}).catch(function (message) {
    console.log("Something went wrong: " + message);
});