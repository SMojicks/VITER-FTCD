<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Category($conn);

if(array_key_exists("id",$_GET)){
$val->category_aid = $_GET['id'];
$val->category_name = $data['category_name'];
$val->category_description = $data['category_description'];
$val->category_updated = date("Y-m-d H:m:s");
$category_name_old = $data['category_name_old'];

// VALIDATIONS
checkId($val->category_aid);
compareName(
    $val, //models
    $category_name_old, //old record
    $val->category_name //new record
    );

$query = checkUpdate($val);
http_response_code(200);
returnSuccess($val, "Category Update", $query);
}

checkEndpoint();

