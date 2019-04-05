DROP DATABASE IF EXISTS `social_network_204_G8`;
CREATE DATABASE `social_network_204_G8`;
USE `social_network_204_G8`;

CREATE TABLE IF NOT EXISTS `Users` (`userId` INTEGER NOT NULL auto_increment , `userName` VARCHAR(255) NOT NULL UNIQUE, `email` VARCHAR(255) NOT NULL, `name` VARCHAR(255), `birthDate` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`userId`)) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Posts` (`postId` INTEGER NOT NULL auto_increment , `content` TEXT NOT NULL, `type` ENUM('text', 'image', 'link') DEFAULT 'text', `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER, PRIMARY KEY (`postId`), FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Topics` (`topicId` INTEGER NOT NULL auto_increment , `topicName` VARCHAR(255) NOT NULL UNIQUE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`topicId`)) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Groups` (`groupId` INTEGER NOT NULL auto_increment , `groupName` VARCHAR(255) NOT NULL UNIQUE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `createdBy` INTEGER, PRIMARY KEY (`groupId`), FOREIGN KEY (`createdBy`) REFERENCES `Users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `GroupsUsers` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER , `groupId` INTEGER , PRIMARY KEY (`userId`, `groupId`), FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`groupId`) REFERENCES `Groups` (`groupId`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `UsersTopics` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER , `topicId` INTEGER , PRIMARY KEY (`userId`, `topicId`), FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`topicId`) REFERENCES `Topics` (`topicId`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `UsersReadPosts` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER , `postId` INTEGER , PRIMARY KEY (`userId`, `postId`), FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`postId`) REFERENCES `Posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `UsersLikedPosts` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER , `postId` INTEGER , PRIMARY KEY (`userId`, `postId`), FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`postId`) REFERENCES `Posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `UsersFollowers` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER , `followerUserId` INTEGER , PRIMARY KEY (`userId`, `followerUserId`), FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`followerUserId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `TopicsPosts` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `postId` INTEGER , `topicId` INTEGER , PRIMARY KEY (`postId`, `topicId`), FOREIGN KEY (`postId`) REFERENCES `Posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`topicId`) REFERENCES `Topics` (`topicId`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `PostResponses` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `postId` INTEGER , `responsePostId` INTEGER , PRIMARY KEY (`postId`, `responsePostId`), FOREIGN KEY (`postId`) REFERENCES `Posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`responsePostId`) REFERENCES `Posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `TopicSubtopics` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `topicId` INTEGER , `subtopicId` INTEGER , PRIMARY KEY (`topicId`, `subtopicId`), FOREIGN KEY (`topicId`) REFERENCES `Topics` (`topicId`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`subtopicId`) REFERENCES `Topics` (`topicId`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

-- sample data
INSERT INTO `Users` (`userId`,`userName`,`email`,`name`,`birthDate`,`createdAt`,`updatedAt`) VALUES (NULL,'admin','admin@sn.com','admin','1980-07-20 04:00:00','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'user1','user1@sn.com','user1','1981-08-21 04:00:00','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'user2','user2@sn.com','user2','1982-09-22 04:00:00','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'user3','user3@sn.com','user3','1983-10-23 04:00:00','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'user4','user4@sn.com','user4','1984-11-24 05:00:00','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'user5','user5@sn.com','user5','1985-12-25 05:00:00','2019-04-05 05:02:00','2019-04-05 05:02:00');
INSERT INTO `Topics` (`topicId`,`topicName`,`createdAt`,`updatedAt`) VALUES (NULL,'Technology','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'Business','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'Sports','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'Music','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'Fashion','2019-04-05 05:02:00','2019-04-05 05:02:00'),(NULL,'Politics','2019-04-05 05:02:00','2019-04-05 05:02:00');
INSERT INTO `Groups` (`groupId`,`groupName`,`createdAt`,`updatedAt`,`createdBy`) VALUES (NULL,'Group 1','2019-04-05 05:02:00','2019-04-05 05:02:00',2),(NULL,'Group 2','2019-04-05 05:02:00','2019-04-05 05:02:00',2),(NULL,'Group 3','2019-04-05 05:02:00','2019-04-05 05:02:00',2),(NULL,'Group 4','2019-04-05 05:02:00','2019-04-05 05:02:00',3),(NULL,'Group 5','2019-04-05 05:02:00','2019-04-05 05:02:00',3),(NULL,'Group 6','2019-04-05 05:02:00','2019-04-05 05:02:00',4);
INSERT INTO `Posts` (`postId`,`content`,`type`,`createdAt`,`updatedAt`,`userId`) VALUES (NULL,'This is post #1. The artist explodes in a slice. Near the platform waits the pleased well. The shirt beams the limb outside a hated constraint. A sector flowers after a competitive focus. A mystery hums opposite its populace.','text','2019-04-05 05:02:00','2019-04-05 05:02:00',2),(NULL,'This is post #2. The delayed leisure consumes a lighted controller. The gang works a practical treasure. An upset consumer dashes behind the integrated predecessor. The upward voltage scores.','text','2019-04-05 05:02:00','2019-04-05 05:02:00',3),(NULL,'This is post #3. The behind employer suffers next to the clothed cliff. The yeti rolls after a north. When can the displayed harden mature outside the anecdote? An indicator braves an adventure.','text','2019-04-05 05:02:00','2019-04-05 05:02:00',4),(NULL,'This is post #4. The psychologist puzzles? Does the diet stretch the lunatic? A dust returns around the enemy. The resigned mechanism hunts near the newest invalid. A constitutional knights the bitmap.','text','2019-04-05 05:02:00','2019-04-05 05:02:00',4),(NULL,'This is post #5. A vocal boggles next to the unconvincing worship. Without the origin hopes the unifying collar. The attractive gateway captures the nest. His sales philosophy prosecutes. A bush results on top of a conference!','text','2019-04-05 05:02:00','2019-04-05 05:02:00',5),(NULL,'This is post #6. How can a cash clog above the medium bath? A religious jet gowns the sentient. My priced fog mends. A neutral lisp promises the menu.','text','2019-04-05 05:02:00','2019-04-05 05:02:00',5);
INSERT INTO `GroupsUsers` (`createdAt`,`updatedAt`,`userId`,`groupId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',2,1),('2019-04-05 05:02:00','2019-04-05 05:02:00',2,2),('2019-04-05 05:02:00','2019-04-05 05:02:00',2,3);
INSERT INTO `GroupsUsers` (`createdAt`,`updatedAt`,`userId`,`groupId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',3,3),('2019-04-05 05:02:00','2019-04-05 05:02:00',3,4),('2019-04-05 05:02:00','2019-04-05 05:02:00',3,5);
INSERT INTO `GroupsUsers` (`createdAt`,`updatedAt`,`userId`,`groupId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',4,4),('2019-04-05 05:02:00','2019-04-05 05:02:00',4,5),('2019-04-05 05:02:00','2019-04-05 05:02:00',4,6);
INSERT INTO `UsersTopics` (`createdAt`,`updatedAt`,`userId`,`topicId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',2,1);
INSERT INTO `UsersTopics` (`createdAt`,`updatedAt`,`userId`,`topicId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',3,3),('2019-04-05 05:02:00','2019-04-05 05:02:00',3,4),('2019-04-05 05:02:00','2019-04-05 05:02:00',3,5);
INSERT INTO `UsersTopics` (`createdAt`,`updatedAt`,`userId`,`topicId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',4,4),('2019-04-05 05:02:00','2019-04-05 05:02:00',4,5),('2019-04-05 05:02:00','2019-04-05 05:02:00',4,6);
INSERT INTO `UsersReadPosts` (`createdAt`,`updatedAt`,`userId`,`postId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',2,2),('2019-04-05 05:02:00','2019-04-05 05:02:00',2,3);
INSERT INTO `UsersReadPosts` (`createdAt`,`updatedAt`,`userId`,`postId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',3,1),('2019-04-05 05:02:00','2019-04-05 05:02:00',3,3),('2019-04-05 05:02:00','2019-04-05 05:02:00',3,4);
INSERT INTO `UsersReadPosts` (`createdAt`,`updatedAt`,`userId`,`postId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',4,1),('2019-04-05 05:02:00','2019-04-05 05:02:00',4,5),('2019-04-05 05:02:00','2019-04-05 05:02:00',4,6);
INSERT INTO `UsersLikedPosts` (`createdAt`,`updatedAt`,`userId`,`postId`) VALUES ('2019-04-05 05:02:20','2019-04-05 05:02:20',2,2),('2019-04-05 05:02:20','2019-04-05 05:02:20',2,3);
INSERT INTO `UsersLikedPosts` (`createdAt`,`updatedAt`,`userId`,`postId`) VALUES ('2019-04-05 05:02:20','2019-04-05 05:02:20',3,1),('2019-04-05 05:02:20','2019-04-05 05:02:20',3,4);
INSERT INTO `UsersLikedPosts` (`createdAt`,`updatedAt`,`userId`,`postId`) VALUES ('2019-04-05 05:02:20','2019-04-05 05:02:20',4,4),('2019-04-05 05:02:20','2019-04-05 05:02:20',4,5);
INSERT INTO `UsersFollowers` (`createdAt`,`updatedAt`,`userId`,`followerUserId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',2,3),('2019-04-05 05:02:00','2019-04-05 05:02:00',2,4),('2019-04-05 05:02:00','2019-04-05 05:02:00',2,6);
INSERT INTO `UsersFollowers` (`createdAt`,`updatedAt`,`userId`,`followerUserId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',3,4),('2019-04-05 05:02:00','2019-04-05 05:02:00',3,5);
INSERT INTO `UsersFollowers` (`createdAt`,`updatedAt`,`userId`,`followerUserId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',4,2),('2019-04-05 05:02:00','2019-04-05 05:02:00',4,5),('2019-04-05 05:02:00','2019-04-05 05:02:00',4,6);
INSERT INTO `UsersFollowers` (`createdAt`,`updatedAt`,`userId`,`followerUserId`) VALUES ('2019-04-05 05:02:00','2019-04-05 05:02:00',5,2),('2019-04-05 05:02:00','2019-04-05 05:02:00',5,6);
INSERT INTO `TopicsPosts` (`createdAt`,`updatedAt`,`postId`,`topicId`) VALUES ('2019-04-05 05:02:01','2019-04-05 05:02:01',1,1);
INSERT INTO `TopicsPosts` (`createdAt`,`updatedAt`,`postId`,`topicId`) VALUES ('2019-04-05 05:02:01','2019-04-05 05:02:01',2,1);
INSERT INTO `TopicsPosts` (`createdAt`,`updatedAt`,`postId`,`topicId`) VALUES ('2019-04-05 05:02:01','2019-04-05 05:02:01',3,1);
INSERT INTO `TopicsPosts` (`createdAt`,`updatedAt`,`postId`,`topicId`) VALUES ('2019-04-05 05:02:01','2019-04-05 05:02:01',4,4);
INSERT INTO `TopicsPosts` (`createdAt`,`updatedAt`,`postId`,`topicId`) VALUES ('2019-04-05 05:02:01','2019-04-05 05:02:01',5,4);
INSERT INTO `TopicsPosts` (`createdAt`,`updatedAt`,`postId`,`topicId`) VALUES ('2019-04-05 05:02:01','2019-04-05 05:02:01',6,6);
INSERT INTO `PostResponses` (`createdAt`,`updatedAt`,`postId`,`responsePostId`) VALUES ('2019-04-05 05:02:01','2019-04-05 05:02:01',1,2),('2019-04-05 05:02:01','2019-04-05 05:02:01',1,3);
INSERT INTO `PostResponses` (`createdAt`,`updatedAt`,`postId`,`responsePostId`) VALUES ('2019-04-05 05:02:01','2019-04-05 05:02:01',4,5);