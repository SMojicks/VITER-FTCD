<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Notification($conn);

$val->notification_is_active = 1;
$val->notification_name = trim($data['notification_name']);
$val->notification_email = $data['notification_email'];
$val->notification_phone = $data['notification_phone'];
$val->notification_purpose = $data['notification_purpose'];
$val->notification_created = date("Y-m-d H:m:s");
$val->notification_updated = date("Y-m-d H:m:s");

//VALIDATIONS
isNameExist($val, $val->notification_name);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Notification Create", $query);
