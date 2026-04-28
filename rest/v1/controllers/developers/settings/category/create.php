<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Category($conn);

$val->category_is_active = 1;
$val->category_name = trim($data['category_name']);
$val->category_description = $data['category_description'];
$val->category_created = date("Y-m-d H:m:s");
$val->category_updated = date("Y-m-d H:m:s");

//VALIDATIONS
isNameExist($val, $val->category_name);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Category Create", $query);
