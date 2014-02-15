//api
(function(){
  var chocolate={};
  chocolate.sendNote=function(data){
    var apiUrl =serverUrl+"/api/note"
    var jsondata=data;
    
    reqdata={"method":"sendNote","token":token,"pageNum":1,"noteData":jsondata};
    
    $.ajax({
    async:true,
    type:'POST',
    cache:false,
    url:apiUrl,
    scriptCharset:'utf-8',
    contentType: 'application/json',
    data:reqdata,
    dataType:'json',
    beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
                //xhrObj.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        },
    success: function(json) {
      },
      error: function( jqXHR, textStatus, errorThrown ) {
        alert("send error "+"status:"+textStatus +"error: "+errorThrown);
      },
      timeout:50000,
    });

  };

  window.chocolate=chocolate;
  window.chocolateUrl="http://www1034up.sakura.ne.jp:8080/chocolate"
}());


//画面初期ロード時のロジックを記述
$(function() {
  $( "#kuma" ).draggable({
          stop: function( event, ui ) {
            console.log(ui.position.top);
            console.log(ui.position.left);
          }
        });
});