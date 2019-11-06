<?php
require "../../vendor/autoload.php";
use \Firebase\JWT\JWT;
include_once '../../config/Database.php';
include_once '../../models/Company.php';
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
        $company = new Company($db);

        $company->companyID = isset($_GET['id']) ? $_GET['id'] : "";
        $result = $company->getApplied();
        $num = $result->rowCount();


          if($num > 0) {

                $cat_arr = array();
                $cat_arr['data'] = array();

                while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                  extract($row);

                  $cat_item = array(
                    'candidateID' => $candidateID,
                    'fullname' => $fullname,
                    'avatar' => $avatar,
                    'label' => $label,
                    'dob' => $dob,
                    'salaryStart' => $salaryStart,
                    'salaryEnd' => $salaryEnd,
                    'phone' => $phone,
                    'address' => $address,
                    'email' => $email
                  );



                  array_push($cat_arr['data'], $cat_item);
                }

                    http_response_code(200);
                print_r(json_encode($cat_arr, JSON_UNESCAPED_UNICODE));


          } else {
                print_r(json_encode( array('message' => 'No Applied Found')));

          }



    }catch (Exception $e){

    http_response_code(401);

    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage()
    ));
}

}



?>