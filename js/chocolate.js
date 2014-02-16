var cheerio = require("cheerio");
var fs = require("fs");
var headerJquery = "<script src='//code.jquery.com/jquery-1.10.2.min.js'></script>";
var headerJqueryUi = "<script src='//code.jquery.com/ui/1.10.4/jquery-ui.js'></script>";
//var headerJqueryUi = "<script src='http://www1034up.sakura.ne.jp/chocolate/static/js/jquery-ui.js'></script>";
var headerChocolate = "<script src='http://www1034up.sakura.ne.jp/chocolate/static/js/chocolate2.js'></script>";

//var formbar = "aaaaaaa";	
//var formbar = "<form method='POST' enctype='multipart/form-data' action='http://www1034up.sakura.ne.jp/chocolate/php/register_image.php'><input type='hidden' name='url' id='form_url' value=''><input type='file' name='image'></input><input type='submit'></input></form><script>document.getElementById('form_url').value = location.href;</script>";
var formbar = "<form method='POST' enctype='multipart/form-data' action='http://www1034up.sakura.ne.jp/chocolate/php/insert.php'>\
<input type='hidden' name='url' id='form_url' value='test'>\
<input type='file' name='image'></input>\
<input type='submit'></input>\
</form>\
<script>\
document.getElementById('form_url').value = location.href;\
</script>";

module.exports = {
	size : function(){
		return Buffer.byteLength(formbar, 'utf8');
	} ,
	chocolatify : function(body){
		try{
			var $ = cheerio.load(body);
			$('head'). prepend(headerJquery + headerJqueryUi + headerChocolate);
			$('body').prepend(formbar);
			var newbody = $.html();
//			console.log(newbody.substring(newbody.length -9, newbody.length));
			if("undefined" == newbody.substring(newbody.length -9, newbody.length)){
				newbody = newbody.substring(0, newbody.length -9);
			}
//			console.log(newbody);
		} catch (error ){
			console.log("chocolate error");
			console.log(error);
			newbody = "parse error <br/>" + body;
		}
		return newbody;
	}
}