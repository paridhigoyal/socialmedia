
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
- Follow
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
├── manage.py<br/>
├── socialmediaapi<br/>
│   ├── admin.py<br/>
│   ├── apps.py<br/>
│   ├── __init__.py<br/>
│   ├── migrations<br/>
│   │   ├── __init__.py<br/>
│   │   └── __pycache__<br/>
│   ├── models.py<br/>
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



# Future scope of the Project:
In future the chatting application , group can be created,  conference call, video calling,  calling , within the group post something,  make admin member of particular group to maintain group activities,  event management,  pages , save post, notification  .


