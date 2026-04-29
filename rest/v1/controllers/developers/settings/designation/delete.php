<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Designation($conn);

if(array_key_exists("id",$_GET)){
$val->designation_aid = $_GET['id'];

// VALIDATION
checkId($val->designation_aid);

$query = checkDelete($val);
http_response_code(200);
returnSuccess($val, "Designation Delete", $query);
}

checkEndpoint();

