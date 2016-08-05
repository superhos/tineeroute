var tineeroute = require('../');

var express = require('express');
var request = require('supertest');

var app;
var server;

describe('No Net Test', function(){
	before(function(){
		var path = require('path');
		app = express();

		tineeroute(app, {
			throwErrors: true,
			logger: require('winston'),
			routesDir: [path.join(process.cwd(), "test", "routes")
					,path.join(process.cwd(), "test2", "routes")]
		});

		server = app.listen(2558);
	});
	after(function(done){
		app = null;
		server.close(done);
	});
	describe('test.js', function(){
		it('should return "get" from /getTest', function(done){
			request(app).get('/getTest').expect(200).expect("get").end(done);
		});
		it('should return "1" from /getTestById?id=1', function(done){
			request(app).get('/getTestById?id=1').expect(200).expect("1").end(done);
		});
		it('should return "1" from /postTest', function(done){
			request(app).get('/postTest').expect(200).expect("post").end(done);
		});
	});
	describe('/test2/test.js', function(){
		it('should return "get" from /test2/getTest', function(done){
			request(app).get('/test2/getTest').expect(200).expect("get").end(done);
		});
		it('should return "1" from /test2/getTestById?id=1', function(done){
			request(app).get('/test2/getTestById?id=1').expect(200).expect("1").end(done);
		});
	});
	describe('/test3/test.js', function(){
		it('should return "get3" from /test3/getTest3', function(done){
			request(app).get('/test3/getTest3').expect(200).expect("get3").end(done);
		});
	});
});
