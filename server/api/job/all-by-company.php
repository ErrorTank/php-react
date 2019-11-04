<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Job.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate category object
  $job = new Job($db);
  $job->owner = isset($_GET['id']) ? $_GET['id'] : "";

  // Category read query
  $result = $job->getJobsByCompanyID();

  // Get row count
  $num = $result->rowCount();

  // Check if any categories
  if($num > 0) {
        // Cat array
        $cat_arr = array();
        $cat_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $cat_item = array(
            'jobID' => $jobID,
            'label' => $label,
            'deadline' => $deadline,
            'salaryStart' => $salaryStart,
            'salaryEnd' => $salaryEnd,
            'quantity' => $quantity,
            'workPlaces' => array()
          );
           $result2 = $job->getJobWorkPlace($jobID);


           $num2 = $result2->rowCount();

           if($num2 > 0){
                while($row2 = $result2->fetch(PDO::FETCH_ASSOC)){
                    extract($row2);
                    $temp = array(
                        'wpID' => $wpID,
                        'label' => $label
                    );
                    array_push($cat_item['workPlaces'], $temp);
                }
           }



          // Push to "data"
          array_push($cat_arr['data'], $cat_item);
        }

        // Turn to JSON & output
        print_r(json_encode($cat_arr, JSON_UNESCAPED_UNICODE));

  } else {
        // No Categories
       print_r(json_encode( array('message' => 'No Jobs Found')));
  }
