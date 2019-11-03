
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
    `avatar` NVARCHAR(200),
    `dob` DATETIME NOT NULL,
    `salaryStart` INT(100) NOT NULL,
    `salaryEnd` INT(100) NOT NULL,
    `gender` INT(1) NOT NULL,
    PRIMARY KEY(`candidateID`),
    UNIQUE(`phone`),

    UNIQUE(`email`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`Company`(
    `companyID` NVARCHAR(10) NOT NULL,
    `companyName` NVARCHAR(100) NOT NULL,
    `address` NVARCHAR(200) NULL,
    `avatar` NVARCHAR(200),
    `phone` NVARCHAR(50) NULL,
    `email` NVARCHAR(50) NOT NULL,
    `description` NVARCHAR(300) NOT NULL,
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
INSERT INTO `Job` (`jobID` ,
                           `label`,
                           `salaryStart` ,
                           `salaryEnd` ,
                           `owner` ,
                           `deadline` ,
                           `requiredExperiment`,
                           `requiredLevel` ,
                           `quantity` ,
                           `workType`,
                           `desiredLevel`,
                           `requiredGender` ,
                           `description` ,
                           `priority`,
                           `jobRequired`,
                           `itemRequired`,
                           `contact`) VALUES ('0', 'Lập trình viên PHP', 8000000, 12000000, "2" , "2019/11/20", 2, "3", 3, "fulltime", "0",0,"Phát triển các dự án CRM và CMS trên nền PHP & MySQL cho công ty và khách hàng của công ty.", "Bảo hiểm sức khoẻ (khám chữa bệnh) và tai nạn dành cho nhân viên (100 triệu /năm).", "Am hiểu về PHP & MySQL, CSS, HTML, Javascript, jQuery.", "Đơn xin việc, Sơ yếu lý lịch", '{"contactTo":"Mr Tho","address":"129 Le duc tho","phone":"021742232","email":"ok@gmail.com"}'),('1', 'Chuyên viên Marketing', 5000000, 10000000, "5" , "2019/12/21", 1, "0", 2, "fulltime", "0",1,"Trực tiếp triển khai quảng cáo FB,Google,Zalo HỖ TRỢ các đại lý bán hàng.", "Lương cứng: 10 - 15 triệu + 2-5 % lợi nhuận từ các kênh phân phối.", "Kinh nghiệm tối thiểu 6 tháng cho công việc digital marketing, Ưu tiên lĩnh vực bán lẻ", "Đơn xin việc, Sơ yếu lý lịch", '{"contactTo":"Ms. Thu","address":"tầng 11- tháp C - 219 Trung Kính, Hà Nội","phone":"021763232","email":"ok2@gmail.com"}'),('2', 'Nhân Viên Kinh Doanh', 7000000, 13000000, "4" , "2019/11/30", 1, "0", 2, "fulltime", "0",1,"Thực hiện công tác bán hàng, tư vấn cung cấp những giải pháp tài chính phù hợp với nhu cầu khách hàng.", "Lương cơ bản: 7,000,000 VND; 13.000,000 VND (Tùy thuộc vào bằng cấp và vị trí làm việc)", "Ngoại hình ưa nhìn. Ưu tiên giới tính Nữ, Tác phong: Chuyên nghiệp, nhanh nhẹn", "Đơn xin việc, Sơ yếu lý lịch, Hộ khẩu, chứng minh nhân dân và giấy khám sức khỏe.", '{"contactTo":"Ms Phương","address":"36B, đường 3/2, phường 1, TP Vĩnh Long","phone":"0217632322","email":"ok3@gmail.com"}')
CREATE TABLE `tuyendung`.`Territory`(
    `territoryID` NVARCHAR(10) NOT NULL,
    `label` NVARCHAR(100) NOT NULL,
    PRIMARY KEY(`territoryID`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`WorkingPlace`(
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
CREATE TABLE `tuyendung`.`TerritoryJob`(
    `teJo` NVARCHAR(10) NOT NULL,
    `jobID` NVARCHAR(10) NOT NULL,
    `territoryID` NVARCHAR(10) NOT NULL,
    PRIMARY KEY(`teJo`),
    UNIQUE(`teJo`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`PlaceCandidate`(
    `wpCa` NVARCHAR(10) NOT NULL,
    `candidateID` NVARCHAR(10) NOT NULL,
    `wpID` NVARCHAR(10) NOT NULL,
    PRIMARY KEY(`wpCa`),
    UNIQUE(`wpCa`)
) ENGINE = INNODB;
CREATE TABLE `tuyendung`.`PlaceJob`(
    `peJo` NVARCHAR(10) NOT NULL,
    `jobID` NVARCHAR(10) NOT NULL,
    `wpID` NVARCHAR(10) NOT NULL,
    PRIMARY KEY(`peJo`),
    UNIQUE(`peJo`)
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
INSERT INTO `Level` (`levelID`,`label`) VALUES ('0', 'Cao đẳng'),('1', 'Trung học cơ sở'),('2', 'Trung học phổ thông'),('3', 'Cử nhân'),('4', 'Thạc sĩ'),('5', 'Tiến sĩ')
INSERT INTO `desiredLevel` (`dlID`,`label`) VALUES ('0', 'Nhân viên'),('1', 'Quản lý'),('2', 'Giám đốc')
INSERT INTO `Territory` (`territoryID`, `label`) VALUES ('0', 'Bán hàng'), ('1', 'Bảo hiểm'), ('2', 'An ninh'), ('3', 'Cơ khí - Chế tạo'), ('4', 'Dịch vụ'), ('5', 'Du lịch'), ('6', 'Bất động sản'), ('7', 'Điện tử'), ('8', 'IT phần mềm'), ('9', 'Marketing'), ('10', 'Kinh doanh'), ('11', 'Thiết kế'), ('12', 'Đồ họa'), ('13', 'Sư phạm')
INSERT INTO `WorkingPlace` (`wpID`,`label`) VALUES ('0', 'Thành phố Cần Thơ'),('1', 'Thành phố Đà Nẵng'), ('2', 'Thành phố Hà Nội'), ('3', 'Thành phố Hải Phòng'), ('4', 'Thành phố Hồ Chí Minh'), ('5', 'Tỉnh An Giang'), ('6', 'Tỉnh Bà Rịa-Vũng Tàu'), ('7', 'Tỉnh Bắc Giang'), ('8', 'Tỉnh Bạc Liêu'), ('9', 'Tỉnh Bắc Ninh'), ('10', 'Tỉnh Bình Dương'), ('11', 'Tỉnh Hải Dương'), ('12', 'Tỉnh Khánh Hòa'), ('13', 'Tỉnh Thái Bình'), ('14', 'Tỉnh Thanh Hóa')
INSERT INTO `Company` (`companyID` ,
                           `companyName`,
                           `address` ,
                           `avatar` ,
                           `phone`,
                           `email` ,
                           `description`) VALUES ('0', 'Công ty TRIBECO Bình Dương', "Sô 8, đường số 11, KCN Việt Nam-Singapore, Thuận An, BD", "xLzeyG7roqyQLV9cePRj1478UhxDbgch4fXgx4hR.png", "023121", "ok1@gmail.com", "Công ty TNHH TRIBECO Bình Dương – 100% vốn nước ngoài (trực thuộc tập đoàn Uni-President Đài Loan) là một trong những doanh nghiệp sản xuất và kinh doanh nước giải khát và bán buôn thực phẩm hàng đầu Việt Nam."), ('1', 'TỔNG CÔNG TY CHUYỂN PHÁT NHANH BƯU ĐIỆN', " Số 01 Đường Tân Xuân, Phường Xuân Đỉnh, Quận Bắc Từ Liêm, TP. Hà Nội", "PYKTM3yshPpt6K05NW3rYONZqxhjQvl4kXRoiOeS.png", "0231221", "ok2@gmail.com", "Tổng công ty Chuyển phát nhanh Bưu điện - Công ty Cổ phần được thành lập theo quyết định phê duyệt đề án số 29/QĐ-ĐABC-HĐQT ngày 24 tháng 1 năm 2005 của Hội đồng Quản trị Tổng công ty Bưu chính Viễn thông Việt Nam."),('2', 'Đức Trung Group', "Số 120 Nguyễn Thái Học, Phường Điện Biên, Quận Ba Đình, Thành phố Hà Nội", "e76e8e0788fc.jpg", "02312212", "ok3@gmail.com", "TẬP ĐOÀN ĐỨC TRUNG được thành lập từ năm 1994 với chiến lược kinh doanh:”Nhập khẩu trực tiếp - Phân phối độc quyền – Giá cả cạnh tranh – Sản phẩm chất lượng”. "),('3', 'CÔNG TY CỔ PHẦN JESCO ASIA', " Lầu 10-11, số 60 Trường Sơn, p2, q.Tân Bình", "8bc038b595ce.jpg", "04312212", "ok4@gmail.com", "Công ty cổ phần JESCO ASIA có tiền thân là công ty trách nhiệm hữu hạn JESCO SE Việt Nam – được thành lập vào tháng 10 năm 2001 "),('4', 'Công ty Tài chính TNHH MTV Home Credit Việt Nam', "Tòa nhà Phụ Nữ, số 20 Nguyễn Đăng Giai, Phường Thảo Điền, Quận 02, Tp.HCM", "3b026b3e1da3.png", "04312252", "ok5@gmail.com", "Home Credit Việt Nam là một đơn vị trực thuộc tập đoàn Home Credit B.V, một trong những tập đoàn cung cấp dịch vụ tài chính hàng đầu châu Âu và đang phát triển mạnh mẽ tại thị trường châu Á"),('5', 'Công ty TNHH Tân Mỹ', "Số 122 Phố Hoàng Ngân - Phường Trung Hoà - Quận Cầu Giấy - Thành Phố Hà Nội - Việt Nam", "7367522882e5.jpg", "04312552", "ok6@gmail.com", "Công ty TNHH Tân Mỹ được thành lập ngày 26 tháng 05 năm 1999, với tiêu chí lấy chất lượng sản phẩm, tinh thần phục vụ khách hàng và uy tín trong kinh doanh làm nền tảng cho sự phát triển của Công ty")
                           INSERT INTO `Candidate` (`candidateID` ,
                                                      `email`,
                                                      `fullname` ,
                                                      `address` ,
                                                      `phone`,
                                                      `label` ,
                                                      `desiredLevel`,
                                                      `experimentTime`,
                                                          `selfLevel`,
                                                          `workType`,
                                                          `selfTarget`,
                                                          `selfSkill`,
                                                          `avatar` ,
                                                          `dob`,
                                                          `salaryStart`,
                                                          `salaryEnd`,
                                                          `gender`) VALUES ('0', 'nhan@gmail.com', "Vũ Xuân Trường", "Huyện Lý Nhân, Hà Nam", "023121", "Lập Trình Viên Android", "0", 2, "0", 'fulltime', 'Mong muốn tìm được chỗ làm ổn định lâu dài', 'Java core( học OOp trên lớp và khóa học Lập trình Java trong 4 tuần của Mrs.Trần Duy Thanh)', 'male_avatar.jpg', "1994/07/18", 12000000, 15000000, 0),('1', 'loc@gmail.com', "Nguyễn Văn Lộc", "994 Huỳnh Tấn Phát-Q7", "02312121", "Kỹ Sư Cơ Khí", "0", 2, "0", 'fulltime', 'Làm việc ở vị trí năng động, môi trường thân thiện, thử thách', 'Kỹ năng làm việc theo nhóm, Dễ dàng thích nghi với môi trường mới', 'C80qB9eFPtkTQsNh80XZ3rwP9CyeydVWgY2vdFJg.jpeg', "1995/04/28", 10000000, 12000000, 0),('2', 'phuong@gmail.com', "Nguyễn Thị Phượng", "352/4A Trường Chinh", "02382121", "Tư Vấn Và Chăm Sóc Khách Hàng", "1", 2, "3", 'fulltime', 'Công việc có tình tư duy cao, năng động, không rập khuôn.', 'Kỹ năng làm việc nhóm, làm việc độc lập tốt. Nhiệt tình, tích cực, tư duy công việc khoa học, sáng tạo, có khả năng phân tích đánh giá vấn đề.', 'kplA9AzuPTvfdf6Tsz6UyTPhzEQ3eB0j3w9HQsU2.jpeg', "1995/09/04", 8000000, 10000000, 1),('3', 'huyen@gmail.com', "Nguyễn Thị Huyền", "Hà Đông - Hà Nội", "09382121", "Marketing Online", "0", 3, "3", 'fulltime', 'Không ngừng học hỏi, tích lũy kiến thức, nâng cao năng lực về lĩnh vực marketing online', 'Sử dụng thành thạo tin học văn phòng Word, Excel, PowerPoint. Có khả năng lên kế hoạch marketing, phát triển thương hiệu cho Công ty', 'rsIWZ9Lj79uJI6E7hlObqMWOUDRz4NM3PzC8eSUw.jpeg', "1991/10/24", 12000000, 20000000, 1)

INSERT INTO `placecandidate` (`wpCa`,`candidateID`,`wpID`) VALUES ('0', '0', '0'),('1', '0', '2'), ('2', '1', '2'), ('3', '2', '5'), ('4', '2', '7'), ('5', '3', '2')
INSERT INTO `territorycandidate` (`teCa`,`candidateID`,`territoryID`) VALUES ('0', '0', '12'),('1', '0', '13'), ('2', '1', '1'), ('3', '2', '0'), ('4', '2', '7'), ('5', '3', '2')


INSERT INTO `placejob` (`peJo`,`jobID`,`wpID`) VALUES ('0', '0', '0'),('1', '0', '2'), ('2', '1', '2'), ('3', '2', '5'), ('4', '2', '7')
INSERT INTO `territoryjob` (`teJo`,`jobID`,`territoryID`) VALUES ('0', '0', '12'),('1', '0', '13'), ('2', '1', '1'), ('3', '2', '0'), ('4', '2', '7')