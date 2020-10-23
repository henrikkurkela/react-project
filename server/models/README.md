# DB Structure

## users

- id int [PK]
- email varchar unique
- username varchar unique
- avatar varchar
- password varchar
- type varchar

## news

- id int [PK]
- category int
- likes int
- headline varchar
- picture varchar
- content varchar

## comments

- id int [PK]
- newsid int
- userid int
- content text

## ads

- id int [PK]
- picture varchar
- href varchar

# DB Table Creation Queries

- CREATE TABLE ads (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, href VARCHAR(255) NOT NULL, picture VARCHAR(255) NOT NULL);

- CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, username VARCHAR(255) NOT NULL UNIQUE, avatar VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, type VARCHAR(255) DEFAULT 'user');

- CREATE TABLE news (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, category INT NOT NULL, likes INT NOT NULL, headline VARCHAR(255) NOT NULL, content TEXT NOT NULL, picture VARCHAR(255));

- CREATE TABLE comments (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, newsid INT NOT NULL, userid INT, content TEXT NOT NULL)
