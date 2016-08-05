module.exports.tineeroute = testRoute;

function testRoute(){

}

testRoute.prototype = {
  getTest3: function(req,res,next){
  	res.send('get3');
  },
};