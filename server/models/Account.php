<?php
  class Account {

    private $conn;
    private $table = 'account';

    public $username;
    public $password;
    public $accountID;
    public $role;

    public function __construct($db) {
      $this->conn = $db;
    }


    public function getDetails(){
        $query = 'SELECT * from ' . $this->table . ' a inner join candidate c on a.accountID = c.accountID where a.username = :username';
        $stmt = $this->conn->prepare($query);

                 $stmt->bindParam(":username", $this->username);
         $stmt->execute();
                 $result = $stmt->fetch(PDO::FETCH_ASSOC);
          return array(
            'accountID' => $result['accountID'],
                        'username' => $result['username'],

                        'role' => $result['role'],
                        "candidateID" =>$result['candidateID'],
                                    "email" =>$result['email'],
                                         "fullname" => $result['fullname'],
                                         "address" =>$result['address'],
                                         "phone" =>$result['phone']

           );
    }
    public function login(){
        $query = 'SELECT * from ' . $this->table . ' a inner join candidate c on a.accountID = c.accountID where a.username = :username and a.password = :password';
        $stmt = $this->conn->prepare($query);

         $stmt->bindParam(":username", $this->username);
         $stmt->bindParam(":password", $this->password);
         $stmt->execute();
         $result = $stmt->fetch(PDO::FETCH_ASSOC);

         return $result ? array(
            'accountID' => $result['accountID'],
            'username' => $result['username'],

            'role' => $result['role'],
            "candidateID" =>$result['candidateID'],
            "email" =>$result['email'],
                 "fullname" => $result['fullname'],
                 "address" =>$result['address'],
                 "phone" =>$result['phone']
         ) : false;
    }





  }
