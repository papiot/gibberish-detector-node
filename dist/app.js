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
    console.log("Gibberish API started...");

    app.use(_bodyParser2.default.urlencoded({ extended: false }));
    app.use(_bodyParser2.default.json());

    app.post('/test-gibberish', function (req, res) {
        var phraze = req.body.my_text_to_analyze;
        isGibberish(phraze).then(function (textGibberishResult) {
            res.write(textGibberishResult);
            res.end();
        }).catch(function (error) {
            res.write("Something went wrong: " + error);
        });
    });

    app.listen(4001, function () {
        return console.log('Server started on port 4001');
    });
};

startServer();

// isGibberish("jklasdjf;kl;lkk;lwerjkljkljk jkl///")
//     .then( (textGibberishResult) => {
//         console.log(textGibberishResult)
//     } )
//     .catch( (message) => {
//         console.log("Something went wrong: " + message)
//     })