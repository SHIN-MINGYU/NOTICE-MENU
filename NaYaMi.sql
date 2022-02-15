CREATE TABLE `notice`
(
    `notice_id` int
(11) NOT NULL,
    `title` varchar
(30) NOT NULL,
    `name` varchar
(20) NOT NULL,
    `date` date NOT NULL,
    `sympathy` int
(4) NOT NULL,
    `hate` int
(4) NOT NULL,
    `content` BLOB NOT NULL,
    `password` varchar
(10) NOT NULL,
    PRIMARY KEY
(`notice_id`)
);
INSERT INTO `
notice`
VALUES(0, 'HIHIHI', 'SHIN', '2022-02-08', 0, 0, 'HOHO', '1234');

CREATE TABLE `comment`
(
    `Cname` varchar
(20) NOT NULL,
    `Cpassword` varchar
(20) NOT NULL,
    `Ccontent` BLOB NOT NULL,
    `comment_id` int
(11) NOT NULL,
    `notice_id` int
(11) NOT NULL,
    FOREIGN KEY
(`notice_id`) REFERENCES `notice`
(`notice_id`)
);

CREATE TABLE `sympathyGroup`
(
    `sympathy_id` int
(11) NOT NULL,
    `notice_id` int
(11) NOT NULL,
    FOREIGN KEY
(`notice_id`) REFERENCES `notice`
(`notice_id`)
);