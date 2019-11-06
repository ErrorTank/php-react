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
        $query = $this->role  == '0' ?  'SELECT * from ' . $this->table . ' a inner join candidate c on a.accountID = c.accountID where a.username = :username' : 'SELECT * from ' . $this->table . ' a inner join company c on a.accountID = c.accountID where a.username = :username';
        $stmt = $this->conn->prepare($query);

                 $stmt->bindParam(":username", $this->username);
         $stmt->execute();
                 $result = $stmt->fetch(PDO::FETCH_ASSOC);
          return $this->role == '0' ? array(
            'accountID' => $result['accountID'],
                        'username' => $result['username'],

                        'role' => $result['role'],
                        "candidateID" =>$result['candidateID'],
                                    "email" =>$result['email'],
                                         "fullname" => $result['fullname'],
                                         "address" =>$result['address'],
                                         "phone" =>$result['phone']

           ) :array(
                          'accountID' => $result['accountID'],
                                      'username' => $result['username'],

                                      'role' => $result['role'],
                                      "companyID" =>$result['companyID'],
                                      "email" =>$result['email'],
                                           "companyName" => $result['companyName'],
                                           "address" =>$result['address'],
                                           "phone" =>$result['phone']
                       ) ;
    }
    public function login(){
        $query = $this->role == '0' ?  'SELECT * from ' . $this->table . ' a inner join candidate c on a.accountID = c.accountID where a.username = :username and a.password = :password' : 'SELECT * from ' . $this->table . ' a inner join company c on a.accountID = c.accountID where a.username = :username and a.password = :password';
        $stmt = $this->conn->prepare($query);

         $stmt->bindParam(":username", $this->username);
         $stmt->bindParam(":password", $this->password);
         $stmt->execute();
         $result = $stmt->fetch(PDO::FETCH_ASSOC);

         return $result ? $this->role == '0' ? array(
            'accountID' => $result['accountID'],
            'username' => $result['username'],

            'role' => $result['role'],
            "candidateID" =>$result['candidateID'],
            "email" =>$result['email'],
                 "fullname" => $result['fullname'],
                 "address" =>$result['address'],
                 "phone" =>$result['phone']
         ) : array(
            'accountID' => $result['accountID'],
                        'username' => $result['username'],

                        'role' => $result['role'],
                        "companyID" =>$result['companyID'],
                        "email" =>$result['email'],
                             "companyName" => $result['companyName'],
                             "address" =>$result['address'],
                             "phone" =>$result['phone']
         ) : false;
    }





  }
