MyPage
![alt text](./public/assets/banner.png)


# WireFrame
![alt text](./public/assets/Screen%20Shot%202022-09-17%20at%203.30.30%20PM.png)

## Installation


## `1` Fork & Clone Project & Install Dependencies
`1` The first thing that we are going to do is `fork` and `clone`

`2` Now we are going to install the current dependencies that are listed inside of `package.json`
```text
npm install
```

`3` We need to install some packages that will be used for `authentication`. Those are the following packages:

```text
npm install bcryptjs connect-flash passport passport-local express-session method-override
```
-  [bcryptjs](https://www.npmjs.com/package/bcryptjs): A library to help you hash passwords. ( [wikipedia](https://en.wikipedia.org/wiki/Bcrypt) ) 
    - Blowfish has a 64-bit block size and a variable key length from 32 bits up to 448 bits.
- [connect-flash](https://github.com/jaredhanson/connect-flash): The flash is an area of the session used for storing messages that will be used to to display to the user. Flash is typically used with redirects.
- [passport](https://www.passportjs.org/docs/): Passport is authentication middleware for Node.js. It is designed to do one thing authenticate requests. There are over 500+ strategies used to authenticate a user; however, we will be using one - *passport-local* Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests
- [passport-local](http://www.passportjs.org/packages/passport-local/): The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user. [passport-local](http://www.passportjs.org/packages/passport-local/)
- [express-session](https://github.com/expressjs/session): Create a session middleware with given *options*.
- [method-override](https://github.com/expressjs/method-override): Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

`4` tables
| Name     | Attributes | Attributes | Attributes | Attributes | Attributes | Attributes |
| -------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| User     | name       | email      | password   | createdAt  | updatedAt  |
| blogs    | userId     | content    | createdAt  | updatedAt  |
| gblogs   | userId     | content    | createdAt  | updatedAt  |
| messages | userId     | content    | createdAt  | updatedAt  |
| comments | userId     | blogId     | gblogId    | content    | createdAt  | updatedAt  |

`5` Make a commit

```text
git add .
git commit -m "Install dependencies for project"
```
## Routes
| Route | URL                       | Description                              |
| ----- | ------------------------- | ---------------------------------------- |
| GET   | '/'                       | takes you to the homepage (global wall)  |
| GET   | '/global/edit/:idx'       | takes you to the edit page for global    |
| GET   | '/global/delete/:idx'     | takes you to the delete page for global  |
| GET   | '/chat'                   | takes you to the chat                    |
| GET   | '/profile'                | takes you to your profile                |
| GET   | '/profile/edit/:idx'      | takes you to the edit page for profile   |
| GET   | '/profile/delete/:idx'    | takes you to the delete page for profile |
| POST  | '/new'                    | posts new message in global              |
| POST  | '/:idx/comment'           | posts comments on messages for global    |
| POST  | '/global/delete/dl/:idx'  | deletes messages in global               |
| POST  | '/chat/send'              | sends a new chat message                 |
| POST  | '/profile/blog'           | posts a new blog entry in your profile   |
| POST  | '/profile/:idx/comment'   | posts comments for blog entries          |
| POST  | '/profile/delete/dl/:idx' | deletes a blog entry from profile        |
| PUT   | '/global/new/:idx'        | updates entry for global wall            |
| PUT   | '/profile/edit/new/:idx'  | updates entry for profile blogs          |


## Introduction

MyPage is a social media plataform that aims to make the internet the fun place it once was.
The site has a global wall where you can share your thoughts with everyone as well as a global chat room.
It also provides customizable profiles for everyone.

## Technologies
HTML5
CSS
Javascript
SQL
EJS

## MyPage
To begin, signup in order to use the app.

the navigation menu at the top will then show "Profile"

try rich text in your profile posts.

you will be able to edit the apperance of your profile by commenting a <script></script> tag.

