# DB Structure

## users

- id int primary key
- email varchar unique
- username varchar unique
- avatar text
- password text
- type varchar

## news

- id int primary key
- category int
- likes int
- headline text
- content text
- author int foreign key
- time datetime

## comments

- id int primary key
- newsid int foreign key
- userid int foreign key
- content text

## ads

- id int primary key
- picture text
- href text

# DB Table Creation Queries

- CREATE TABLE ads (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, href TEXT NOT NULL, picture TEXT NOT NULL);

- CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, username VARCHAR(255) NOT NULL UNIQUE, avatar TEXT NOT NULL, password TEXT NOT NULL, type VARCHAR(255) DEFAULT 'user');

- CREATE TABLE news (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, category INT NOT NULL, likes INT NOT NULL, headline TEXT NOT NULL, content TEXT NOT NULL, author INT, time DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (author) REFERENCES users(id) ON DELETE CASCADE);

- CREATE TABLE comments (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, newsid INT NOT NULL, userid INT, content TEXT NOT NULL, FOREIGN KEY (newsid) REFERENCES news(id) ON DELETE CASCADE, FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE);
