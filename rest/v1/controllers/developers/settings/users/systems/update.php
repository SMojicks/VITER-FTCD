<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Systems($conn);

if(array_key_exists("id",$_GET)){
$val->system_aid = $_GET['id'];
$val->system_first_name = $data['system_first_name'];
$val->system_last_name = $data['system_last_name'];
$val->system_role_id = $data['system_role_id'];
$val->system_email = $data['system_email'];
$val->system_updated = date("Y-m-d H:m:s");

$system_name_old = $data['system_name_old'];

// VALIDATIONS
checkId($val->system_aid);
compareName(
    $val, //models
    $system_name_old, //old record
    $val->system_first_name //new record
    );

$query = checkUpdate($val);
http_response_code(200);
returnSuccess($val, "Systems Update", $query);
}

checkEndpoint();

