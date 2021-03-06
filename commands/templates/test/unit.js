define(function(require) {
	var registerSuite = require('intern!object'),
		assert = require('intern/chai!assert'),
		Wee = require('Wee');

	registerSuite({
		name: '{{ name }}',

		setup: function() {
			// Execute before suite starts
		},

		teardown: function() {
			// Execute after suite ends
		},

		beforeEach: function() {
			// Execute before each test
		},

		afterEach: function() {
			// Execute after each test
		},

		'{{ name }} Test': function() {
			var val = 'string';

			assert.equal(val, 'string',
				'The val variable should equal "string"'
			);
		}
	});
});