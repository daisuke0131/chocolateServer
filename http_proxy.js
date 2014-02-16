'use strict';
var http = require('http');
var url  = require('url');
var net  = require('net');
var chocolate = require("./js/chocolate.js");

var HTTP_PORT = process.argv[2] || 8080;  // internal proxy server port
var PROXY_URL = process.argv[3] || null;  // external proxy server URL
var PROXY_HOST = PROXY_URL ?  url.parse(PROXY_URL).hostname    : null;
var PROXY_PORT = PROXY_URL ? (url.parse(PROXY_URL).port || 80) : null;

function printError(err, msg, url) {
  console.log('%s %s: %s %s', new Date().toLocaleTimeString(), msg, err, url);
}

var httpServer = http.createServer(function onCliReq(cliReq, cliRes) {
  var x = url.parse(cliReq.url);
  if (PROXY_URL)
    var options = {host: PROXY_HOST, port: PROXY_PORT, path: cliReq.url,
                   method: cliReq.method, headers: cliReq.headers};
  else
    var options = {host: x.hostname, port: x.port || 80, path: x.path,
                   method: cliReq.method, headers: cliReq.headers};
  var svrReq = http.request(options, function onSvrRes(svrRes) {
    if(!(endsWith(cliReq.url, ".html") || endsWith(cliReq.url, "/"))){
	console.log("not html :: " + cliReq.url);
    cliRes.writeHead(svrRes.statusCode, svrRes.headers);
    svrRes.pipe(cliRes);
    } else { 
	console.log("html :: " + cliReq.url);
    var svrResBody = "";
    svrRes.on("data",function(chunk){
	svrResBody += chunk;
    });
    svrRes.on("end",function(chunk){
	svrResBody += chunk;
	var svrResBodyChanged = chocolate.chocolatify(svrResBody);
//	console.log(svrResBodyChanged);
	var cliResHeaders = svrRes.headers;
	cliResHeaders['content-length'] = countbytes(svrResBodyChanged);
	cliRes.writeHead(svrRes.statusCode, cliResHeaders);

	cliRes.write(svrResBodyChanged);
	cliRes.end();
    });
    }
    console.log("a");
  });
/*    var cliReqBody = "";
    cliReq.on("data",function(chunk){
	cliReqBody += chunk;
    });
    cliReq.on("end",function(chunk){
	cliReqBody += chunk;
	svrReq.write(cliReqBody);
	svrReq.end();
    });
*/
  cliReq.pipe(svrReq);
  svrReq.on('error', function onSvrReqErr(err) {
    cliRes.writeHead(400, err.message, {'content-type': 'text/html'});
    cliRes.end('<h1>' + err.message + '<br/>' + cliReq.url + '</h1>');
    printError(err, 'svrReq', x.hostname + ':' + (x.port || 80));
  });
}).listen(HTTP_PORT);

httpServer.on('clientError', function onCliErr(err, cliSoc) {
  cliSoc.end();
  printError(err, 'cliErr', '');
});

httpServer.on('connect', function onCliConn(cliReq, cliSoc, cliHead) {
  var x = url.parse('https://' + cliReq.url);
  if (PROXY_URL) {
    var options = {host: PROXY_HOST, port: PROXY_PORT, path: cliReq.url,
                   method: cliReq.method, headers: cliReq.headers};
    var svrReq = http.request(options);
    svrReq.end();
    var svrSoc = null;
    svrReq.on('connect', function onSvrConn(svrRes, svrSoc2, svrHead) {
      svrSoc = svrSoc2;
      cliSoc.write('HTTP/1.0 200 Connection established\r\n\r\n');
      if (cliHead && cliHead.length) svrSoc.write(cliHead);
      if (svrHead && svrHead.length) cliSoc.write(svrHead);
      svrSoc.pipe(cliSoc);
      cliSoc.pipe(svrSoc);
      svrSoc.on('error', funcOnSocErr(cliSoc, 'svrSoc', cliReq.url));
    });
    svrReq.on('error', funcOnSocErr(cliSoc, 'svrRq2', cliReq.url));
  }
  else {
    var svrSoc = net.connect(x.port || 443, x.hostname, function onSvrConn() {
      cliSoc.write('HTTP/1.0 200 Connection established\r\n\r\n');
      if (cliHead && cliHead.length) svrSoc.write(cliHead);
      cliSoc.pipe(svrSoc);
    });
    svrSoc.pipe(cliSoc);
    svrSoc.on('error', funcOnSocErr(cliSoc, 'svrSoc', cliReq.url));
  }
  cliSoc.on('error', function onCliSocErr(err) {
    if (svrSoc) svrSoc.end();
    printError(err, 'cliSoc', cliReq.url);
  });
  function funcOnSocErr(soc, msg, url) {
    return function onSocErr(err) {
      soc.end();
      printError(err, msg, url);
    };
  }
});

console.log('http proxy server started on port ' + HTTP_PORT +
    (PROXY_URL ? ' -> ' + PROXY_HOST + ':' + PROXY_PORT : ''));

function countbytes(str) {
    var r = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // Shift_JIS: 0x0 ・・0x80, 0xa0 , 0xa1 ・・0xdf , 0xfd ・・0xff
        // Unicode : 0x0 ・・0x80, 0xf8f0, 0xff61 ・・0xff9f, 0xf8f1 ・・0xf8f3
        if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
            r += 1;
        } else {
            r += 2;
        }
    }
    return r;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
