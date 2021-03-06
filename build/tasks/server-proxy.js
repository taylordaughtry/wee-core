/* global project, server, Wee */

module.exports = function(grunt) {
	grunt.registerTask('proxy', function() {
		if (project.server.tasks.local.proxy !== false) {
			server.proxy = project.server.tasks.local.proxy;

			// Override auto-detected IP address
			if (project.server.host !== 'auto') {
				server.host = project.server.host;
			}
		} else {
			server.socket = {
				domain: 'localhost:' + project.server.port
			};
		}

		// Server asset injection
		if (project.server.inject && project.server.inject.length) {
			var inject = [];

			project.server.inject.forEach(function(file) {
				if (file.slice(-3) === '.js') {
					inject.push('<script src="' + file + '"></script>');
					Wee.serverWatch(file);
				} else if (file.slice(-4) === '.css') {
					inject.push('<link rel="stylesheet" href="' + file + '">');
					Wee.serverWatch(file);
				}
			});

			server.middleware = function(req, res, next) {
				if (req.headers && req.headers.accept && req.headers.accept.match(/^text\/html/)) {
					var write = res.write,
						injected = false;

					res.setHeader(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
					);

					res.write = function(data, encoding) {
						if (! injected) {
							data = data.toString(encoding).replace(
								/<\/body>/i,
								inject.join('') + '</body>'
							);

							injected = true;
						}

						write.call(res, data, encoding);
					};
				}

				next();
			};
		}

		// Secure mode
		if (project.server.tasks.local.https === true) {
			server.https = true;
		}
	});
};