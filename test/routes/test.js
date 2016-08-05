module.exports.tineeroute = testRoute;

function testRoute(){

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