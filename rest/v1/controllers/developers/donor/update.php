<?php 

// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Donor($conn);

if(array_key_exists("id",$_GET)){
    $val->donor_aid = $_GET['id'];
    $val->donor_name = trim($data['donor_name']);
    $val->donor_email = trim($data['donor_email']);
    $val->donor_contact = trim($data['donor_contact']);
    $val->donor_address = trim($data['donor_address']);
    $val->donor_city = trim($data['donor_city']);
    $val->donor_province = trim($data['donor_province']);
    $val->donor_country = trim($data['donor_country']);
    $val->donor_zip = trim($data['donor_zip']);
    // Fixed Time Format to i instead of m
    $val->donor_updated = date("Y-m-d H:i:s");
    
    $donor_name_old = $data['donor_name_old'];

    // VALIDATIONS
    checkId($val->donor_aid);
    compareName(
        $val, //models
        $donor_name_old, //old record
        $val->donor_name //new record
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Donor Update", $query);
}

checkEndpoint();