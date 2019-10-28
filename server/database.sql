CREATE TABLE `tuyendung`.`Account`(
    `accountID` NVARCHAR(10) NOT NULL,
    `username` NVARCHAR(50) NOT NULL,
    `password` NVARCHAR(50) NOT NULL,
    `role` INT(11) NOT NULL,
    `canLogin` BOOLEAN NOT NULL,
    PRIMARY KEY(`accountID`),
    UNIQUE(`username`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`Candidate`(
    `candidateID` NVARCHAR(10) NOT NULL,
    `email` NVARCHAR(50) NOT NULL,
    `fullname` NVARCHAR(50) NOT NULL,
    `address` NVARCHAR(200) NULL,
    `phone` NVARCHAR(50) NULL,
    `label` NVARCHAR(200) NOT NULL,
    `desiredLevel` NVARCHAR(10) NOT NULL,
    `experimentTime` INT(2) NOT NULL,
    `selfLevel` NVARCHAR(10) NOT NULL,
    `workType` ENUM('fulltime', 'parttime'),
    `selfTarget` NVARCHAR(200),
    `selfSkill` NVARCHAR(200),
    `accountID` NVARCHAR(10) NOT NULL,
    `dob` DATETIME NOT NULL,
    `salaryStart` INT(100) NOT NULL,
    `salaryEnd` INT(100) NOT NULL,
    `gender` INT(1) NOT NULL,
    PRIMARY KEY(`candidateID`),
    UNIQUE(`phone`),
    UNIQUE(`accountID`),
    UNIQUE(`email`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`Company`(
    `companyID` NVARCHAR(10) NOT NULL,
    `companyName` NVARCHAR(100) NOT NULL,
    `address` NVARCHAR(200) NULL,
    `phone` NVARCHAR(50) NULL,
    `email` NVARCHAR(50) NOT NULL,
    `description` NVARCHAR(200) NOT NULL,
    PRIMARY KEY(`companyID`),
    UNIQUE(`phone`),
    UNIQUE(`companyID`),
    UNIQUE(`email`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`Job`(
    `jobID` NVARCHAR(10) NOT NULL,
    `label` NVARCHAR(100) NOT NULL,
    `salaryStart` INT(100) NOT NULL,
    `salaryEnd` INT(100) NOT NULL,
    `owner` NVARCHAR(10) NOT NULL,
    `deadline` DATETIME NOT NULL,
    `requiredExperiment` INT(2) NOT NULL,
    `requiredLevel` NVARCHAR(10) NOT NULL,
    `quantity` INT(3) NOT NULL,
    `workType` ENUM('fulltime', 'parttime'),
    `desiredLevel` NVARCHAR(10) NOT NULL,
    `requiredGender` INT(1) NOT NULL,
    `description` NVARCHAR(200) NOT NULL,
    `priority` NVARCHAR(200) NOT NULL,
    `jobRequired` NVARCHAR(200) NOT NULL,
    `itemRequired` NVARCHAR(200) NOT NULL,
    `contact` NVARCHAR(200) NOT NULL,
    PRIMARY KEY(`jobID`),
    UNIQUE(`jobID`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`Territory`(
    `territoryID` NVARCHAR(10) NOT NULL,
    `label` NVARCHAR(100) NOT NULL,
    PRIMARY KEY(`territoryID`)
) ENGINE = INNODB; CREATE TABLE `tuyendung`.`WorkingPlace`(
    `wpID` NVARCHAR(10) NOT NULL,
    `label` NVARCHAR(100) NOT NULL,
    PRIMARY KEY(`wpID`),
    UNIQUE(`wpID`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`Experiment`(
    `experimentID` NVARCHAR(10) NOT NULL,
    `label` NVARCHAR(100) NOT NULL,
    `startDate` DATETIME NOT NULL,
    `endDate` DATETIME NOT NULL,
    `owner` NVARCHAR(10) NOT NULL,
    companyName NVARCHAR(200) NOT NULL,
    description NVARCHAR(200) NOT NULL,
    PRIMARY KEY(`experimentID`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`TerritoryCandidate`(
    `teCa` NVARCHAR(10) NOT NULL,
    `candidateID` NVARCHAR(10) NOT NULL,
    `territoryID` NVARCHAR(10) NOT NULL,
    PRIMARY KEY(`teCa`),
    UNIQUE(`teCa`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`TerritoryCompany`(
    `teCo` NVARCHAR(10) NOT NULL,
    `companyID` NVARCHAR(10) NOT NULL,
    `territoryID` NVARCHAR(10) NOT NULL,
    PRIMARY KEY(`teCo`),
    UNIQUE(`teCo`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`PlaceCandidate`(
    `wpCa` NVARCHAR(10) NOT NULL,
    `candidateID` NVARCHAR(10) NOT NULL,
    `wpID` NVARCHAR(10) NOT NULL,
    PRIMARY KEY(`wpCa`),
    UNIQUE(`wpCa`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`PlaceCompany`(
    `wpCo` NVARCHAR(10) NOT NULL,
    `companyID` NVARCHAR(10) NOT NULL,
    `wpID` NVARCHAR(10) NOT NULL,
    PRIMARY KEY(`wpCo`),
    UNIQUE(`wpCo`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`Level`(
    `levelID` NVARCHAR(10) NOT NULL,
    `label` NVARCHAR(100) NOT NULL,
    PRIMARY KEY(`levelID`),
    UNIQUE(`levelID`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`desiredLevel`(
    `dlID` NVARCHAR(10) NOT NULL,
    `label` NVARCHAR(100) NOT NULL,
    PRIMARY KEY(`dlID`),
    UNIQUE(`dlID`)
) ENGINE = INNODB;