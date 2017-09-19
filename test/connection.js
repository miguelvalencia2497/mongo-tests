const mongoose = require('mongoose');

// ES6 Promise
mongoose.Promise = global.Promise;

// Connecto to the database before tests run
before(function(done){
	// Connect to mongodb
	var connectionPromise = mongoose.connect('mongodb://localhost/testaroo', {
		useMongoClient: true
	});

	connectionPromise.then(function(db){
		console.log('Connection successful');
		done();
	}).catch(function(err){
		console.log('Connection unsuccesful');
	});
});

//Drop the characters collection before each test
beforeEach(function(){
	//Drop the collection
	mongoose.connection.collections.mariochars.drop().then(function(done){
		done();
	});
});