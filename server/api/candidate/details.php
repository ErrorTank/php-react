<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Content-Type: application/json;charset=utf-8');

  include_once '../../config/Database.php';
  include_once '../../models/Candidate.php';


  $database = new Database();
  $db = $database->connect();


  $candidate = new Candidate($db);
  $candidate->candidateID = isset($_GET['id']) ? $_GET['id'] : "";

  $candidate->getDetails();


  $candidate_arr = array(
     "email" => $candidate->email,
     "fullname" => $candidate->fullname,
     "address" => $candidate->address ,
     "phone" => $candidate->phone,
     "label" =>         $candidate->label,
     "desiredLevel" =>          $candidate->desiredLevel,
     "experimentTime" =>          $candidate->experimentTime,
     "selfLevel" =>                $candidate->selfLevel,
     "workType" =>                $candidate->workType ,
     "selfTarget" =>                $candidate->selfTarget,
     "selfSkill" =>                $candidate->selfSkill ,
     "avatar" =>                $candidate->avatar,
     "dob" =>                $candidate->dob,
     "salaryStart" =>                $candidate->salaryStart,
     "salaryEnd" =>                $candidate->salaryEnd,
     "gender" =>                $candidate->gender,
     "territories" =>                $candidate->territories ,
     "places" =>                $candidate->places
   );


  print_r(json_encode($candidate_arr, JSON_UNESCAPED_UNICODE));
