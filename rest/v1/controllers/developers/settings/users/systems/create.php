<?php 
require '../../../../../notifications/verify-account.php';


// checkdatabase connection
$conn = null;
$conn = checkDbConnection();      
// make use of classes for save database
$val = new Systems($conn);
$encrypt = new Encryption();

$val->system_is_active = 1;
$val->system_first_name = trim($data['system_first_name']);
$val->system_last_name = trim($data['system_last_name']);
$val->system_email = $data['system_email'];
$val->system_password = '';
$val->system_key = $encrypt->doHash(rand());
$val->system_role_id = $data['system_role_id'];
$val->system_created = date("Y-m-d H:m:s");
$val->system_updated = date("Y-m-d H:m:s");
$password_link = "/create-password";

$emailSendCount = 0;
$query = checkCreate($val);
if($query->rowCount() > 0 ){
    $sendEmail = sendEmail(
        $password_link,
        $val->system_first_name,
        $val->system_email,
        $val->system_key,
    );
    if($sendEmail['mail_success']) $emailSendCount++;
}
http_response_code(200);
returnSuccess($val, "Systems Create", $query, $emailSendCount);
