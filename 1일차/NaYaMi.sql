CREATE TABLE `notice`(
    `notice_id` int(11) NOT NULL,
    `title` varchar(30) NOT NULL,
    `name` varchar(20) NOT NULL,
    `date` date NOT NULL,
    `sympathy` int(4) NOT NULL,
    `content` BLOB NOT NULL,
    PRIMARY KEY (`notice_id`)
);
INSERT INTO `notice` VALUES(0, 'HIHIHI','SHIN','2022-02-08',0,'HOHO');

