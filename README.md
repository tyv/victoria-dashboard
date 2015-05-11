# Scrum dashboard app

#### Create Firebase App

1. Create a free account on Firebase https://www.firebase.com/
2. Create an app (database) on Firebase
3. Create basic security rules on **Security & Rules** tab  
  ```
{
    "rules": {
        "$user_id": {
          ".write": "auth != null",
          ".read": "auth != null"
        }
    }
}
```
4. Add a new user on **Login & Auth** tab using **Email & Password** subtab 
  1. Check **Enable Email and Password Authentication**
  2. Click **Add User**
  3. Fill form (this is the user details you will log into app with later)

#### On local machine:
1. Install [git](http://git-scm.com/)
2. Install [Node.js](https://nodejs.org/)
3. Git clone the dashboard from github https://github.com/jamieholliday/victoria-dashboard
4. Install gulp globally by running 
```sudo npm install -g gulp```
5. Install bower globally by running ```sudo npm install -g bower```
6. Install dependencies by running ```npm install``` from the project root.
7. Install dependencies by running ```bower install``` from the project root.
8. Start the app by running ```gulp```
9. Update the ```FIREBASE_URL``` constant in ```app/main.js``` to point to your new Firebase app url.

#### Production build

To build the files for production run ```gulp dist``` command.

#### Hosting on Firebase

1. Go to the Dashboard of your Firebase app
2. Click on the **Hosting** tab
3. Follow the instructions.


