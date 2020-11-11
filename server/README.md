# Server REST API Documentation

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

Responds 200:

- id
- email
- username
- avatar

## /api/ads

Accepts GET:

Responds 200 [ARRAY]:

- id
- picture
- href

## /api/news

Accepts GET:

Responds 200 [ARRAY]:

- id
- category
- likes
- headline
- picture
- content

## /api/news/:id

Accepts PATCH:

- action: 'like' OR 'unlike'

Responds 200

- id
- category
- likes
- headline
- picture
- content

## /api/users

Accepts GET:

Responds 200 [ARRAY]:

- id
- username
- avatar

## /api/users/:id

Accepts PATCH:

- auth (*)
- action: 'avatar'
- avatar

(*) The JSON Web Token for the user.

Responds 200

- id
- username
- avatar

Accepts DELETE:

- auth (*)

(*) The JSON Web Token for the user.

Responds 200

## /api/comments

Accepts GET:

Responds 200 [ARRAY]:

- id
- newsid
- userid (1)
- content

(1) Optional.

Accepts POST:

- newsid
- content
- auth (1)

(1) Optional.

Responds 200:

- id
- newsid
- userid
- content

## /api/comments/:id

Accepts DELETE:

- auth (*)

(*) The JSON Web Token for the user.

Responds 200

## /api/avatars

Accepts GET

Responds 200:

- avatars [ARRAY]

## /api/market

Accepts GET

Responds 200 [ARRAY]:

- x
- y

## /api/reset

Accepts POST

Responds 200
