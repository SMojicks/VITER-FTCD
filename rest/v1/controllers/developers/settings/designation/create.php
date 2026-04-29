<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Designation($conn);

$val->designation_is_active = 1;
$val->designation_name = trim($data['designation_name']);
$val->designation_category_id = $data['designation_category_id'];
$val->designation_created = date("Y-m-d H:m:s");
$val->designation_updated = date("Y-m-d H:m:s");

//VALIDATIONS
isNameExist($val, $val->designation_name);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Designation Create", $query);
