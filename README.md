<h1>Calendar-App</h1>

<h3>Description:</h3>
An Event Manager web application that has a few but supports the primary operations of Create/Remove/Update/Display the preplanned events/meetings. 
Initially this prompts up a registration page where new users can register and pre-registered users can login with a seamless experience. 
The main page consists of a calendar layout that highlights the meetings that are set up throught the month.It has options for creating meetings for the future.
Each day can have multiple meetings, if a meeting is over the user can delete it, or add new meetings, update the already creating meetings if he/she wants to with only 2-3 clicks.

<h3>Project Organisation:</h3>
Frontend_


```./meet-app```

Description: Fetches data from the backend API from django server and displays on the web app.<br>
TechStack: HTML, CSS, Javascript, React

Backend_

```./backend```

Description: Consists of all the API performing the CRUD ops from the database.<br>
TechStack: Python, Django REST framework.<br>

Database: MySql<br>

<h3>Requirements:</h3>

```cd Calendar_app```
#enter project directory

```npm install -i```
#install npm libraries

```pip install -r requirements.txt```
#install python dependencies

<h3>RUN:</h3>

In Terminal 1,

```cd ./my-app```
#enter frontend directory

```npm start```
#run react server

In Terminal 2,

```cd ./backend```
#enter backend directory

```python manage.py runserver```
#run django server


<h4>A quick peek of the event manager is given below,</h4><br>

Registration:<br>
![alt text](https://github.com/Narcos101/Calendar-app/blob/main/images/register.png)

Login:<br>
![alt text](https://github.com/Narcos101/Calendar-app/blob/main/images/login.png)

Viewing montly schedule:<br>
![alt text](https://github.com/Narcos101/Calendar-app/blob/main/images/view_monthly.png)

Viewing daily schedule:<br>
![alt text](https://github.com/Narcos101/Calendar-app/blob/main/images/view_daily.png)

Viewing an event:<br>
![alt text](https://github.com/Narcos101/Calendar-app/blob/main/images/view_event.png)
