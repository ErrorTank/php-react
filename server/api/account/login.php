<?php
require "../../vendor/autoload.php";
use \Firebase\JWT\JWT;
include_once '../../config/Database.php';
include_once '../../models/Account.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$database = new Database();
$db = $database->connect();
$username = '';
$password = '';





$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;

$account = new Account($db);
$account->username = $username;
$account->password = $password;
$account->role = isset($_GET['role']) ? $_GET['role'] : "";
$result = $account->login();

$table_name = 'Account';

if($result){
    $secret_key = "kappa";

            $expire_claim = 3600; // expire time in seconds
            $token = array(

                "data" => $result
                );
            http_response_code(200);

            $jwt = JWT::encode($token, $secret_key);
            echo json_encode(
                        array(
                            "message" => "Successful login.",
                            "token" => $jwt,
                            "data" => $result,
                            "expireAt" => $expire_claim
                        ));
}
else{
http_response_code(401);
        echo json_encode(array("message" => "Login failed.", "password" => $password));
    }



?>