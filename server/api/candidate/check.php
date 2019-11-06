<?php
require "../../vendor/autoload.php";
use \Firebase\JWT\JWT;
include_once '../../config/Database.php';
include_once '../../models/Candidate.php';
include_once '../../utils.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$database = new Database();
$db = $database->connect();
$authHeader = apache_request_headers()['Authorization'];

$jwt = null;
$arr = explode(" ", $authHeader);
$secret_key = "kappa";

$jwt = $arr[1];

if($jwt){

    try {

        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));

        // Access is granted. Add code of the operation here
        $candidate = new candidate($db);
        $data = json_decode(file_get_contents("php://input"));
        $candidate->candidateID = isset($_GET['id']) ? $_GET['id'] : "";
        $result = $candidate->checkApply($data->jobID);

        http_response_code(200);

        echo  json_encode(array(
                     "message" => $result ? "success" : "fail",

                 ));

    }catch (Exception $e){

    http_response_code(401);

    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage()
    ));
}

}



?>