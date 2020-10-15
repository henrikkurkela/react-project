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
