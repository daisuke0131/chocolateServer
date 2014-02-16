//api
(function(){
  var chocolate={};
  chocolate.getList=function(){
    var apiUrl =chocolateUrl+"/api/";
    apiUrl=apiUrl+"?page_url="+originalUrl;
    
    $.ajax({
    async:true,
    type:'GET',
    //cache:false,
    url:apiUrl,
    scriptCharset:'utf-8',
    beforeSend: function(xhrObj){
                //xhrObj.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
                //xhrObj.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        },
    success: function(json) {
        data=json["data"];
        //json parse
        console.log(json);

        for(choco in data){
            //console.log(data[choco]["id"]);
            var id = data[choco]["id"];
            var imageUrl = data[choco]["image_file_name"];
            var x = data[choco]["x"];
            var y = data[choco]["y"];
            var chocoid = "chocolate"+id;
            var $div=$("<div />");
            $div.attr("id",chocoid);
            $div.css('position', 'absolute'); 
            $div.css("top",y+"px");
            $div.css("left",x+"px");

            var imgpath = chocolateUrl+"/img/"+imageUrl;
            var $img = $("<img />");
            $img.attr("src",imgpath);
            $div.append($img);
            $('body').append($div);

            console.log(chocoid);
            $("#"+chocoid).draggable({
                     stop: function( event, ui ) {
                      chocoid=this.id;
                      cid=chocoid.replace("chocolate","");
            
                    console.log(ui.position.top);
                    console.log(ui.position.left);
                    data={};
                    data["id"]=cid;
                    data["x"]=ui.position.left;
                    data["y"]=ui.position.top;
                    chocolate.update(data);
          }


          });

        }


      },
      error: function( jqXHR, textStatus, errorThrown ) {
        console.log("get list error");
      },
      timeout:50000,
    });
  };


  chocolate.update=function(data){
    //var apiUrl =chocolateUrl+"/api/";
    //apiUrl=apiUrl+"?page_url="+originalUrl;
    var apiUrl =chocolateUrl+"/php/update.php"

    reqdata={"id":data["id"],"x":String(data["x"]),"y":String(data["y"])};
    reqjson=JSON.stringify(reqdata);
    console.log(reqjson);
    //$.support.cors = true;
    $.ajax({
    async:true,
    type:'POST',
    //cache:false,
    Origin:'local',
    url:apiUrl,
    scriptCharset:'utf-8',
    contentType: 'application/json',
    data:reqjson,
    dataType:'json',
    beforeSend: function(xhrObj){
                //xhrObj.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
                //xhrObj.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        },
    success: function(json) {
        console.log(json);
      },
      error: function( jqXHR, textStatus, errorThrown ) {
        console.log("update error");
      },
      timeout:50000,
    });
  };

  chocolate.setUrl=function(url){
    window.originalUrl=url;
  };

  window.chocolate=chocolate;
  window.chocolateUrl="http://www1034up.sakura.ne.jp/chocolate";

}());


//画面初期ロード時のロジックを記述
$(function() {
  var url=location.href;
  chocolate.setUrl(url);
  chocolate.getList();

  

  $( "#kuma" ).draggable({
          stop: function( event, ui ) {
            id = this.id;
            console.log(ui.position.top);
            console.log(ui.position.left);
            data={};
            data["x"]=ui.position.left;
            data["y"]=ui.position.top;
            //chocolate.update(data);


          }
        });
});
