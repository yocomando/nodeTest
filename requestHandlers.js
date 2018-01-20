const exec = require("child_process");
const querystring = require('querystring'),
    fs = require('fs'),
    sys = require('util');
var formidable = require("formidable");

function start(response, request) {
    console.log("Appel de start.");
    // response.write("Hello start");
    response.writeHead(200, {"Content-Type": "text/html"});
    // var body =
    //     '<html>' +
    //     '<head>' +
    //     '<meta http-equiv="Content-Type" content="text/html; ' +
    //     'charset=UTF-8" />' +
    //     '</head>' +
    //     '<body>' +
    //     '<form action="/upload" method="post">' +
    //     '<textarea name="text" rows="20" cols="60"></textarea>' +
    //     '<input type="submit" value="Envoyer" />' +
    //     '</form>' +
    //     '</body>' +
    //     '</html>';

    var body =
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" ><br>' +
        '<input type="submit" value="Upload">' +
        '</form>';
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Appel de upload.");

    // postData = querystring.parse(postData).text;
    // var body = sys.inspect({fields: postData["fields"], files: postData["files"]});

    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
        if (!err) {
            fs.rename(files.upload.path, './test-banniere-mail.png', function (err) {
                if (err) {
                    fs.unlink("./test-banniere-mail.png");
                    fs.rename(files.upload.path, './test-banniere-mail.png');
                }
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write("l'upload est un succès !<br><a href='/show'> voir l'image ici !</a>");
                response.end();
            });
        }
    });



}

function show(response, request) {
    console.log("Appel de show.");
    fs.readFile("test-banniere-mail.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;