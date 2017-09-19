const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

//Describe tests
describe('Nesting records', function(){

	beforeEach(function(done){
		mongoose.connection.collections.authors.drop(function(){
			done();
		});
	});


	//Create Tests
	it('Create an author with sub-documents', function(done){
		var neil = new Author({
			name: 'Neil Gaiman',
			books: [{
				title: 'Coraline',
				pages: 300
			}]
		});

		neil.save().then(function(){
			Author.findOne({
				name: 'Neil Gaiman'
			}).then(function(result){
				assert(result.books.length === 1);
				done();
			})
		});
	});

	it('Adds a book to an existing author', function(done){
		var neil = new Author({
			name: 'Neil Gaiman',
			books: [{
				title: 'Coraline',
				pages: 300
			}]
		});

		neil.save().then(function(){
			Author.findOne({
				name: 'Neil Gaiman'
			}).then(function(result){
				//Add a book to the books collection
				result.books.push({
					title: 'American Gods',
					pages: 600
				});

				result.save().then(function(){
					Author.findOne({
						name: 'Neil Gaiman',
					}).then(function(result){
						assert(result.books.length === 2);
						done();
					});	
				});
			});
		});

	});

});