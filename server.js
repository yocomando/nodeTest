var http = require("http");
var url = require("url");
var qs = require("querystring");
var sys = require('util');

function start(route, handle) {
    function onRequest(request, response) {
        // console.log("request recue !")
        // var postData = "";
        var pathname = url.parse(request.url).pathname;
        //
        // if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
        //     // parse a file upload
        //     var form = new formidable.IncomingForm();
        //     form.parse(request, function (err, fields, files) {
        //         if (!err){
        //             route(handle, pathname, response, {"fields":fields, "files":files});
        //         }
        //     });
        // } else {
        //     route(handle, pathname, response, postData);
        // }
        route(handle, pathname, response, request);


    }

    http.createServer(onRequest).listen(4001);
    console.log("demarrage du server");

}

exports.start = start;
