#!/usr/bin/env node
var inquirer = require('inquirer');
var ora = require('ora');
var createProxy = require('./server.js');
inquirer
	.prompt([{
		type: 'input',
		name: 'port',
		message: 'Which port for proxy?',
		default: 8038
	}])
	.then((answers) => {
		createProxy(answers.port);
		ora('Http proxy listening to ' + answers.port).start();
	});
