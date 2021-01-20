# DB Structure

## users

- id int primary key
- email varchar unique
- username varchar unique
- avatar text
- password text
- type varchar
- createdAt datetime
- updatedAt datetime

## news

- id int primary key
- category int
- headline text
- likes int
- content text
- userId int foreign key
- createdAt datetime
- updatedAt datetime

## comments

- id int primary key
- newsId int foreign key
- userId int foreign key
- content text
- createdAt datetime
- updatedAt datetime

## ads

- id int primary key
- picture text
- href text
- createdAt datetime
- updatedAt datetime

# DB Table Creation Queries

- CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER auto_increment , `email` VARCHAR(255) UNIQUE, `username` VARCHAR(255) UNIQUE, `avatar` VARCHAR(255), `password` VARCHAR(255), `type` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

- CREATE TABLE IF NOT EXISTS `news` (`id` INTEGER auto_increment , `category` INTEGER, `headline` TEXT, `likes` INTEGER, `content` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

- CREATE TABLE IF NOT EXISTS `comments` (`id` INTEGER auto_increment , `content` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER, `newsId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`newsId`) REFERENCES `news` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

- CREATE TABLE IF NOT EXISTS `ads` (`id` INTEGER auto_increment , `picture` TEXT, `href` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
