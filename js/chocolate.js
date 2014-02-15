var cheerio = require("cheerio");

module.exports = {

	chocolatify : function(body){
    $ = cheerio.load('<h2 class="title">Hello world</h2>');

	$('h2.title').text('Hello there!');
	$('h2').addClass('welcome');

	$.html();
		return body;
	}
}
