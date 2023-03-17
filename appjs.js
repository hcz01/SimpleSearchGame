
$(document).ready(function(){

    var json_data = localStorage.getItem('info');
    var data = JSON.parse(json_data);
    document.title =data.name
    // use try catch can avoid the incomplete data
    try{
    //images
    var header_image=$("<img>").attr("src",data.header_image);
    //text
    var name=$("<h1></h1>").text(data.name);
    var detail=$("<h2></h2>").text("More detail");
    var developers=$("<p></p>").text("developers:"+data.developers);
    var publishers=$("<p></p>").text("publishers:"+data.publishers);
    var detailed_description=$("<p></p>").html(data.detailed_description).attr("class","fs-5 col-md-8");
    var price_overview_final_formatted=$("<p></p>").text("price: "+(typeof data.includes(price_overview)=== 'undefined')?data.price_overview.final_formatted:"nothing");
    var release_date_date=$("<p></p>").text("release_date_date: "+( typeof  data.includes(release_date) === 'undefined' )?data.release_date.date:"nothing");//data.release_date.date
    var link=$("<a></a>").text(data.name).attr("class","btn btn-primary btn-lg px-4").attr("href","https://store.steampowered.com/app/"+data.steam_appids);
    }catch(e){
        console.log(e);
    }
    $('#about_game').prepend(header_image);
    $('#main').prepend(name,detailed_description);
    $('#game_link').prepend(link);
    $('#footer').prepend(detail,developers,publishers,price_overview_final_formatted,release_date_date);
    localStorage.clear();
});
   

