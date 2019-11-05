<?php
  class Candidate {

    private $conn;
    private $table = 'candidate';

    public $candidateID;
    public $email;
    public $fullname;
    public $address;
    public $phone;
    public $label;
    public $desiredLevel;
    public $experimentTime;
    public $selfLevel;
    public $workType;
    public $selfTarget;
        public $selfSkill;
        public $avatar;
        public $dob;
        public $salaryStart;
        public $salaryEnd;
        public $gender;
         public $places;
            public $territories;

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



public function getDetails() {

          $query1 = 'select ca.candidateID, ca.email, ca.fullname, ca.address, ca.phone, ca.label, l.label as selfLevel, ca.experimentTime, ca.workType, dl.label as desiredLevel, ca.selfTarget, ca.selfSkill, ca.avatar, ca.dob, ca.salaryStart, ca.salaryEnd, ca.gender from candidate ca  inner join desiredLevel dl on dl.dlID = ca.desiredLevel inner join level l on l.levelID = ca.selfLevel where ca.candidateID = ?';
          $query2 = 'select * from placecandidate pc inner join workingplace w on w.wpID = pc.wpID where pc.candidateID = ?';
          $query3 = 'select * from territorycandidate tc inner join territory t on t.territoryID = tc.territoryID where tc.candidateID = ?';


          $stmt1 = $this->conn->prepare($query1);
          $stmt2 = $this->conn->prepare($query2);
          $stmt3 = $this->conn->prepare($query3);

          $stmt1->bindParam(1, $this->candidateID);
          $stmt2->bindParam(1, $this->candidateID);
          $stmt3->bindParam(1, $this->candidateID);


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


          $this->email = $row1['email'];
          $this->fullname = $row1['fullname'];
          $this->address = $row1['address'];
          $this->phone = $row1['phone'];
          $this->label = $row1['label'];
          $this->desiredLevel = $row1['desiredLevel'];
                $this->experimentTime = $row1['experimentTime'];
                $this->selfLevel = $row1['selfLevel'];
                $this->workType = $row1['workType'];
                $this->selfTarget = $row1['selfTarget'];
                $this->selfSkill = $row1['selfSkill'];
                $this->avatar = $row1['avatar'];
                $this->dob = $row1['dob'];
                $this->salaryStart = $row1['salaryStart'];
                $this->salaryEnd = $row1['salaryEnd'];
                $this->gender = $row1['gender'];
                $this->territories = $territories;
                $this->places = $places;

    }

  }
