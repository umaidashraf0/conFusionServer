# conFusion Server
Learning server side development with Express and MongoDB.

In this project, I have used the **Express Framework** to develop the server side API for my **[React Client Application](https://github.com/mnazir23/confusion-react)**

## API Endpoints Implemented
1. Dishes
2. Leaders
3. Promotions
4. Users
5. Favorites
6. Comments

## How To Run
To start using this application, go to your terminal, in the root directory of this project, and type
```
npm install package.json
```
This will install all the packages needed to successfully start up the application.

You will also need to go and install **Mongoose Database** in your computer as we are using Mongo as our backend database with our Express application.

Once you have installed all the necessary prerequisites, in your command prompt, type:
```
mongod --dbpath="<path>\data" --bind_ip 127.0.0.1  --- (This is for Windows Only)
```
Once your Mongo database is successfully running, open up a new terminal and type:
```
npm start
```
This will successfully run the server side application on **https://localhost:3443/**

If you open it up in the browser you will get the error thrown by the browser that the certificate used by the server is unverified, ignore that warning and continue as we are using a self signed certificate for this application.

## Populate Mongo Database
When you first start your application, your Mongo database will be empty. We need to populate it with the compulsory data so that we can run our client side React application successfully.

To do this, I have provided a folder in the root directory of the project called **populate_database**. Inside that folder, I have added three JSON files that contain the data that we need.

Use those files to add data for the following components 

- Dishes
- Leaders
- Promotions

### Populate via Postman
To add data to the Mongo database via Postman, perform the following steps

1. Create a table by the name **users** in the database directly.
2. Add an **admin** user. Make sure to check the **users** model to find out how to create an admin user.
3. Using Postman, hit the *https://localhost:3443/users/login* endpoint. Provide your **username** & **password** in the body of the request in **JSON** format.
4. The response will return a token value. Save this token as you will need it when adding data to the database via Postman. Each *POST* request, requires this token as authorization in the header.
    ```
    - Authorization: bearer <token>
    ```
5. Checks are in place to make sure that, any non admin user cannot add the above mentioned data in the database.

Once this is all done, your server side application is ready to serve.