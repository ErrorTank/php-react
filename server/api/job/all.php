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
  $job->keyword = isset($_GET['keyword']) ? $_GET['keyword'] : "";
  $job->workPlace = isset($_GET['workPlace']) ? $_GET['workPlace'] : "";
  $job->territory = isset($_GET['territory']) ? $_GET['territory'] : "";
  $job->requiredLevel = isset($_GET['level']) ? $_GET['level'] : "";
      $job->workType = isset($_GET['workType']) ? $_GET['workType'] : "";
      $job->requiredGender = isset($_GET['gender']) ? $_GET['gender'] : "";
      $job->desiredLevel = isset($_GET['desiredLevel']) ? $_GET['desiredLevel'] : "";
  // Category read query
  $result = $job->read();

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
            'owner' => array(
              'companyID' => $companyID,
              'companyName' => $companyName,
              'avatar' => $avatar
            )
          );

          // Push to "data"
          array_push($cat_arr['data'], $cat_item);
        }

        // Turn to JSON & output
        print_r(json_encode($cat_arr, JSON_UNESCAPED_UNICODE));

  } else {
        // No Categories
       print_r(json_encode( array('message' => 'No Jobs Found')));
  }
