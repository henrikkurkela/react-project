# Server REST API Documentation

# /login

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
 
# /signup

Accepts POST:

- email
- username
- password

Responds 200:

- id
- email
- username
- avatar

# /ads

Accepts GET:

Responds 200 [ARRAY]:

- id
- picture
- href

# /news

Accepts GET:

Responds 200 [ARRAY]:

- id
- category
- likes
- headline
- picture
- content

# /news/:id

Accepts PATCH:

- action: 'like' OR 'unlike'

Responds 200

- id
- category
- likes
- headline
- picture
- content

# /users

Accepts GET:

Responds 200 [ARRAY]:

- id
- username
- avatar

# /users/:id

Accepts DELETE:

- auth (*)

(*) The JSON Web Token for the user.

Responds 200

# /comments

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

# /comments/:id

Accepts DELETE:

- auth (*)

(*) The JSON Web Token for the user.

Responds 200
