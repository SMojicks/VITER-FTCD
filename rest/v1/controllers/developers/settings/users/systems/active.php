<?php
//set http header
require '../../../../../core/header.php';

// use needed functions
require '../../../../../core/functions.php'; 

//use models
require '../../../../../models/developers/settings/users/systems/Systems.php';
// store models into variables 

// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Systems($conn);

// get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(array_key_exists('id',$_GET)){
    //check data if exist and data is required
    checkPayload($data);
    $val->system_aid = $_GET['id'];
    $val->system_is_active = trim($data['isActive']);
    $val->system_updated = date("Y-m-d H:m:s");

    //validate is id
    checkId($val->system_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'role active', $query);
}
//return 404 if end point not available
checkEndpoint();