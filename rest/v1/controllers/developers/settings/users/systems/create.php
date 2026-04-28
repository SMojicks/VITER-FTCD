<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Systems($conn);

$val->system_is_active = 1;
$val->system_first_name = trim($data['system_first_name']);
$val->system_last_name = trim($data['system_last_name']);
$val->system_email = $data['system_email'];
$val->system_role_id = $data['system_role_id'];
$val->system_created = date("Y-m-d H:m:s");
$val->system_updated = date("Y-m-d H:m:s");

//VALIDATIONS
isNameExist($val, $val->system_first_name);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Systems Create", $query);
