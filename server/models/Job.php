<?php
  class Job {

    private $conn;
    private $table = 'job';

    public $keyword;
    public $workPlace;
    public $territory;

    public $jobID;
    public $label;
    public $salaryStart;
    public $salaryEnd;
    public $owner;
    public $deadline;
    public $requiredExperiment;
    public $requiredLevel;
    public $quantity;
    public $workType;
    public $desiredLevel;
    public $requiredGender;
    public $description;
    public $priority;
    public $jobRequired;
    public $itemRequired;
    public $contact;
    public $places;
    public $territories;

    public function __construct($db) {
      $this->conn = $db;
    }


    public function read() {


      $query = 'SELECT * FROM ' . $this->table . ' c inner join company co on co.companyID = c.owner where ' . ($this->keyword == '' ? '1=1' : ' c.label like :keyword') . ($this->workPlace == '' ? ' and 1=1 ' : ' and c.jobID in (select jobID from placejob pc where pc.wpID = :workPlace)') . ($this->territory == '' ? ' and 1=1 ' : ' and c.jobID in (select jobID from territoryjob tc where tc.territoryID = :territory)');


      // Prepare statement
      $stmt = $this->conn->prepare($query);

      if($this->keyword != ''){
        $firstValue = '%' . $this->keyword . '%';
        $stmt->bindParam(":keyword", $firstValue);

      }

      if($this->workPlace != ''){

        $stmt->bindParam(":workPlace", $this->workPlace);

      }
      if($this->territory != ''){
        $stmt->bindParam(":territory", $this->territory);

      }

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    public function getJobsByCompanyID() {
          // Create query

           $query = 'SELECT * FROM ' . $this->table . ' c where owner = ?';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          $stmt->bindParam(1, $this->owner);


          // Execute query
          $stmt->execute();

          return $stmt;
        }
    public function getJobWorkPlace($jobID){

        $query = 'SELECT * FROM placejob pj inner join workingplace w on w.wpID = pj.wpID where pj.jobID = ?';
        $stmt = $this->conn->prepare($query);

                  $stmt->bindParam(1, $jobID);


                  // Execute query
                  $stmt->execute();

                  return $stmt;
    }
    // Get Single Post
    public function read_single() {
          // Create query
          $query = 'SELECT c.name as category_name, p.id, p.category_id, p.title, p.body, p.author, p.created_at
                                    FROM ' . $this->table . ' p
                                    LEFT JOIN
                                      categories c ON p.category_id = c.id
                                    WHERE
                                      p.id = ?
                                    LIMIT 0,1';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Bind ID
          $stmt->bindParam(1, $this->id);

          // Execute query
          $stmt->execute();

          $row = $stmt->fetch(PDO::FETCH_ASSOC);

          // Set properties
          $this->title = $row['title'];
          $this->body = $row['body'];
          $this->author = $row['author'];
          $this->category_id = $row['category_id'];
          $this->category_name = $row['category_name'];
    }
public function getDetails() {

          $query1 = 'select j.jobID, j.label, j.salaryStart, j.salaryEnd, j.deadline, j.requiredExperiment, l.label as requiredLevel, j.quantity, j.workType, dl.label as desiredLevel, j.requiredGender, j.description, j.priority, j.jobRequired, j.itemRequired, j.contact, c.companyID, c.companyName, c.address, c.avatar, c.phone, c.email from job j inner join company c on j.owner = c.companyID inner join desiredLevel dl on dl.dlID = j.desiredLevel inner join level l on l.levelID = j.requiredLevel where j.jobID = ?';
          $query2 = 'select * from placejob pj inner join workingplace w on w.wpID = pj.wpID where pj.jobID = ?';
          $query3 = 'select * from territoryjob tj inner join territory t on t.territoryID = tj.territoryID where tj.jobID = ?';


          $stmt1 = $this->conn->prepare($query1);
          $stmt2 = $this->conn->prepare($query2);
          $stmt3 = $this->conn->prepare($query3);

          $stmt1->bindParam(1, $this->jobID);
          $stmt2->bindParam(1, $this->jobID);
          $stmt3->bindParam(1, $this->jobID);


          $stmt1->execute();
          $stmt2->execute();
          $stmt3->execute();

          $row1 = $stmt1->fetch(PDO::FETCH_ASSOC);

          $row3 = $stmt3->fetch(PDO::FETCH_ASSOC);
          $places = array();
          $territories = array();
           while($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                    extract($row2);

                    $item = array(
                      'wpID' => $wpID,
                      'label' => $label
                    );



                    array_push($places, $item);
                  }
           while($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
                               extract($row3);

                               $item = array(
                                 'territoryID' => $territoryID,
                                 'label' => $label
                               );



                               array_push($territories, $item);
                             }


          $this->label = $row1['label'];
          $this->salaryStart = $row1['salaryStart'];
          $this->salaryEnd = $row1['salaryEnd'];
          $this->owner = array(
            "companyID" => $row1["companyID"],
            "companyName" => $row1["companyName"],
            "address" => $row1["address"],
            "avatar" => $row1["avatar"],
            "email" => $row1["email"],
            "phone" => $row1["phone"]
          );
          $this->deadline = $row1['deadline'];
          $this->requiredExperiment = $row1['requiredExperiment'];
          $this->requiredLevel = $row1['requiredLevel'];
                $this->quantity = $row1['quantity'];
                $this->workType = $row1['workType'];
                $this->desiredLevel = $row1['desiredLevel'];
                $this->requiredGender = $row1['requiredGender'];
                $this->description = $row1['description'];
                $this->priority = $row1['priority'];
                $this->jobRequired = $row1['jobRequired'];
                $this->itemRequired = $row1['itemRequired'];
                $this->contact = $row1['contact'];
                $this->territories = $territories;
                $this->places = $places;

    }


  }
