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



  }
