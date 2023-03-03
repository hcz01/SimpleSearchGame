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
function getGameData(JSONobj){
        var listgame=JSONobj.applist.apps;

}

function PrintJSON(){
    getGameData(JSONobj);
    var GM=document.getElementById("Game");

    for(var i=0;i<listgame.length;i++){
        const para = document.createElement("span");
        const node = document.createTextNode(listgame[i].name+" "+listgame[i].appid);
        para.appendChild(node);
        GM.appendChild(para);
        GM.appendChild(document.createElement("br"));
    }


}
