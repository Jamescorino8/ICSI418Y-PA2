# Login and Signup

**Author:** James Corino

## Description

Login and Signup is a full-stack web application for creating user accounts and logging in. The frontend is built with React, and the backend is built with Node.js and Express, with user information stored in MongoDB. The React interface sends form data to the Express server using HTTP requests, and the server validates the data, reads from or writes to the database, and sends back a message that is displayed to the user.

## Features

* Sign up with a first name, last name, username, and password
* Reject signups with one or more empty fields
* Prevent duplicate usernames; each username must be unique
* Store new users in MongoDB with `_id`, `f_name`, `l_name`, `username`, and `password`
* Log in with a username and password
* Reject logins with empty fields, a username that does not exist, or an incorrect password
* Display a success or failure message under each form after it is submitted
* Show an error message if the server cannot be reached or a database error occurs

## Technologies

* React (Vite)
* Node.js
* Express
* MongoDB

## How to Run

1. Clone the repository:

```
git clone git@github.com:Jamescorino8/ICSI418Y-PA2.git
```

2. Install the server dependencies:

```
cd ICSI418Y-PA2/server
npm install
```

3. Create a file named `.env` inside the `server` folder with your MongoDB connection string:

```
MONGO_URI=your_mongodb_connection_string
```

4. Start the server (it runs on port 9000):

```
node server.js
```

5. In a second terminal, install the client dependencies and start the React app:

```
cd ICSI418Y-PA2/client
npm install
npm run dev
```

6. Open the local address shown in the terminal (usually `http://localhost:5173`) in a web browser.

## Known Issues

* None at this time.