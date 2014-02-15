//api
(function(){
  var chocolate={};
  chocolate.getList=function(url){
    var apiUrl =chocolateUrl+"/api/"
    apiUrl=apiUrl+"?page_url="+url;
    
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
        alert("get success");
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
            $div.attr("id","#"+chocoid);
            $div.css('position', 'absolute'); 
            $div.css("top",y+"px");
            $div.css("left",x+"px");

            var imgpath = chocolateUrl+"/img/"+imageUrl;
            var $img = $("<img />");
            $img.attr("src",imgpath);
            $div.append($img);
            $('body').append($div);

            console.log(chocoid);
            $("#"+chocoid).draggable();

        }

        //要素つくってdraggableを付ける


      },
      error: function( jqXHR, textStatus, errorThrown ) {
        alert("get error "+"status:"+textStatus +"error: "+errorThrown);
        
        $('body').css('position', 'relative'); 

        var $div=$("<div />");
        $div.attr("id","testid");
        $div.css('position', 'absolute'); 
        
        $div.css("top","100px");
        $div.css("left","100px");
        var $img = $("<img />");
        $img.attr("src","img/kuma.jpg");
        $div.append($img);
        $('body').append($div);

        $( "#testid" ).draggable({
        });


      },
      timeout:50000,
    });
  };


  chocolate.update=function(data){
    var apiUrl =chocolateUrl+"/api/index.php"
    
    reqdata={"id":data["id"],"x":data["x"],"y":data["y"]};
    
    $.ajax({
    async:true,
    type:'POST',
    //cache:false,
    url:apiUrl,
    scriptCharset:'utf-8',
    contentType: 'application/json',
    data:reqdata,
    dataType:'json',
    beforeSend: function(xhrObj){
                //xhrObj.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
                //xhrObj.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        },
    success: function(json) {
        alert("test");
      },
      error: function( jqXHR, textStatus, errorThrown ) {
        alert("send error "+"status:"+textStatus +"error: "+errorThrown);
      },
      timeout:50000,
    });

  };

  window.chocolate=chocolate;
  window.chocolateUrl="http://www1034up.sakura.ne.jp/chocolate";

}());


//画面初期ロード時のロジックを記述
$(function() {
  var url="http://www.google.com/";
  chocolate.getList(url);
  

  $( "#kuma" ).draggable({
          stop: function( event, ui ) {
            
            console.log(ui.position.top);
            console.log(ui.position.left);
            data={};
            data["x"]=ui.position.left;
            data["y"]=ui.position.top;
            //chocolate.update(data);


          }
        });
});
