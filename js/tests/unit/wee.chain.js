define(function(require) {
	var registerSuite = require('intern!object'),
		assert = require('intern/chai!assert'),
		$el,
		el;

	require('temp/core.min.js');

	registerSuite({
		name: 'Chain',

		beforeEach: function() {
			el = document.createElement('div');

			el.id = 'wee';
			el.className = 'js-wee';

			document.body.appendChild(el);

			$el = $(el);
		},

		afterEach: function() {
			el.parentNode.removeChild(el);
		},

		register: function() {
			$.fn.setId = function(id) {
				this.data('id', id);

				return this;
			};

			$el.setId(3);

			assert.strictEqual($el.data('id'), 3,
				'Chain was not registered successfully'
			);
		},

		events: {
			on: {
				simple: function() {
					$el.on('click', function() {
						$el.addClass('test-class-1');
					});

					$el.trigger('click');

					assert.ok($el.hasClass('test-class-1'),
						'Event was not bound successfully'
					);
				},

				delegation: function() {
					// TODO: Complete
					assert.isTrue(true);
				},

				'multiple events': function() {
					$el.on({
						click: function() {
							$el.addClass('test-class');
						},
						blur: function() {
							$el.removeClass('test-class')
								.addClass('test-class-2');
						}
					});

					$el.trigger('click')
						.trigger('blur');

					assert.ok($el.hasClass('test-class-2'),
						'Multple events were not triggered successfully'
					);
				}
			},

			off: {
				target: function() {
					Wee.events.on({
						el: {
							click: function() {
								$el.addClass('test-class');
							},
							blur: function() {
								$el.addClass('test-class-2');
							}
						}
					});

					$el.off()
						.trigger('click')
						.trigger('blur');

					assert.notOk($el.hasClass('test-class'),
						'Event was not removed successfully'
					);

					assert.notOk($el.hasClass('test-class-2'),
						'Event was not removed successfully'
					);
				},

				'selection event': function() {
					Wee.events.on({
						'#wee': {
							click: function() {
								$el.addClass('test-class');
							},
							blur: function() {
								$el.addClass('test-class-2');
							}
						}
					});

					$el.off('blur')
						.trigger('click')
						.trigger('blur');

					assert.ok($el.hasClass('test-class'),
						'Event was not removed successfully'
					);

					assert.notOk($el.hasClass('test-class-2'),
						'Event was not removed successfully'
					);
				},

				'selection event callback': function() {
					var callbackFunction = function() {
						$el.removeClass('test-class');
					};

					$el.on('click', function() {
						$el.addClass('test-class');
					});

					$el.trigger('click')
						.off('click', callbackFunction());

					assert.notOk($el.hasClass('test-class-2'),
						'Callback function was not executed successfully'
					);
				}
			},

			trigger: function() {
				$el.on('click', function() {
					$el.addClass('test-class');
				});

				$el.trigger('click');

				assert.ok($el.hasClass('test-class'),
					'Event was not triggered successfully'
				);
			}
		},

		DOM: {
			addClass: {
				single: function() {
					$el.addClass('test-class');

					assert.ok($el.hasClass('test-class'),
						'Single class was not added successfully'
					);
				},

				multiple: function() {
					$el.addClass('test-class-1 test-class-2 test-class-3');

					assert.include($el.attr('class'),
						'test-class-1 test-class-2 test-class-3',
						'Multiple classes were not added successfully'
					);
				}
			},

			'$after': {
				markup: function() {
					$el.after('<span class="test"></span>');

					assert.ok($el.next().hasClass('test'),
						'Test element not added successfully'
					);
				},

				fn: function() {
					$el.after(function() {
						return '<div class="test"></div>';
					});

					assert.ok($el.next().hasClass('test'),
						'Function was not executed successfully'
					);
				}
			},

			append: {
				selection: function() {
					 // TODO: Complete
					 assert.isTrue(true);
				},

				markup: function() {
					$el.append('<div id="test"></div>');

					assert.ok($el.contains('#test'),
						'Test element was not appended successfully'
					);
				},

				fn: function() {
					$el.append(function() {
						return '<div id="test"></div>';
					});

					assert.ok($el.contains('#test'),
						'Test function was not appended successfully'
					);
				}
			},

			appendTo: function() {
				var child = '<div id="test"></div>';

				$(child).appendTo(el);

				assert.ok($el.contains('#test'),
					'Element was not appended to element successfully'
				);
			},

			attr: {
				get: function() {
					assert.strictEqual($el.attr('id'), 'wee',
						'Attribute not was accessed successfully'
					);
				},

				single: function() {
					$el.attr('data-test', 'value');

					assert.strictEqual($el.attr('data-test'), 'value',
						'Attribute not was accessed successfully'
					);
				},

				multiple: function() {
					$el.attr({
						'data-one': 'value1',
						'data-two': 'value2'
					});

					assert.strictEqual($el.attr('data-one'), 'value1',
						'Attribute not was accessed successfully'
					);

					assert.strictEqual($el.attr('data-two'), 'value2',
						'Attribute was not accessed successfully'
					);
				}
			},

			'$before': {
				markup: function() {
					$el.before('<span class="test"></span>');

					assert.ok($el.prev().hasClass('test'),
						'Test element not added successfully'
					);
				},

				fn: function() {
					$el.before(function() {
						return '<div class="test"></div>';
					});

					assert.ok($el.prev().hasClass('test'),
						'Function was not executed successfully'
					);
				}
			},

			children: {
				all: function() {
					$el.html('<div></div><div></div>');

					assert.strictEqual($el.children().length, 2,
						'Children were not selected successfully'
					);
				},

				filtered: function() {
					$el.html('<div></div><div></div><span></span>');

					assert.strictEqual($el.children('div').length, 2,
						'Filtered children were not selected successfully'
					);
				}
			},

			clone: function() {
				var $clone = $el.clone();

				assert.ok($clone.hasClass('js-wee'),
					'Element was not cloned successfully'
				);
			},

			closest: function() {
				// TODO: Complete
				//$el.wrap('<div id="test"></div>');
				//
				//assert.strictEqual($el.closest('#test').length, 1,
				//	'Closest element not available'
				//);
			},

			contains: function() {
				$el.html('<span id="test"></span>');

				assert.ok($el.contains('#test'),
					'Test element was not selected successfully'
				);
			},

			contents: function() {
				$el.html('<span></span><span></span>');

				assert.strictEqual($el.contents().length, 2,
					'Contents were not selected successfully'
				);
			},

			css: {
				'get value': function() {
					assert.strictEqual($el.css('paddingTop'), '0px',
						'Default value was not retrieved successfully'
					);
				},

				single: function() {
					$el.css('fontSize', '10px');

					assert.strictEqual($el.css('fontSize'), '10px',
						'Single property was not set correctly'
					);
				},

				multiple: function() {
					$el.css({
						marginTop: '10px',
						marginBottom: '5px'
					});

					assert.strictEqual($el.css('marginTop'), '10px',
						'Top margin was not set correctly'
					);

					assert.strictEqual($el.css('marginBottom'), '5px',
						'Bottom margin was not set correctly'
					);
				}
			},

			data: {
				get: {
					beforeEach: function() {
						$el.attr({
							'data-one': '1',
							'data-two': 'true',
							'data-three': 'string'
						});
					},

					all: function() {
						var obj = {
							'one': 1,
							'two': true,
							'three': 'string'
						};

						assert.deepEqual($el.data(), obj,
							'Data references were not selected successfully'
						);
					},

					single: function() {
						assert.strictEqual($el.data('one'), 1,
							'Data reference was not selected successfully'
						);
					}
				},

				set: {
					single: function () {
						$el.data('id', '250');

						assert.strictEqual($el.data('id'), 250,
							'Data reference was not set successfully'
						);
					},

					multiple: function() {
						var obj = {
							id: 350,
							ref: 'reference'
						};

						$el.data(obj);

						assert.deepEqual($el.data(), obj,
							'Data references were not set successfully'
						);
					}
				}
			},

			empty: function() {
				$el.html('<span id="test"></span>');

				assert.strictEqual($el.html(), '<span id="test"></span>',
					'Element was not added successfully'
				);

				$el.empty();

				assert.strictEqual(Wee.$('#test').length, 0,
					'Element was not emptied successfully'
				);

				assert.notInclude($el.html(), '<span id="id"></span>',
					'Element was not emptied successfully'
				);
			},

			eq: {
				beforeEach: function() {
					$el.html(
						'<div class="test">1</div>' +
						'<div class="test">2</div>' +
						'<div class="test">3</div>'
					);
				},

				'positive index': function() {
					// TODO: Complete
					//assert.strictEqual($('.test').eq(1).text(), '2',
					//	'Element with index 1 was not selected successfully.'
					//);
				},

				'negative index': function() {
					assert.strictEqual($('.test').eq(-1).text(), '3',
						'Element with index 3 was not selected successfully.'
					);
				}
			},

			filter: function() {
				$el.html(
					'<span class="test filter"></span>' +
					'<span class="test filter"></span>' +
					'<span class="test"></span>'
				);

				assert.strictEqual($('.test').filter('.filter').length, 2,
					'Filtered elements not returned successfully'
				);
			},

			find: function() {
				$el.html(
					'<span class="test"></span>' +
					'<span class="test-2"></span>' +
					'<span class="test-2"></span>'
				);

				assert.strictEqual($el.find('.test').length, 1,
					'Element was not found successfully'
				);

				assert.strictEqual($el.find('.test-2').length, 2,
					'Elements were not found successfully'
				);
			},

			first: function() {
				// TODO: Complete
				//$el.html(
				//	'<div class="test">1</div>' +
				//	'<div class="test">2</div>'
				//);
				//
				//assert.strictEqual($('.test').first().text(), '1',
				//	'First element was selected not successfully.'
				//);
			},

			hasClass: {
				single: function() {
					assert.ok($el.hasClass('js-wee'),
						'Class was not detected successfully'
					);
				},

				multiple: function() {
					$el.addClass('test test-2 test-3');

					assert.ok($el.hasClass('test test-2 test-3'),
						'Classes were not detected successfully'
					);
				}
			},

			height: {
				get: function() {
					$el.height(100);

					assert.strictEqual($el.height(), 100,
						'Element height not set successfully'
					);
				},

				set: function() {
					$el.height('150px');

					assert.strictEqual($el.height(), 150,
						'Element height not set successfully'
					);
				},

				fn: function() {
					$el.height(100);

					$el.height(function(i, height) {
						return height + 50;
					});

					assert.strictEqual($el.height(), 150,
						'Element height not set successfully'
					);
				}
			},

			hide: function() {
				$el.hide();

				assert.ok($el.hasClass('js-hide'),
					'Element was not hidden successfully'
				);
			},

			html: {
				get: {
					single: function() {
						$el.html('<i>test</i>');

						assert.strictEqual($el.html().toLowerCase(),
							'<i>test</i>',
							'HTML value was not set correctly'
						);
					},

					multiple: function() {
						$el.html('<div></div><div></div>');

						$el.find('div').html('1');

						assert.strictEqual($el.html().toLowerCase(),
							'<div>1</div><div>1</div>',
							'HTML span values not returned successfully'
						);
					}
				},

				set: {
					single: function() {
						$el.html('<h1>test</h1>');

						assert.strictEqual($el.html(),
							'<h1>test</h1>',
							'HTML was not set successfully'
						);
					}
				},

				fn: function() {
					$el.html('test');

					$el.html(function(i, html) {
						return html.toUpperCase();
					});

					assert.strictEqual($el.html(),
						'TEST',
						'Function was not executed successfully'
					);
				}
			},

			index: function() {
				$el.html(
					'<div id="one"></div>' +
					'<div id="two"></div>' +
					'<div id="three"></div>'
				);

				assert.strictEqual($('#three').index(), 2,
					'Incorrect element index returned'
				);

			},

			insertAfter: function() {
				$('<div class="test"></div>').insertAfter($el);

				assert.ok($el.next().hasClass('test'),
					'Element was not added after successfully.'
				);
			},

			insertBefore: function() {
				$('<div class="test"></div>').insertBefore($el);

				assert.ok($el.prev().hasClass('test'),
					'Element was not added before successfully'
				);
			},

			//'is': {
			//	'selection': function() {
			//		$el.addClass('one');
			//
			//		assert.ok($el.is('.one'),
			//			'Element was not successfully identified with "one" class'
			//		);
			//
			//		assert.isFalse($el.is(),
			//			'$is returned false instead of true'
			//		);
			//	},
			//
			//	fn: function() {
			//		$el.html(el,
			//			'<ul class="people">' +
			//			    '<li data-hidden="false">Charlie Kelly</li>' +
			//			    '<li data-hidden="true">Dennis Reynolds</li>' +
			//			    '<li data-hidden="false">Mac</li>' +
			//			    '<li data-hidden="false">Dee Reynolds</li>' +
			//			'</ul>'
			//		);
			//
			//		var isFunction = $('.people li').is(function(i, el) {
			//				return $el.data('hidden');
			//			});
			//
			//		assert.isTrue(isFunction,
			//			'Function executed successfully'
			//		);
			//	}
			//},

			last: function() {
				$el.html('<div>1</div><div>2</div><div>3</div>');

				assert.strictEqual($el.children().last().text(), '3',
					'Last element content was not returned successfully'
				);
			},

			//next: function() {
			//	$el.append('body', '<div id="wee-chain-2"></div>');
			//
			//	assert.strictEqual($el.next()[0].id, 'wee-chain-2',
			//		'Next element was not returned successfully'
			//	);
			//
			//	$('#wee-chain-id-2').remove();
			//},

			//'not': {
			//	'selection': function() {
			//		$el.html(el,
			//			'<span class="testing-not one"></span>' +
			//			'<span class="testing-not two"></span>' +
			//			'<span class="testing-not three"></span>'
			//		);
			//
			//		var $elements = Wee.$('.testing-not');
			//
			//		assert.isObject($($elements).not('.one'));
			//
			//		assert.strictEqual($el.not($elements, '.one').length, 2,
			//			'Filtered elements not retuned successfully'
			//		);
			//	},
			//
			//	fn: function() {
			//		$el.html(el,
			//			'<ul class="people">' +
			//			    '<li data-hidden="false">Charlie Kelly</li>' +
			//			    '<li data-hidden="true">Dennis Reynolds</li>' +
			//			    '<li data-hidden="false">Mac</li>' +
			//			    '<li data-hidden="false">Dee Reynolds</li>' +
			//			'</ul>'
			//		);
			//
			//		var notFunction = $('.people li').not(function(i, el) {
			//				return $el.data('hidden') === true;
			//
			//			});
			//
			//		assert.isObject(notFunction,
			//			'$not did not return an array'
			//		);
			//
			//		assert.strictEqual(notFunction.length, 3,
			//			'Incorrect values were returned'
			//		);
			//	}
			//},
			//
			//'offset': {
			//	'beforeEach': function() {
			//		$el.css({
			//			position: 'absolute',
			//			top: '-10000px',
			//			left: '-10000px'
			//		});
			//	},
			//
			//	'get': function() {
			//		assert.deepEqual($el.offset(), {
			//			top: -10000,
			//			left: -10000
			//		},
			//			'Offset not returned successfully'
			//		);
			//
			//		assert.notDeepEqual($el.offset(), {
			//			top: 10000,
			//			left: 10000
			//		},
			//			'Offset not returned successfully'
			//		);
			//	},
			//
			//	'set': function() {
			//		$el.offset({
			//			top: 100,
			//			left: 20
			//		});
			//
			//		assert.deepEqual($el.offset(), {
			//			top: 100,
			//			left: 20
			//		},
			//			'Offset value was not set successfully'
			//		);
			//
			//		assert.notDeepEqual($el.offset(), {
			//			top: 101,
			//			left: 22
			//		},
			//			'Offset value was not set successfully'
			//		);
			//	}
			//},
			//
			//'parent': {
			//	'all': function() {
			//		var $fixture = Wee.$el;
			//
			//		$el.html($fixture, '<span class="fixture-child"></span>');
			//
			//		assert.deepEqual($el.parent('.fixture-child'), $fixture,
			//			'Parent was not returned successfully'
			//		);
			//	},
			//
			//	'filtered': function() {
			//		var $fixture = Wee.$el;
			//
			//		$el.html($fixture, '<div class="fixture-child"></div>');
			//
			//		assert.deepEqual($el.parent('.fixture-child', 'div'), $fixture,
			//			'Filtered parent was not returned successfully'
			//		);
			//	}
			//},
			//
			//'parents': function() {
			//	var $fixture = Wee.$el;
			//
			//	$el.html($fixture,
			//		'<span id="child">' +
			//			'<span id="child-2">' +
			//				'<span id="child-3"></span>' +
			//			'</span>' +
			//		'</span>'
			//	);
			//
			//	assert.strictEqual($('#child-3').parents().length, 5,
			//		'Parents were not returned successfully'
			//	);
			//
			//	assert.strictEqual($('#child-2').parents().length, 4,
			//		'Parents were not returned successfully'
			//	);
			//
			//	assert.isObject($('#child-3').parents(),
			//		'$parents did not return an array'
			//	);
			//},

			position: function() {
				var positionValue = {
					top: -10000,
					left: -10000
				};

				$el.css({
					position: 'absolute',
					top: '-10000px',
					left: '-10000px'
				});

				assert.deepEqual($el.position(), positionValue,
					'Position not returned successfully'
				);
			},

			//'prepend': {
			//	'selection': function() {
			//		$el.prepend('<span class="testing"></span>');
			//
			//		assert.ok($el.contains('.testing'),
			//			'Test element was not prepended successfully'
			//		);
			//	},
			//
			//	fn: function() {
			//		$el.html(el,
			//			'<h1 id="list-heading"></h1>' +
			//			'<ul id="wee-list">' +
			//				'<li>Dee Reynolds</li>' +
			//				'<li>Frank Reynolds</li>' +
			//			'</ul>'
			//		);
			//
			//		$('#list-heading').prepend(function() {
			//			return '(' + $el.children('#wee-list').length + ')';
			//		});
			//
			//		assert.include($el.text('#list-heading'), '(2)',
			//			'Function was not executed successfully'
			//		);
			//
			//		assert.strictEqual($el.text('#list-heading'), '(2)',
			//			'Function was not executed successfully'
			//		);
			//	}
			//},
			//
			//'prependTo': function() {
			//	var prependFixture = '<div id="test"></div>';
			//
			//	$el.html('<div id="wee-inner"></div>');
			//
			//	$(prependFixture).prependTo('#wee-inner');
			//
			//	assert.ok($('#wee-chain-id-inner').parent(), prependFixture,
			//		'Element was not appended to element successfully'
			//	);
			//},
			//
			//'prev': function() {
			//	$el.after(el,
			//		$('<span id="wee-chain-id-2"></span>')
			//	);
			//
			//	assert.strictEqual($('#wee-chain-id-2').prev().length, 1);
			//},
			//
			//'prop': {
			//	'beforeEach': function() {
			//		$el.html(el,
			//			'<input type="text" class="testing">'
			//		);
			//	},
			//
			//	'afterEach': function() {
			//		$el.remove('.testing');
			//	},
			//
			//	'get': function() {
			//		$('.testing').prop('checked');
			//
			//		assert.notOk($('.testing').prop('checked'),
			//			'Property was selected successfully'
			//		);
			//	},
			//
			//	'single': function() {
			//		$('.testing').prop('disabled', true);
			//
			//		assert.ok($('.testing').prop('disabled'),
			//			'Disabled property was not added successfully'
			//		);
			//	},
			//
			//	'multiple': function() {
			//		$('.testing').prop({
			//			'disabled': true,
			//			'required': true
			//		});
			//
			//		assert.ok($('.testing').prop('disabled'),
			//			'Disabled property was negated successfully.'
			//		);
			//		assert.ok($('.testing').prop('required'),
			//			'Required property was added successfully.'
			//		);
			//	}
			//},
			//
			// remove: function() {
			// 	$el.remove();
			//
			// 	assert.strictEqual($('#wee').length, 0,
			// 		'Element was not removed successfully'
			// 	);
			// },
			//
			//'removeAttr': function() {
			//	$el.attr('data-test', 'value');
			//
			//	assert.strictEqual($el.attr('data-test'), 'value',
			//		'Attribute was not added successfully'
			//	);
			//
			//	$el.removeAttr('data-test');
			//
			//	assert.strictEqual($el.attr('data-test'), null,
			//		'Attribute was not removed successfully'
			//	);
			//},

			removeClass: {
				single: function() {
					$el.removeClass('js-wee');

					assert.notOk($el.hasClass('js-wee'),
						'Single class was not removed successfully'
					);
				},

				multiple: function() {
					$el.addClass('test test2');

					$el.removeClass('test test2');

					assert.strictEqual($el.attr('class'), 'js-wee',
						'Multiple classes were not removed successfully'
					);
				}
			},

			replaceWith: function() {
				$el.html('<div id="test"></div>');

				$('#test').replaceWith('<span id="test2"></span>');

				assert.ok($el.contains('#test2'),
					'Element was not replaced successfully'
				);
			},

			//'scrollLeft': {
			//	'get': function() {
			//		assert.strictEqual($('body').scrollLeft(), 0,
			//			'Scroll left value not retreived successfully'
			//		);
			//	},
			//
			//	'set': function() {
			//		// TODO: Complete
			//		assert.isTrue(true);
			//
			//		//$el.css('width', '15000px');
			//		//
			//		//$el.scrollLeft('body', 10);
			//		//
			//		//assert.strictEqual($('body').scrollLeft(), 10,
			//		//	'Scroll left value not set successfully'
			//		//);
			//	}
			//},
			//
			//'scrollTop': {
			//	'get': function() {
			//		assert.strictEqual($('body').scrollTop(), 0,
			//			'Scroll top value not retreived successfully'
			//		);
			//	},
			//
			//	'set': function() {
			//		// TODO: Complete
			//		assert.isTrue(true);
			//
			//		//$el.css('height', '500px');
			//		//
			//		//$el.scrollTop('body', 10);
			//		//
			//		//assert.strictEqual($('body').scrollTop(), 10,
			//		//	'Scroll top value not set successfully'
			//		//);
			//	}
			//},
			//
			//'serialize': function() {
			//	$el.html(el,
			//		'<form action="#" id="wee-chain-id-form">' +
			//			'<input type="text" name="input" value="inputValue">' +
			//			'<input type="checkbox" name="checkbox" value="checkboxValue" checked>' +
			//			'<input type="radio" name="radio1" value="radioValue" checked>' +
			//			'<select name="select">' +
			//				'<option value="selectValue1" checked>Option 1</option>' +
			//				'<option value="selectValue2">Option 2</option>' +
			//			'</select>' +
			//			'<select name="optgroup">' +
			//				'<optgroup>' +
			//					'<option value="optgroupValue1" checked>Optgroup 1</option>' +
			//					'<option value="optgroupValue2">Optgroup 2</option>' +
			//				'</optgroup>' +
			//			'</select>' +
			//			'<textarea name="textarea">' +
			//			'Text Area' +
			//			'</textarea>' +
			//		'</form>'
			//	);
			//
			//	var serializedValue = 'input=inputValue&checkbox=checkboxValue' +
			//		'&radio1=radioValue&select=selectValue1&' +
			//		'optgroup=optgroupValue1&textarea=Text+Area';
			//
			//	assert.strictEqual($('#wee-chain-id-form').serialize(), serializedValue,
			//		'Form was not serialized successfully'
			//	);
			//},
			//
			//'show': function() {
			//	$el.hide(el);
			//
			//	assert.ok($el.hasClass('js-hide'),
			//		'Element was not hidden successfully'
			//	);
			//
			//	$el.show();
			//
			//	assert.notOk($el.hasClass('js-hide'),
			//		'Element was not shown successfully'
			//	);
			//},
			//
			//'siblings': {
			//	'beforeEach': function() {
			//		$el.append(el,
			//			'<p></p>' +
			//			'<span></span>' +
			//			'<div id="target-div"></div>'
			//		);
			//	},
			//
			//	'all': function() {
			//		assert.strictEqual($('#target-div').siblings().length, 2,
			//			'All siblings were not retrieved successfully'
			//		);
			//
			//		assert.isObject($('#target-div').siblings(),
			//			'$siblings did not return an array'
			//		);
			//	}
			//},
			//
			//'slice': function() {
			//	$el.html(el,
			//		'<span>1</span><span>2</span><span>3</span>'
			//	);
			//
			//	assert.strictEqual($el.html($('#wee-chain-id span').slice(1, 2)), '2',
			//		'Second element was not selected successfully'
			//	);
			//},
			//
			//'text': {
			//	'beforeEach': function() {
			//		$el.text('Wee Test');
			//	},
			//
			//	'get': function() {
			//		assert.strictEqual($el.text(), 'Wee Test',
			//			'Text was not retreived successfully'
			//		);
			//	},
			//
			//	'set': function() {
			//		$el.text('Test 123');
			//
			//		assert.strictEqual($el.text(el), 'Test 123',
			//			'Element text was not set successfully'
			//		);
			//	}
			//},
			//
			//'toggle': function() {
			//	$el.toggle();
			//
			//	assert.ok($el.hasClass('js-hide'),
			//		'Element was not hidden successfully'
			//	);
			//
			//	$el.toggle();
			//
			//	assert.notOk($el.hasClass('js-hide'),
			//		'Element was not shown successfully'
			//	);
			//},
			//
			//'toggleClass': {
			//	'single': function() {
			//		$el.toggleClass('test-class');
			//
			//		assert.ok($el.hasClass('test-class'),
			//			'Class was not added successfully'
			//		);
			//
			//		$el.toggleClass('test-class');
			//
			//		assert.notOk($el.hasClass('test-class'),
			//			'Class was not removed successfully'
			//		);
			//	},
			//
			//	'multiple': function() {
			//		$el.toggleClass('test-class test-class-2');
			//
			//		assert.strictEqual($el.attr('class'),
			//			'wee-chain-class test-class test-class-2',
			//			'Multiple classes were not toggled successfully'
			//		);
			//
			//		$el.toggleClass('test-class test-class-2');
			//
			//		assert.notStrictEqual($el.attr('class'),
			//			'wee-chain-class test-class test-class-2',
			//			'Multiple classes were not toggled successfully'
			//		);
			//
			//		assert.notOk($el.hasClass('test-class'),
			//			'Multiple classes were not toggled successfully'
			//		);
			//
			//		assert.notOk($el.hasClass('test-class-2'),
			//			'Multiple classes were not toggled successfully'
			//		);
			//	},
			//
			//	fn: function() {
			//		$el.toggleClass(function() {
			//			return $el.addClass('test');
			//		});
			//
			//		assert.ok($el.hasClass('test'),
			//			'Function was not executed successfully'
			//		);
			//	}
			//},

			val: {
				beforeEach: function() {
					$el.html('<input type="text" class="testing" value="test">');
				},

				get: function() {
					assert.strictEqual($('.testing').val(), 'test',
						'Value was not retrieved successfully'
					);
				},

				set: function() {
					$('.testing').val('2');

					assert.strictEqual($('.testing').val(), '2',
						'Value was not set successfully'
					);
				},

				fn: function() {
					$('.testing').val(function(i, value) {
						if (value.length > 3) {
							return 'success';
						}
					});

					assert.ok($('.testing').val(), 'success',
						'Function was not executed successfully'
					);
				}
			},

			width: {
				get: function() {
					$el.width(100);

					assert.strictEqual($el.width(), 100,
							'Element width not set successfully'
					);
				},

				set: function() {
					$el.width('150px');

					assert.strictEqual($el.width(), 150,
							'Element width not set successfully'
					);
				},

				fn: function() {
					$el.width(100);

					$el.width(function(i, width) {
						return width + 50;
					});

					assert.strictEqual($el.width(), 150,
							'Element width not set successfully'
					);
				}
			},

			// wrap: function() {
			// 	$el.wrap('<div id="test"></div>');
			//
			// 	assert.strictEqual($el.parent('#test').length, 1,
			// 		'Element was not wrapped successfully'
			// 	);
			// },

			wrapInner: function() {
				$el.wrapInner('<div id="test"></div>');

				assert.ok($el.contains('#test'),
					'Element was not wrapped successfully'
				);
			}
		}
	});
});