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
- content
- author
- time

Accepts POST:

- auth (*)
- category
- likes
- headline
- content
- author

(*) The JSON Web Token for the user.

Responds 200:

- id
- category
- likes
- headline
- content
- author
- time

## /api/news/:id

Accepts PATCH:

- action: 'like' OR 'unlike'

Responds 200

- id
- category
- likes
- headline
- content
- author
- time

## /api/users

Accepts GET:

Responds 200 [ARRAY]:

- id
- email
- username
- avatar
- type

## /api/users/:id

Accepts PATCH:

- auth (*)
- action: 'avatar'
- avatar

(*) The JSON Web Token for the user.

Responds 200

- id
- email
- username
- avatar
- type

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

## /api/pictures

Accepts GET

Responds 200:

- pictures [ARRAY]

## /api/market

Accepts GET

Responds 200 [ARRAY]:

- x
- y

## /api/reset

Accepts POST

Responds 200
