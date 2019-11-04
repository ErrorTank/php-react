<?php
  class Candidate {

    private $conn;
    private $table = 'candidate';

    public $keyword;
    public $workPlace;
    public $territory;
    public $companyID;
    public $companyName;
    public $address;
    public $avatar;
    public $phone;
    public $email;
    public $description;


    public function __construct($db) {
      $this->conn = $db;
    }


    public function read() {


      $query = 'SELECT * FROM ' . $this->table . ' c where ' . ($this->keyword == '' ? '1=1' : ' c.fullname like :keyword or c.label like :keyword or email like :keyword or phone like :keyword') . ($this->workPlace == '' ? ' and 1=1 ' : ' and c.candidateID in (select candidateID from placecandidate pc where pc.wpID = :workPlace)') . ($this->territory == '' ? ' and 1=1 ' : ' and c.candidateID in (select candidateID from territorycandidate tc where tc.territoryID = :territory)');



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
