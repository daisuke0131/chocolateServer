var cheerio = require("cheerio");
var formbar = "aaaaaaa";
/*	
"<form method='POST' enctype='multipart/form-data' action='http://www1034up.sakura.ne.jp/chocolate/php/register_image.php'>
<input type='hidden' name='url' id='form_url' value=''>
<input type='file' name='image'></input>
<input type='submit' value='“o˜^'></input>
</form>";
*/
module.exports = {

	chocolatify : function(body){
		console.log("a1");
		console.log(body);
	    $ = cheerio.load(body);
		$('body').prepend(formbar);
		body = $.html();
		console.log("a2");
		console.log(body);
		return body;
	}
}