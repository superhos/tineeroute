var loader = require('./lib/autoloader');
var path = require('path');

module.exports = function(app, options) {
    //can use the winston logger
    if (!options.logger || (!(options.logger.debug && typeof options.logger.debug == 'function'))) {
        options.logger = require('winston');
        options.logger.debug('using custom logger');
    } else {
        options.logger.debug('using specified logger')
    }

    if (!options.routesDir && !options.routeFile) {
        options.routesDir = path.join(process.cwd(), "routes");
    }

    if (options.routesDir) {

        options.logger.debug("Loading routes directory", {
            dir: options.routesDir
        });

        for (var i = options.routesDir.length - 1; i >= 0; i--) {
            loader.loadDirectory(options.routesDir[i], "", app, options);
        }
        
    } else if (options.routeFile) {
        options.logger.debug("Loading route file", {
            file: options.routeFile
        });
        loader.loadFile(options.routeFile, "", app, options);
    }


};
