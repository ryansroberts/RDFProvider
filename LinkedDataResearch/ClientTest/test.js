var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('a suite', function (){

	it('is a test', function (){

		expect(true).to.equal(true);

	})

	it('is an async test', function (done){

		setTimeout(function (){

			expect(true).to.equal(true);
			done();

		})

	});

})