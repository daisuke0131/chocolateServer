//api
(function(){
  var chocolate={};
  chocolate.getChocoList=function(){
    var apiUrl =chocolateUrl+"/api/index.php"
    
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
      },
      error: function( jqXHR, textStatus, errorThrown ) {
        alert("get error "+"status:"+textStatus +"error: "+errorThrown);
      },
      timeout:50000,
    });
  };


  chocolate.update=function(data){
    var apiUrl =serverUrl+"/api/index.php"
    
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
  window.chocolateUrl="http://www1034up.sakura.ne.jp:8080/chocolate";

}());


//画面初期ロード時のロジックを記述
$(function() {
  chocolate.getChocoList();

  $( "#kuma" ).draggable({
          stop: function( event, ui ) {
            
            console.log(ui.position.top);
            console.log(ui.position.left);


          }
        });
});