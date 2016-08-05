module.exports.tineeroute = testRoute;

function testRoute(req,res,next){
	console.log(req.path);
	var func = req.path.split('/')[1];
	var efunc = eval(func);
	efunc(req,res,next);
	// this[func](req,res,next);
}

testRoute.prototype = {

  getTest: function(req,res,next){
  	res.send('get');
  },

  getTestById: function(req,res,next){
  	res.send(req.query.id);
  },

  postTest: function(req,res,next){
    res.send('post');
  }
};