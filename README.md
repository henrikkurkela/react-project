# News Platform Site

A simple news site for a press company. Developed for Helsinki University course Full Stack Web Development Project.

Demo available on Heroku: fullstacknewssite.herokuapp.com

To start the application, type:
```
npm run dev
```

If desired, the backend can also be used to serve a production build of the frontend:
```
npm run build

npm run server
```

The backend requires a MySQL server to function. Table creation queries can be found in the [server readme](/server/models/README.md) file. Database details should be added to the [example.env](example.env) file, which should then be renamed to .env

Stock photos downloaded from unsplash.com

## TODO

Fourteenth Iteration:

Functionality:

- Last adjustments before feature completion
- Remove development shortcuts

Backend:

- Backend route tests
- Sequelize hasMany-belongsTo relations for DB tables
- Sequelize createdAt and updatedAt timestamps for DB tables

Documentation:

- OpenAPI documentation for backend REST API
- Frontend user manual

## DONE

Thirteenth Iteration (16h):

Functionality:

- Add upload picture functionality
- Add edit news functionality

Frontend:

- Refactor frontend file structure
- Extend frontend tests to improve coverage

Twelfth Iteration (22h):

Backend:

- Sequelize DB driver
- Refactor controllers
- Refactor authMiddleware

Frontend:

- Better moderation tools
- Improve responsiveness

Eleventh Iteration (18h):

Advertisement overhaul:

- Better transition effects

Refactor frontend:

- Replace connects with useSelectors

Reimplement tests:

- Front end unit tests

Tenth Iteration (11h):

News story overhaul:

- Multiple pictures in story
- YouTube embed links
- Author credit

Ninth Iteration (7h):

Business section:

- Stock index graph
- Business news stories

Back end:

- Random generated market data

Eighth Iteration (13h):

Modernize user interface:

- Investigate modern news sites
- Update design

Seventh Iteration (8h):

Simple moderator panel:

- Add news story
- Delete news story
- Delete any comment

Sixth Iteration (11h):

- Implement permanent DB solution
- Implement simple development routes with DB manipulation options

Fifth Iteration (20h):

Enhance user experience:

- Delete user/comment confirmations
- Display nickname instead of email
- Implement simple avatars

Fourth Iteration (9h):

Implement registered user interaction:

- Create/delete account ability
- Registered user comments

Third Iteration (6h):

Implement anonymous user interaction:

- Simple news story likes
- Simple news story commments

Second Iteration (6h):

Front end:

- News item modals
- Categories with React router
- Simple banner ads

Back end:

- Implement simple json-server module

First Iteration (7h):

Implement simple front end:

- Headline
- Category panel
- News panel

Implement simple back end:

- json-server with static news DB

Implement simple tests:

- Simple reducer tests

## Work Log

2020-09-16: Project Started, Begin Work on Frontend, Implement Simple Backend 2h (Total 2h)

2020-09-17: Continue Work on Frontend 2h (Total 4h)

2020-09-18: Begin Work on Tests 2h (Total 6h)

2020-09-19: Refactoring, Cleanup, First Iteration Goals Met 1h (Total 7h)

2020-09-20: News Item Modals 1h (Total 8h)

2020-09-21: Refactoring, Categories With React Router, Install Concurrently 2h (Total 10h)

2020-09-22: Simple json-server Module, Simple Banner Ads, Second Iteration Goals Met 3h (Total 13h)

2020-09-23: Simple News Story Likes, Refactoring 3h (Total 16h)

2020-09-25: Simple News Story Comments 2h (Total 18h)

2020-09-26: Update Tests, Third Iteration Goals Met 1h (Total 19h)

2020-09-29: Start Working on User Accounts 3h (Total 22h)

2020-09-30: Continue Working on User Accounts, Refactoring 3h (Total 25h)

2020-10-01: Refactor HTTP Requests and Login 2h (Total 27h)

2020-10-02: Code Cleanup, Fourth Iteration Goals Met 1h (Total 28h)

2020-10-03: Delete User/Comment Confirmations, Minor Refactoring 2h (Total 30h)

2020-10-05: Start Working on Express Backend 2h (Total 32h)

2020-10-06: Continue Work on Express Backend 2h (Total 34h)

2020-10-07: Continue Work on Express Backend 2h (Total 36h)

2020-10-08: Continue Work on Express Backend, Minor Frontend Changes, API Documentation 4h (Total 40h)

2020-10-09: Implement Login RegExp Tests, Improve Code Readability 1h (Total 41h)

2020-10-10: Implement Simple Avatars 2h (Total 43h)

2020-10-11: Backend Avatar List, Code Cleanup 2h (Total 45h)

2020-10-15: Code Cleanup, Fifth Iteration Goals Met, Planning 3h (Total 48h)

2020-10-16: Implement Ads in MySQL Database, Begin Work on /reset Route 4h (Total 52h)

2020-10-17: AdsModel as Class 1h (Total 53h)

2020-10-19: Start Working on Users MySQL Model 2h (Total 55h)

2020-10-20: Start Working on News and Comments MySQL Models 2h (Total 57h)

2020-10-21: Start Working on /development Route 1h (Total 58h)

2020-10-22: Sixth Iteration Goals Met 1h (Total 59h)

2020-10-23: Begin Work on Moderator Panel 1h (Total 60h)

2020-10-24: Continue Work on Moderator Panel 1h (Total 61h)

2020-10-26: Moderator Panel 2h (Total 63h)

2020-10-27: Seventh Iteration Goals Met, MVC Controller Error Check Rework 4h (Total 67h)

2020-10-28: Begin Work on Updating Design 5h (Total 72h)

2020-10-29: Continue Work on Updating Design 2h (Total 74h)

2020-10-30: Continue Work on Updating Design 1h (Total 75h)

2020-10-31: Users Overview Route, 404 Route, Design Updates 3h (Total 78h)

2020-11-02: Share Button, RenderComments Design Updates 1h (Total 79h)

2020-11-05: Eighth Iteration Goals Met, Planning 1h (Total 80h)

2020-11-06: Begin Work on Stock Index Graph 2h (Total 82h)

2020-11-07: Continue Work on Stock Index Graph 2h (Total 84h)

2020-11-09: Stock Index Graph Styling 2h (Total 86h)

2020-11-11: Ninth Iteration Goals Met, Planning 1h (Total 87h)

2020-11-13: Start Work on News Template 3h (Total 90h)

2020-11-14: Update Site Header 1h (Total 91h)

2020-11-15: Minor Style Changes 1h (Total 92h)

2020-11-16: Begin Work on New Content Parser 1h (Total 93h)

2020-11-17: Add Video Embed Ability 2h (Total 95h)

2020-11-19: Add Pull Quotes, Improve Publish Page 2h (Total 97h)

2020-11-20: Tenth Iteration Goals Met, Planning 1h (Total 98h)

2020-11-23: Start Working on Ad Effects 2h (Total 100h)

2020-11-25: Implement Ad Carousel Controls 1h (Total 101h)

2020-11-27: Planning, Replace Connects with useSelectors 2h (Total 103h)

2020-11-30: Begin Work on Unit Tests 2h (Avatar, NotFound) (Total 105h)

2020-12-01: Continue Work on Unit Tests 1h (Login) (Total 106h)

2020-12-02: Continue Work on Unit Tests 1h (Signup, RenderComments) (107h)

2020-12-03: Continue Work on Unit Tests (Account, Development), RenderNews Revamp, SqlString in Backend Models 4h (111h)

2020-12-04: Continue Work on Unit Tests (User, Logout) 1h (112h)

2020-12-06: Continue Work on Unit Tests (ModerateNews, ModerateComments, Unregister) 1h (113h)

2020-12-07: Continue Work on Unit Tests (commentsReducer, adsReducer, authReducer) 1h (114h)

2020-12-08: Continue Work on Unit Tests (marketReducer, newsReducer, usersReducer) 1h (115h)

2020-12-11: Finish Work on Unit Tests (RenderNews, RenderMarket), Eleventh Iteration Goals Met 1h (116h)

2020-12-12: Reimplement MySQL Queries With Sequelize 4h (Total 120h)

2020-12-13: Backend Refactoring 2h (Total 122h)

2020-12-18: Backend Refactoring, Ads Model/Controller Expanded 2h (Total 124h)

2020-12-19: Backend Refactoring, Publish Insert Modals 3h (Total 127h)

2020-12-20: Refactoring, Ads Moderation Route 2h (Total 129h)

2020-12-22: Modal Tests 2h (Total 131h)

2020-12-30: Responsiveness Fixes, Minor Usability Fixes 2h (Total 133h)

2021-01-02: Responsiveness Fixes 3h (Total 136h)

2021-01-03: Responsiveness Fixes, Sequelize Cascade Deletes, Disable Default Sync Alter 1h (Total 137h)

2021-01-04: Twelfth Iteration Goals Met 1h (Total 138h)

2021-01-07: Start Working on Picture Upload Functionality 3h (Total 141h)

2021-01-08: Start Working on News Article Edit Functionality 2h (Total 143h)

2021-01-10: Continue Work on Picture Upload Functionality, Picture Delete Functionality 3h (Total 146h)

2021-01-11: Refactoring, Continue Work on Picture Upload/Delete Functionality, Better Response Status Codes 2h (Total 148h)

2021-01-12: Update REST API Documentation 1h (Total 149h)

2021-01-14: Change Status Codes 200->201 For Requests That Create New Resources, Automatically Delete Orphaned Comments From Redux 1h (Total 150h)

2021-01-15: Refactor React Components to components Subfolder, Use Absolute Imports 2h (Total 152h)

2021-01-16: Improve Front End Unit Test Coverage, Thirteenth Iteration Goals Met 2h (Total 154h)

2021-01-19: Absolute File Paths for Avatars and Pictures 1h (Total 155h)

2021-01-20: Unit Tests for ModerateAds, ModeratePictures, Bug Fixes, DB Relations With Sequelize hasMany-belongsTo, Sequelize Default Timestamps 3h (Total 158h)

2021-01-21: Start Working on Backend Tests (Basic GET for all controllers) 2h (Total 160h)

2021-01-26: Continue Working on Backend Tests (Start Working on Authorization Tests) 2h (Total 162h)

2021-01-27: Continue Working on Backend Tests (More Authorization Tests) 2h (Total 164h)

2021-01-30: Continue Working on Backend Tests (Confirm Response JSON Structures, Messages) 3h (Total 167h)

2021-02-02: Finish Work on Backend Mocha Tests, First Heroku Deployment 3h (Total 170h)

2021-02-03: Begin Work on Backend OpenAPI Documentation 1h (Total 171h)

2021-02-04: Finish Work on Backend OpenAPI Documentation 2h (Total 173h)

2021-02-12: Moderation Routes Visible Only for Admin Users, Reset Route Authentication Checks 1h (Total 174h)

2021-02-16: Begin Work on Project Documentation, User Manual 2h (Total 176h)
