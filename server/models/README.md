# DB Structure

## users

- id int [PK]
- email varchar unique
- username varchar unique
- avatar varchar
- password varchar

## news

- id int [PK]
- category int
- likes int
- headline varchar
- picture varchar
- content varchar

## comments

- id int [PK]
- newsid int [FK: news.id]
- userid int [FK: users.id]
- content varchar

## ads

- id int [PK]
- picture varchar
- href varchar

# DB Table Creation Queries

- CREATE TABLE ads (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, href VARCHAR(255) NOT NULL, picture VARCHAR(255) NOT NULL);

- CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, username VARCHAR(255) NOT NULL UNIQUE, avatar VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);
