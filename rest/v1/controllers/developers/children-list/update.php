<?php 


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new ChildrenList($conn);

if(array_key_exists("id",$_GET)){
$val->childrenList_aid = $_GET['id'];
$val->childrenList_name = trim($data['childrenList_name']);
$val->childrenList_birthday = trim($data['childrenList_birthday']);
$val->childrenList_age = trim($data['childrenList_age']);
$val->childrenList_residency = trim($data['childrenList_residency']);
$val->childrenList_limit = trim($data['childrenList_limit']);
$val->childrenList_story = trim($data['childrenList_story']);
$val->childrenList_created = date("Y-m-d H:m:s");
$val->childrenList_updated = date("Y-m-d H:m:s");
$childrenList_name_old = $data['childrenList_name_old'];

// VALIDATIONS
checkId($val->childrenList_aid);
compareName(
    $val, //models
    $childrenList_name_old, //old record
    $val->childrenList_name //new record
    );

$query = checkUpdate($val);
http_response_code(200);
returnSuccess($val, "Children List Update", $query);
}

checkEndpoint();

