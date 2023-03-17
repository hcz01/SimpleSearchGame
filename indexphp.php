
<?php
// set memory limit as 200M
ini_set('memory_limit', '200M');
//we need turn on CORS 
// Access-Control headers are received during OPTIONS requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


//get file json from url

$url='https://api.steampowered.com/ISteamApps/GetAppList/v2/';
$data=requestAPi($url,null);
$characters=json_decode($data,true);
$apps=$characters['applist']['apps'];


$q=$_GET["q"];  
$found=null;
$index=0;
if (strlen($q)>0) {
    $found=array();
    
    foreach ($apps as $app) {
        if($index==10)
            break;

        if(stripos($app['name'], $q) !== false)
               {
                //if(FindDetails($app['appid'])['type']=="game"){
                    $index++;
                    array_push($found,$data = [
                        'name' => $app['name'],
                        'appid' => $app['appid'],
                        'detail' =>FindDetails($app['appid'])
                            ]);
                        
               // }
               
               }
                            
    }
    if(count($found)==0)
        array_push($found,$data = ["not found"]);
    
  }
    if($found!=null)
        $response=json_encode($found);
    echo $response;

function FindDetails($appid){  
   
$parameter=array(
    'appids' => $appid,
    'cc' =>  'EE',
    'l' => 'english',
    'v' => '1',
);
$urldetails='https://store.steampowered.com/api/appdetails/?';  
$data=requestAPi($urldetails,$parameter);
$data=json_decode($data,true);
    if (isset($data[$appid]['data'])) 
        $details=$data[$appid]['data'];
    else 
        $details=NULL; 

return $details ;
}
//make a request for api with parameter and it back response
function requestAPi($url,$parameter){
    //avoid the error bring convert json error
    $data = stream_context_create(array(
        'http' => array(
            'ignore_errors' => true
        )
    ));
    header("Content-Type: application/json");
    if(is_null($parameter )==true)
        $data=file_get_contents($url);
    else
        {
            $url=$url.http_build_query($parameter);
            $data=file_get_contents($url, false, $data);
        }
    return $data;
}
?>
