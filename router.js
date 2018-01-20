function route(handle, pathname, response, request) {
    console.log("début du traitement de l'URL " + pathname + ".");
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response, request);
    } else {
        console.log("Aucun gestionnaire associé à "+ pathname +".");
        // handle["/"]();
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 non trouver");
        response.end();

    }
}

exports.route = route;