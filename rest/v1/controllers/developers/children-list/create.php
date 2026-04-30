<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new ChildrenList($conn);

$val->childrenList_is_active = 1;
$val->childrenList_name = trim($data['childrenList_name']);
$val->childrenList_birthday = trim($data['childrenList_birthday']);
$val->childrenList_age = trim($data['childrenList_age']);
$val->childrenList_residency = trim($data['childrenList_residency']);
$val->childrenList_limit = trim($data['childrenList_limit']);
$val->childrenList_story = trim($data['childrenList_story']);
$val->childrenList_created = date("Y-m-d H:m:s");
$val->childrenList_updated = date("Y-m-d H:m:s");

//VALIDATIONS
isNameExist($val, $val->childrenList_name);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Children List Create", $query);
