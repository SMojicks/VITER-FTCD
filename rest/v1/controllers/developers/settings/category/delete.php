<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Category($conn);

if(array_key_exists("id",$_GET)){
$val->category_aid = $_GET['id'];

// VALIDATION
checkId($val->category_aid);

$query = checkDelete($val);
http_response_code(200);
returnSuccess($val, "Category Delete", $query);
}

checkEndpoint();

