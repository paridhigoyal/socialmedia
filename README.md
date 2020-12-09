
# Project Objective:
The explosion of social media project  is to changing the way of communication. Through this links between people will improve and one can post anything of his choice and the other can give reviews in the form of comments and also can like the post and follow them.

# Features:
- User Authentication
- Login 
- Forget password
- User authorization
- User Profile
- Comment
- Like
- Post



# Technology Stack:

## Backend:
- Python 3.5.2
- Django
- Django rest framework

## Database:
- MySQL

## Frontend:
- React + Redux
- HTML
- CSS
- Bootstrap


# Project Structure
.<br/>
├── frontend<br/>
│   ├── node_modules<br/>
│   ├── public<br/>
│   ├── README.md<br/>
│   ├── package.json<br/>
│   ├── package-lock.json<br/>
│   ├── README.md<br/>
│   ├── src<br/>
│   │   ├── actions<br/>
│   │   │   ├── action_types.js<br/>
│   │   │   ├── index.js<br/>
│   │   ├── app<br/>
│   │   │   └── store.js<br/>
│   │   ├── App.css<br/>
│   │   ├── App.test.js<br/>
│   │   ├── components<br/>
│   │   │   ├── AddComment.js<br/>
│   │   │   ├── AddPost.js<br/>
│   │   │   ├── App.js<br/>
│   │   │   ├── ChangePassword.js<br/>
|   │   │   ├── CommentRate.js<br/>
│   │   │   ├── EditComment.js<br/>
│   │   │   ├── EditPost.js<br/>
│   │   │   ├── EditProfile.js<br/>
|   │   │   ├── EditUserInfo.js<br/>
│   │   │   ├── Followers.js<br/>
│   │   │   ├── Following.js<br/>
│   │   │   ├── Follow.js<br/>
│   │   │   ├── ForgetPassword.js<br/>
│   │   │   ├── Login.js<br/>
│   │   │   ├── NavigationBar.js<br/>
│   │   │   ├── PostRate.js<br/>
│   │   │   ├── Posts.js<br/>
│   │   │   ├── SearchUserPost.js<br/>
│   │   │   ├── Signup.js<br/>
|   │   │   ├── UserProfileDetail.js<br/>
│   │   │   ├── UserProfile.js<br/>
│   │   │   ├── UserProfiles.js<br/>
│   │   │   └── validate.js<br/>
│   │   ├── index.css<br/>
│   │   ├── index.js<br/>
│   │   ├── reducers
│   │   |   ├── auth_reducer.js
│   │   |   ├── commentReducer.js
│   │   |   ├── followerreducer.js
│   │   |   ├── followingreducer.js
│   │   |   ├── index.js
│   │   |   ├── postreducer.js
│   │   |   ├── profilereducer.js
│   │   |   ├── userInfoReducer.js
│   │   |   ├── userPostReducer.js
│   │   |   └── userProfileReducer.js
│   │   ├── serviceWorker.js<br/>
│   │   ├── setupTests.js<br/>
│   │   └── utility<br/>
│   │       └── index.js<br/>
│   └── yarn.lock<br/>
├── manage.py<br/>
|── media<br/>
│   └── frontend<br/>
│       └── src<br/>
│           ├── post-images<br/>
│           └── profile-pictures<br/>
├── README.md<br/>
├── requirements.txt<br/>
├── .gitignore<br/>
├── .env<br/>
├── socialmediaapi<br/>
│   ├── admin.py<br/>
│   ├── apps.py<br/>
│   ├── __init__.py<br/>
│   ├── migrations<br/>
│   │   ├── __init__.py<br/>
│   │   └── __pycache__<br/>
│   ├── models.py<br/>
│   ├── paginators.py<br/>
│   ├── permissions.py<br/>
│   ├── __pycache__<br/>
│   ├── serializers.py<br/>
│   ├── tests.py<br/>
│   ├── urls.py<br/>
│   └── views.py<br/>
└── socialmediaproject<br/>
    ├── __init__.py<br/>
    ├── __pycache__<br/>
    ├── settings.py<br/>
    ├── urls.py<br/>
    └── wsgi.py<br/>


# Running locally
1.__Create a virtual environment :__ virtualenv venv <br/>
2.__Clone the repo :__    git@github.com:paridhigoyal/socialmedia.git<br/>
3.pip install -r requirements.txt<br/>
4.__Create Database :__  python manage.py migrate<br/>
5.__Create admin :__  python manage.py createsuperuser<br/>
6.__Run project :__  python manage.py runserver.<br/>

# To run frontend locally
1.Clone this repo
2.npm install to install all req'd dependencies(material-UI, react-redux,  router-dom, PhoneInput)
3.npm start to start the local server (this project uses create-react-app)

# Future scope of the Project:
In future the chatting application , group can be created,  conference call, video calling,  calling , within the group post something,  make admin member of particular group to maintain group activities,  event management,  pages , save post, notification  .


