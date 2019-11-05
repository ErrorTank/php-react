<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Candidate.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate category object
  $candidate = new Candidate($db);
  $candidate->keyword = isset($_GET['keyword']) ? $_GET['keyword'] : "";
  $candidate->workPlace = isset($_GET['workPlace']) ? $_GET['workPlace'] : "";
  $candidate->territory = isset($_GET['territory']) ? $_GET['territory'] : "";
   $candidate->selfLevel = isset($_GET['level']) ? $_GET['level'] : "";
    $candidate->workType = isset($_GET['workType']) ? $_GET['workType'] : "";
    $candidate->gender = isset($_GET['gender']) ? $_GET['gender'] : "";
    $candidate->desiredLevel = isset($_GET['desiredLevel']) ? $_GET['desiredLevel'] : "";
  // Category read query

  $result = $candidate->read();

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
            'candidateID' => $candidateID,
            'fullname' => $fullname,
            'avatar' => $avatar,
            'experimentTime' => $experimentTime,
            'label' => $label,
          );

          // Push to "data"
          array_push($cat_arr['data'], $cat_item);
        }

        // Turn to JSON & output
        print_r(json_encode($cat_arr, JSON_UNESCAPED_UNICODE));

  } else {
        // No Categories
       print_r(json_encode( array('message' => 'No Candidates Found')));
  }
