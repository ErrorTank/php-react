<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Content-Type: application/json;charset=utf-8');

  include_once '../../config/Database.php';
  include_once '../../models/Job.php';


  $database = new Database();
  $db = $database->connect();


  $job = new Job($db);
  $job->jobID = isset($_GET['id']) ? $_GET['id'] : "";

  $job->getDetails();


  $job_arr = array(
     "label" => $job->label,
     "salaryStart" => $job->salaryStart,
     "salaryEnd" => $job->salaryEnd ,
     "owner" => $job->owner,
     "deadline" =>         $job->deadline,
     "requiredExperiment" =>          $job->requiredExperiment,
     "requiredLevel" =>          $job->requiredLevel,
     "quantity" =>                $job->quantity,
     "workType" =>                $job->workType ,
     "desiredLevel" =>                $job->desiredLevel,
     "requiredGender" =>                $job->requiredGender ,
     "description" =>                $job->description,
     "priority" =>                $job->priority,
     "jobRequired" =>                $job->jobRequired,
     "itemRequired" =>                $job->itemRequired,
     "contact" =>                $job->contact,
     "territories" =>                $job->territories ,
     "places" =>                $job->places
   );


  print_r(json_encode($job_arr, JSON_UNESCAPED_UNICODE));
