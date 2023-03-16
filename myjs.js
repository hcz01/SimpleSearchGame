
$(document).ready(function(){
  $('#game_name').keypress(debounce(function (event) {
      
        var xmlhttp=new XMLHttpRequest();
        //waitting the ajax response
        xmlhttp.onreadystatechange=function() {
          if (this.readyState==4 && this.status==200) {
            //once finished searching close the loading mode
            $("body").removeClass("loading"); 
            var data=JsonReader(this.responseText);
            ShowData(data,"Games");
            document.getElementById("Games").style.border="1px solid #A5ACB2";
          }
        }
        //send ajax response
        xmlhttp.open("GET","indexphp.php?q="+$('#game_name').val(),true);
        xmlhttp.send();
        //once start searching active the loading mode
        $("body").addClass("loading");  
    }, 250));
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

//once get response changes to var 
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
          // put certain info about last 10 games close input
          var detail=data[index].detail;
          
          const div=document.createElement("div"); 
          const p=document.createElement("p");
          const img=document.createElement('img');

          var gamename = document.createTextNode(data[index].name);
          div.setAttribute("id",data[index].appid);
            img.setAttribute("src",detail.header_image);
         
          p.appendChild(gamename);
          p.appendChild(img);
          div.appendChild(p);
          GM.appendChild(div);
          //add a listener for each game to open new window about that game
          var buttonAppid = document.getElementById(data[index].appid);
          buttonAppid.addEventListener('click',function() {redirectWithJson(JSON.stringify(detail));});
          console.log(data[index].appid+"  :"+ JSON.stringify(detail));
  }
}
//has the problem the problem i cant use ajax send json file because it compose a URI longer
function redirectWithJson(str){
  
  localStorage.setItem('info', str);
  alert(str);
  var url = './app.php';
  window.location.href = url;
  }