<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Notification($conn);

if(array_key_exists("id",$_GET)){
$val->notification_aid = $_GET['id'];

// VALIDATION
checkId($val->notification_aid);

$query = checkDelete($val);
http_response_code(200);
returnSuccess($val, "Notification Delete", $query);
}

checkEndpoint();

