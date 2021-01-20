# Server REST API Documentation

# Login and Signup Routes

## /api/login

Accepts POST:

- email
- password

Responds 200:

- auth (*)
- email
- id
- username
- avatar

(*) The JSON Web Token for the user.
 
## /api/signup

Accepts POST:

- email
- username
- password

Responds 201:

- id
- email
- username
- avatar

# User Account Routes

## /api/users

Accepts GET:

Responds 200 [ARRAY]:

- id
- email
- username
- avatar
- type
- createdAt
- updatedAt

## /api/users/:id

Accepts PATCH:

- action: 'avatar'
- avatar

Responds 200

- id
- email
- username
- avatar
- type

Accepts DELETE:

Responds 204

# Advertisement Routes

## /api/ads

Accepts GET:

Responds 200 [ARRAY]:

- id
- picture
- href
- createdAt
- updatedAt

Accepts POST:

- picture
- href

Responds 201:

- id
- picture
- href

## /api/ads/:id

Accepts DELETE:

- id

Responds 204

# News Story Routes

## /api/news

Accepts GET:

Responds 200 [ARRAY]:

- id
- category
- likes
- headline
- content
- userId
- createdAt
- updatedAt

Accepts POST:

- category
- likes
- headline
- content
- userId

Responds 201:

- id
- category
- likes
- headline
- content
- userId
- createdAt
- updatedAt

## /api/news/:id

Accepts PATCH:

- action: 'like' OR 'unlike' (*)

(*) Optional.

Responds 200:

- id
- category
- likes
- headline
- content
- userId
- createdAt
- updatedAt

Accepts DELETE:

Responds 204

# News Story Comments Routes

## /api/comments

Accepts GET:

Responds 200 [ARRAY]:

- id
- newsId
- userId
- content

Accepts POST:

- newsId
- content

Responds 201:

- id
- newsId
- userId
- content

## /api/comments/:id

Accepts DELETE:

Responds 204

# Image Asset Routes

## /api/avatars

Accepts GET

Responds 200:

- avatars [ARRAY]

## /api/pictures

Accepts GET

Responds 200:

- pictures [ARRAY]

## /api/upload

Accepts POST (*):

- picture

(*) Content-Type: multipart/form-data

Responds 201:

- filename

# Business Section Market Tracker Routes

## /api/market

Accepts GET

Responds 200 [ARRAY]:

- x
- y

# Development Routes

## /api/reset

Accepts POST

Responds 204
