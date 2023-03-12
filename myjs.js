var JSONobj;
var games;

function Connect(){
    var getJSON = function(url, callback) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        
        xhr.responseType = 'json';
    
        xhr.onload = function() {
    
            var status = xhr.status;
    
            if (status == 200) {
                callback(null, xhr.response);
            } else {
                callback(status);
            }
        };
    
        xhr.send();
    };
    //the request to get json from steam include the game of appid and name
    getJSON('https://api.steampowered.com/ISteamApps/GetAppList/v2/',  function(err, data) {
    
        if (err != null) {
            console.error(err);
        } else {
                JSONobj=data;
                listgame=JSONobj.applist.apps;

        }
        
    });

}



function search(str){

    var result=false;
    var GM=document.getElementById("Game");
    removeAllChildNodes(GM);
    var node =  null;
    const br=document.createElement("br");
    for(var i=0;i<listgame.length;i++){
        
        if(listgame[i].name.includes(str)){
            result=true;
            const div=document.createElement("div"); 
            const a=document.createElement("a"); 
            node = document.createTextNode(listgame[i].name);
            a.setAttribute("href","https://store.steampowered.com/app/"+listgame[i].appid);
            a.appendChild(node);
            div.appendChild(a);
            GM.appendChild(div);
           
        }
    }
    if(result ==false)
    {
        const para = document.createElement("div");
        node = document.createTextNode("null");
        para.appendChild(node);
        GM.appendChild(para);
        GM.appendChild(document.createElement("br"));
    }
        

    
           

}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

}