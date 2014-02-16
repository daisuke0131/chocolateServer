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
            $('body').css('position','relative');
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

  chocolate.setForm=function(url){
        var $form = $('<form />');
        $form.attr('method','POST');
        $form.attr('enctype','multipart/form-data');
        $form.attr('action','http://www1034up.sakura.ne.jp/chocolate/php/insert.php');
        $form.attr('align','right');

        var $input =$('<input />');
        $input.attr('type','hidden');
        $input.attr('name','url');
        $input.attr('id','form_url');
        $input.attr('value',¥"+window.originalUrl+¥");
        $form.append($input);

        var $input2 =$('<input />');
        $input2.attr('type','file');
        $input2.attr('name','image');
        $form.append($input2);

        var $input3 =$('<input />');
        $input3.attr('type','submit');
        $input3.attr('value','登録');
        $form.append($input3);

        $('body').prepend($form);




  };

  window.chocolate=chocolate;
  window.chocolateUrl="http://www1034up.sakura.ne.jp/chocolate";

}());


//画面初期ロード時のロジックを記述
$(function() {
  //var url="http://www.google.com/";
  var url = window.location.protocol+"//"+window.location.host + window.location.pathname;
  console.log(url);
  chocolate.setForm();
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
