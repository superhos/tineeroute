var fs = require('fs');
var path = require("path");

//Public API
module.exports = {
    loadDirectory: loadDirectory,
    loadFile: loadFile
};

function loadRouteObj(app, prefix, file, options) {
    if(file.indexOf('.js') !== file.length - 3){
        options.logger.warn("Ignoring file because it doesn't end with .js", {
            prefix: prefix,
            file: file
        });
        return;
    }

    var routeObj = require(file).tineeroute;

    if (!routeObj) {
        options.logger.warn("Couldn't find route object for file. Does not expose route api.", {
            file: file
        });
        console.log("Couldn't find route object for file. Does not expose route api.");
        return;
    }

    for (var method in routeObj.prototype) {

        //Defined Function 
        var func = routeObj.prototype[method];
        if (!func) {
            throw new Error("Couldn't load route object for file. Not defined correctly.");
        }
        //Get the Arguments from the function
        var args = getArgs(func.toString());
        
        //Check the type GET/POST
        var callargs = [prefix + '/' + method];

        callargs.push(func);
        //bind express app
        options.logger.debug("creating endpoint: " + prefix + method);
        app['all'].apply(app,callargs);
    }
}

//get all the arguments from the function.
function getArgs(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    //var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null)
        result = [];
    return result;
}

function splitTypeName(funcname){
    if (funcname.indexOf('get') == 0){
        return ['get',funcname.split('get')[1]];
    }else{
        return ['post',funcname.split('post')[1]];
    }
}

function loadDirectory(dirPath, prefix, app, options) {
    var currentFolder = dirPath + (prefix ? prefix : "");
    options.logger.debug("Current Folder: " + currentFolder);

    var files = fs.readdirSync(currentFolder);


    files.forEach(function(path) {
        var stats = fs.statSync(currentFolder + "/" + path);


        if (stats.isDirectory()) {
            loadDirectory(dirPath, prefix + "/" + path, app, options);
        }
        else {
            loadFile(currentFolder + "/" + path, prefix, app, options);
        }
    });
}

var dotFileMatch = new RegExp(/\/\.[^/]*$/);

function loadFile(file, prefix, app, options) {

    if (dotFileMatch.test(file)){
        options.logger.info("Ignoring this file", {
            file: file
        })
        return; //ignore dot files
    }

    try {
        try {
            loadRouteObj(app, prefix, file, options);
        }
        catch (e) {
            options.logger.error("Error autoloading routes. ", {
                error: e.message,
                file: file
            });
            // options.logger.error(e.stack);
            if (options.throwErrors) {
                throw new Error("Error autoloading routes");
            }
        }

    }
    catch (e) {
        options.logger.error("Error loading file: " + file);
        options.logger.error(e.stack);
        if (options.throwErrors) {
            throw new Error("Error loading file: " + file);
        }

    }
}
