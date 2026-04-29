<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Designation($conn);

if(array_key_exists("id",$_GET)){
$val->designation_aid = $_GET['id'];
$val->designation_name = $data['designation_name'];
$val->designation_category_id = $data['designation_category_id'];
$val->designation_updated = date("Y-m-d H:m:s");

$designation_name_old = $data['designation_name_old'];

// VALIDATIONS
checkId($val->designation_aid);
compareName(
    $val, //models
    $designation_name_old, //old record
    $val->designation_name //new record
    );

$query = checkUpdate($val);
http_response_code(200);
returnSuccess($val, "Designation Update", $query);
}

checkEndpoint();

