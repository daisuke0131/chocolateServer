
var http = require('http');
var url = require('url');
var urlOpts = {host: 'www.nodejs.org', path: '/', prot: '80'};

http.createServer(function(request, response)
{
  http.get(urlOpts, function(res)
  {
    res.on('data', function(chunk)
    {
      response.writeHead(200, {'Content-Type': 'text/html'});
//      console.log(chunk.toString());
      response.end(chunk);
    }).on('error', function(err)
    {
      console.log('error:' + err.message);
    });
  });
//  var id = url.parse(decodeURI(request.url), true).query.id;
}).listen(8080);
