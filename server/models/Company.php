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


    public function __construct($db) {
      $this->conn = $db;
    }


    public function read() {


      $query = 'SELECT * FROM ' . $this->table . ' c where ' . ($this->keyword == '' ? '1=1' : ' companyName like :keyword or email like :keyword or phone like :keyword');



      $stmt = $this->conn->prepare($query);

      if($this->keyword != ''){
         $firstValue = '%' . $this->keyword . '%';
         $stmt->bindParam(":keyword", $firstValue);

      }


      $stmt->execute();

      return $stmt;
    }


    public function getDetails() {

          $query = 'select * from company co where companyID = ?';


          $stmt = $this->conn->prepare($query);


          $stmt->bindParam(1, $this->companyID);


          $stmt->execute();

          $row = $stmt->fetch(PDO::FETCH_ASSOC);


          $this->companyName = $row['companyName'];
          $this->address = $row['address'];
          $this->avatar = $row['avatar'];
          $this->phone = $row['phone'];
          $this->email = $row['email'];
          $this->description = $row['description'];
    }



  }
