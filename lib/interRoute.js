var fs = require('fs');
var path = require("path");

var inRoute = createInterRoute();

function handleRoute(req,res,next){
    inRoute.handleRoute(req,res,next);
}

function interRoute(){
    this.routes = [];
    this.routesKV = {};
}

interRoute.prototype.addRoute = function(mapRoute){
    this.routes.push(mapRoute);
    return this;
};

interRoute.prototype.handleRoute = function(req,res,next){
    var path = req.path;
    for (var i = this.routes.length - 1; i >= 0; i--) {
        if (this.routes[i][0] == path){
            var obj = this.routes[i][3];
            if (typeof this.routesKV[this.routes[i][2]+obj.name] !== "undefined"){
                var routeObj = this.routesKV[this.routes[i][2]+obj.name];
            }else{
                var routeObj = new obj();
                this.routesKV[this.routes[i][2]+obj.name] = routeObj;
            }
            routeObj[this.routes[i][1]](req,res,next);
        }
    }
    return this;
}

function createInterRoute(){
    return new interRoute();   
}

//Public API
module.exports = { 
    interRoute : inRoute,
    handleRoute : handleRoute
}
