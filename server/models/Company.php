<?php
  class Company {

    private $conn;
    private $table = 'company';

    public $keyword;
    public $companyID;
    public $companyName;
    public $address;
    public $avatar;
    public $phone;
    public $email;
    public $description;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Posts
    public function read() {
      // Create query

      $query = 'SELECT * FROM ' . $this->table . ' c where ' . ($this->keyword == '' ? '1=1' : ' companyName like ?');


      // Prepare statement
      $stmt = $this->conn->prepare($query);
      $paramCount = 1;
      if($this->keyword != ''){
         $firstValue = '%' . $this->keyword . '%';
         $stmt->bindParam($paramCount, $firstValue);
         $paramCount++;
      }

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
