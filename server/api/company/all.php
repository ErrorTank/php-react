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
  $company->keyword = isset($_GET['keyword']) ? $_GET['keyword'] : "";

  $result = $company->read();


  $num = $result->rowCount();


  if($num > 0) {

        $cat_arr = array();
        $cat_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $cat_item = array(
            'companyID' => $companyID,
            'companyName' => $companyName,
            'avatar' => $avatar
          );



          array_push($cat_arr['data'], $cat_item);
        }


        print_r(json_encode($cat_arr, JSON_UNESCAPED_UNICODE));


  } else {
        print_r(json_encode( array('message' => 'No Companies Found')));

  }
