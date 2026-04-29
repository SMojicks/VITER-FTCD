<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Notification($conn);

if(array_key_exists("id",$_GET)){
$val->notification_aid = $_GET['id'];
$val->notification_name = $data['notification_name'];
$val->notification_email = $data['notification_email'];
$val->notification_phone = $data['notification_phone'];
$val->notification_purpose = $data['notification_purpose'];
$val->notification_updated = date("Y-m-d H:m:s");
$notification_name_old = $data['notification_name_old'];

// VALIDATIONS
checkId($val->notification_aid);
compareName(
    $val, //models
    $notification_name_old, //old record
    $val->notification_name //new record
    );

$query = checkUpdate($val);
http_response_code(200);
returnSuccess($val, "Notification Update", $query);
}

checkEndpoint();

