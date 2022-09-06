# Monster Hunter's Guide

Deployed At: [https://monster-hunters-guide.netlify.app/](https://monster-hunters-guide.netlify.app/)

### Created By Isak Kallenbach

#### Technologies Used: Javascript, PostgreSQL, Express, React, Node.js, HTML5, CSS3 

This is an online guide to various dangerous supernatural creatures and tips on how to defeat them if you ever encounter them.

Whenever I'm in the mood to create a new project, I always try to focus it around something I'm interested in; art, fashion, movies, etc. In this case I decided to focus my project around horror, which I'm a big fan of. With that in mind, I created a fun "guide" that pretends that these supernatural creatures are real and what to do when you come across them.


## Instructions

The following instructions are for local use only. Instructions that are necessary only for deployment will be marked accordingly.

#### Database

Create and connect to a database. I use Postbird for local databases, but anything, including the CLI, work perfectly fine. 

Copy and paste the contents of the **monster-hunters-db.sql** file in the server/db directory to create all the necessary tables.

Use the **monsters.sql** file in the same directory to insert some items into the tables.

#### Server

These instructions are meant to be done solely in the server diretory.

Create an .env file with these environment variables (values can be with or without quotes):

- **DB_USER=** Your database username.
- **DB_PASSWORD=** Your database password.
- **DB_PORT=** The port that your database is connected to (This is normally 5432).
- **DB_DATABASE=** Your database's name.
- **DB_HOST=** The host address. **Deployment Only** - I'm pretty sure.
- **PORT=** The Port you want to open the server on (I had 5000, just pick something that isn't 3000, which is where the Client opens). This port needs to be reflected in the Client .env variables.
- **CORS_ORIGIN=** The URL where you deployed your front-end. **Deployment Only**

The following commands are meant to be typed into the terminal at the server's directory:

##### 1. npm install

This will install all modules and dependencies needed to run the app.

##### 2. npm start

This should set the app listening at [http://localhost:5000](http://localhost:5000). Or whatever you've set your PORT variable to.

#### Client

These instructions are meant to be done solely in the client diretory.

Create an .env file with these environment variables (values can be with or without quotes):

- **REACT_APP_SERVER_URL=** http://localhost:5000/api
- **REACT_APP_DEV_URL=** http://localhost:5000
- **REACT_APP_GOOGLE_URL=** http://locahost:5000/api/auth/google

I have localhost:5000, but remember this should be whatever the PORT= env variable is in the server directory.

The following commands are meant to be typed into the terminal at the server's directory:

##### 1. npm install

This will install all modules and dependencies needed to run the app.

##### 2. npm start

This should open your app at [http://localhost:3000](http://localhost:3000).


#### My Links:
[Personal Portfolio](https://isakkallenbach.netlify.app/)
<br>
[Github](https://github.com/kallenbach13)