
# Food Space

> A MERN Stack CRUD application that allows users to have a personal food management system for their homes.
## Screenshots

<ul style="display:flex flex-direction:column">
<img src="./screenshots/landing.PNG" width="172" height="375" alt="landing"> 
<img src="./screenshots/foodspace.PNG" width="172" height="375" alt="loading">
<img src="./screenshots/user-dashboard.PNG" width="172" height="375" alt="difficulty">    
</ul>


## Live Demo
https://jonathancarpena.me/demo/foodspace


## Tech Stack

### Front End:

- React
- Redux
- Tailwind CSS

### Back End: 
- MongoDB
- Express
- Node.js
- jsonwebtoken
- bcrypt


## Features

- Authentication
    - User registration
    - User login with email and password
    - Email collision feature 
- Authorization
    - User cannot create new foodspace without being authenticated
    - User cannot delete foodspace created by another user
    - User cannot delete or edit items that are owned by another user
- Managing Food Spaces with basic functionalities
    - Create, Read, Update and Delete areas, food items, and users.
    - Upload new food items to the product database.
    - Browse through the product database.
- Mobile Design



## Setup

Clone down this repository. You will need node and npm installed globally on your machine.
```
$ git clone https://github.com/jonathancarpena/foodspace.git
```
1. Install project folder `npm install`
1. Install frontend packages `cd frontend`  `npm install`
1. Install backend packages `cd backend`  `npm install`





    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file inside the backend folder.

`MONGO_URI`: Register a new cluster in MongoDB Atlas and record your Mongo URI

`TOKEN_KEY`: a randomly generated string of numbers and letters. (Ex. "8c6b1abd9d8c44eb")

## Scripts


Development mode. Open http://localhost:3000 to view it in the browser. 
```
npm run dev
```

Server-side. (PORT:5000) Open http://localhost:5000 to access.
```
npm run server
```

Client-side. (PORT:3000) Open http://localhost:3000 to view it in the browser.
```
npm run client
```




## Summary

### Why I built this project:
- Tracking the expiration dates of each item in your household can be very difficult to remember.
- Understanding when food is about to expire, will prevent us from wasting money. 
- When I have a recipe in mind to cook, I would occasionally stumble upon ingredients that were expired, thus having to throw them away and visiting the groceries store to buy some. Or I would not make the dish at all.


### What was the focus of the project:
- Learn how to connect a database, create a server, and authenticate users.
- To build an application that tracks and alerts you when food is expired.
- Allow multiple users to access one Food Space entity at time.
- Have the application be used on a mobile device with a simple user interface.


### How I worked on this project:
- Followed a tutorial on how to create a MERN stack application and created a small project with CRUD operations
- Simulated the same project and expanded the boundaries by implementing more routes and more controllers. As well as implementing middleware that autheticated users for specific tasks.
- Proritized learning UI design by gaining inspiration from various platforms such as common mobile design patterns found throughout Dribbble as well as the login/landing page found on Notion.
- Implemented Redux and Redux Toolkit to track the application state by checking if a user was authenticated and based on the result, designate the user to a different route.
- Manipulated data to alert users when items were expired or time till expiration. 
- Created features to allow users to create their own food space, add products to those spaces, and invite/remove other users into those spaces. 

### As a Result:
- I learned how to build a server using Express and Node by composing multiple models, routes, and controllers.
- I learned how to store, read, update, and delete data from the MongoDB database.
- I learned to organize my files into explicit folders and to prioritize creating reusable components.
- The most challenging aspect of this project was adapting to the structure of the backend. Learning to structure the code with models, controllers, and routes was a new concept for me, so as a result it took me around 2-3 weeks to grasp the idea. Fortunately after going through the tutorial and further studying the backend functions, I was able to develop application I have now.
- If I were to continue this project, I would style the project to be responsive for the web, expand the product database so this application would not be heavily dependent on users to create the data and experiment with using a relational database such as mysql.

