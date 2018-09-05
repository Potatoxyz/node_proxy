var http = require('http'), httpProxy = require('http-proxy');
// 新建一个代理 Proxy Server 对象
var proxy = httpProxy.createProxyServer({});
// 捕获异常
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Something went wrong. And we are reporting a custom error message.');
});
var express=require('express');
var app=express();
app.get('/', function (req, res) {
    var r={test:'hello'};
    res.send(r);
    res.end();
});
//这里相当于访问 http://localhost:3001/upload
app.get('/upload',function (req, res) {
    proxy.web(req, res, {target: 'http://localhost:3001/'});
});
app.get('/baidu',function (req,res) {
    proxy.web(req, res, {target: 'http://www.baidu.com'});
});

console.log("listening on port 3000");

app.listen(3000);