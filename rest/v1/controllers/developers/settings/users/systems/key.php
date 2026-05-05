<?php

//set http header
require '../../../../../core/header.php';

// use needed functions
require '../../../../../core/functions.php'; 

//use models
require '../../../../../models/developers/settings/users/systems/Systems.php';

//database
$conn = null;
$conn = checkDbConnection();
$val = new Systems($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(isset($_SERVER['HTTP_AUTHORIZATION'])){
    // validate data
    // checkPayload($data);
    if(array_key_exists('key',$_GET)){
        $val->system_key = $_GET['key'];
        $query = checkReadKey($val);
        http_response_code(200);
        GetQueriedData($query);
    }
    checkEndpoint();
}
    http_response_code(200);
    checkAccess();
