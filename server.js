var httpProxy = require('http-proxy');
var http = require('http');
var url = require("url");
var proxy = httpProxy.createProxyServer({});
proxy.on('error', function(err, req, res) {
	res.writeHead(500, {
		'Content-Type': 'text/plain'
	});
	res.end('Something went wrong.');
});
module.exports = function createProxy({ port, origin }) {
	return http.createServer(function(req, res) {
		var urlObj = url.parse(req.url);
		res.oldWriteHead = res.writeHead;
		res.writeHead = function(statusCode, headers) {
			// 设置跨域头
			res.setHeader('Access-Control-Allow-Credentials', true);
			res.setHeader('Access-Control-Allow-Origin', origin || '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
			res.oldWriteHead(statusCode, headers);
		}
		let target = urlObj.protocol + "//" + urlObj.host;
		proxy.web(req, res, {
			target: target
		});
	}).listen(port);
}
