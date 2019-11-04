<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Content-Type: application/json;charset=utf-8');

  include_once '../../config/Database.php';
  include_once '../../models/Company.php';


  $database = new Database();
  $db = $database->connect();


  $company = new Company($db);
  $company->companyID = isset($_GET['id']) ? $_GET['id'] : "";

  $company->getDetails();


  $company_arr = array(
     "companyName" => $company->companyName,
     "address" => $company->address,
     "avatar" => $company->avatar,
     "phone" => $company->phone,
     "email" => $company->email,
     "description" => $company->description
   );


  print_r(json_encode($company_arr, JSON_UNESCAPED_UNICODE));
