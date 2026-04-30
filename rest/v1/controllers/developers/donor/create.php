<?php 

// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Donor($conn);

$val->donor_is_active = 1;
$val->donor_name = trim($data['donor_name']);
$val->donor_email = trim($data['donor_email']);
$val->donor_contact = trim($data['donor_contact']);
$val->donor_address = trim($data['donor_address']);
$val->donor_city = trim($data['donor_city']);
$val->donor_province = trim($data['donor_province']);
$val->donor_country = trim($data['donor_country']);
$val->donor_zip = trim($data['donor_zip']);
// Fixed Time Format to i instead of m
$val->donor_created = date("Y-m-d H:i:s");
$val->donor_updated = date("Y-m-d H:i:s");

//VALIDATIONS
isNameExist($val, $val->donor_name);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Donor Create", $query);