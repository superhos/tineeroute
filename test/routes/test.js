module.exports.tineeroute = testRoute;

function testRoute(req,res,next){

}

testRoute.prototype = {

  getTest: function(req,res,next){
  	res.send('get');
  },

  getTestById: function(req,res,next){
  	res.send(req.query.id);
  },

  postTest: function(req,res,next){
    res.send('post22');
  },

  index: function(req,res,next){
  	res.send('1');
  	// this.postTest(req,res,next);
  }
};