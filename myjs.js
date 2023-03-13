var JSONobj;
var games;

$(document).ready(function(){
    $('#game_name').keypress(debounce(function (event) {
        
          var xmlhttp=new XMLHttpRequest();
          xmlhttp.onreadystatechange=function() {
            if (this.readyState==4 && this.status==200) {
              var data=JsonReader(this.responseText);
              ShowData(data,"Games");
              document.getElementById("Games").style.border="1px solid #A5ACB2";
            }
          }
          xmlhttp.open("GET","indexphp.php?q="+$('#game_name').val(),true);
          xmlhttp.send();
      }, 500));


});



//delay insect input 
  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

 
  
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

}

  


function JsonReader(result){
        var data = JSON.parse(result);
        return data;
}
function ShowData(data,ElementID){
    var GM=document.getElementById(ElementID);
    removeAllChildNodes(GM);
    for (let index = 0; index <data.length;index++) {
        //not exist the game
        if(typeof data[index].name  === 'undefined')
           break;
        //is not game but like packege 
        if( data[index].detail === null)
            continue;
           const div=document.createElement("div"); 
           const a=document.createElement("a");
           const img=document.createElement('img'); 
           node = document.createTextNode(data[index].name);
            img.setAttribute("src",data[index].detail.header_image);
           a.setAttribute("href","https://store.steampowered.com/app/"+data[index].appid);
           a.appendChild(node);
           a.appendChild(img);
           div.appendChild(a);
       
           GM.appendChild(div);
    }
}
