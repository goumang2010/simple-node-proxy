#!/usr/bin/env node

var inquirer = require('inquirer');
var ora = require('ora');
var createProxy = require('./server.js');
const option = {};
inquirer
	.prompt([{
		type: 'input',
		name: 'port',
		message: 'Which port for proxy?',
		default: 8038
	}])
	.then((answers) => {
		option.port = answers.port;
		return inquirer
			.prompt([{
				type: 'input',
				name: 'origin',
				message: 'Which origin for cross-domain?',
				default: '*'
			}]);
	})
	.then((answers) => {
		option.origin = answers.origin;
		createProxy(option);
		ora('Http proxy listening to ' + option.port).start();
	});
