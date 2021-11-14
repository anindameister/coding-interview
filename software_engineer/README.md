# Support tickets - Infrastructure, back-end

## Context
We run a SaaS platform for BtoB users. We use a service called Zendesk for them to submit tickets when they need help or they have issues with our service. We noticed that it's very important for them to see we are taking good care of their requests.

## 1. Concept
1. Design a system that would enrich our users with their open issues on Zendesk on the most frequent basis assuming that we can retrieve and match their email from the source.
- This is not very clear. Do I need to create a system that'll get open issues from Zendesk and store it on our database with email address?
- So, I visited the website zendesk.com and found out that I need to have atleast a demo account to utilize their API in order to retrieve the issue tickets. 

2. How would you provide additional data to the end-user such as the current status of the request? The data must be as "fresh" as possible from Zendesk.
- Initially I would download the tickets from Zendesk to my local database.
- Thereafter, create another table, called "Ticket Status", to update the current status of the ticket. Thus, with the advent of the table named "Ticket Status", we won't modify original ticket's data.
```
"Tickers"
001 jhon technical issue 


"Ticket Status"
001  PENDING
002 COMPLETED
```
3. How would you monitor that the service is running? How could you receive alerts when a user's number of tickets excesses 3 open tickets?
- I can create an API end point, where the logic will run and also check the current status of the application , current request load, 
completed request counts, incomplete or error_request counts , uptime and return these information as results. 
- Also, i can create this server with a resilient client where the application will be handled by a process control management utility, that will automatically restart the server service if any problem occurs such as hanged request, service down status etc. 
- OR
- I can use one the existing NPM packege to monitor the server by issuing get request. 
- Example. nodejs-health-checker is one of the health check npm pack which will do the job. 
- We can create a service to count the number of tickets of a user when the user creates a ticket. If a ticket 
exceed more than 3, we can push a message to a service panel using web socket. Thus the service team will be informed and the information can be stored to the database. 
4. Every hour, we run a request to their service to host Zendesk statistics (average time before tickets resolution, most efficient agent...) in our database. Assuming that 1~3% of the requests to Zendesk will fail and respond with a 500 status, how do you make sure we always have 100% accurate data stored? Describe the whole process from the hourly job initiation.
- Firstly , we can store the user ticket infomration to the local storage of the user. Afterwards, try to upload the data to the Zendesk. Even, if the response is 500, we can make the service to re-post the data later. 
We can imporve the service by improving the balance overloading of the service with elastic computing. Thus, the service can handle many request without downtime. 

## 2. Code
In a Node.js environnement (preferably Typescript) and using any library you want, create the API that would get a single user's tickets from our database enriched with the data provided by Zendesk. Here is the structure of the data available for a Zendesk ticket:

```json
{
"id": 35436,
"priority": "high",
"status": "open",
"subject": "Help, my printer is on fire!",
"description": "The fire is very colorful.",
"created_at": "YYYY-MM-DDTHH::MM::SS"
}
```

You will code a single endpoint `/api/tickets/user/:user-uuidv4` receiving the parameters of your choice and responding with the most appropriate structure for the front-end team according to you.

Describe how you would implement tests, feel free to create one.

## 3. Bonus
Your database performs slower than usual. More specifically, your queries are taking a lot of time. What would you do?
- Use a Mature ORM {Object Relation Model}. 
- Use Code first migration technique. This would let us not write queries by our self which in turn will help to reduce human errors where we write in efficient queries. 
- Replace inefficient queries such as multiple inner queries to join. 
- improve the query by creating stored procedures {Stored procedures are preprossed, so it is comparatively faster}
- Introduce indexers {so the query will search records much faster in a table}-

-------

### Tech requirements
- Node.js serverless infrastructure with functions timing out after 5 seconds
- `we need some cloud service providers for creating node.js serverless infrastructure.`
- **Test your code**
- Use only Postgres SQL Database
- Typescript is a plus
- You can consider changing anything from the database schema to the infrastructure, create micro-services, subscribe to new tools...
- `so it is mentioned that I shouldn't spend for more than 4 hours, but, is it expected out of me to create front&backend dockerised application?`

**SQL database structure:**

_users_

| **id** | **email** |
| ---| --- |
| uuidv4 | VARCHAR(255) |



_tickets_

| **user\_id** | **zendesk\_id** |
| ---| --- |
| uuid\_v4 | INTEGER |

_user\_id is a foreign key of id_

- `Note:` we cannot use uuid_v4 because in this scenario, we have got to send the uuid_v4 function which would help in generating random id, everytime. User id cannot change everytime.
```
CREATE TABLE users(
    id INTEGER NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL);
); 

CREATE TABLE users_tickets(
    user_id INTEGER NOT NULL PRIMARY KEY REFERENCES users (id),
    zendesk_id INTEGER,
    UNIQUE(user_id));
```
- `query to pass data in the first table`
```
INSERT INTO users (id,email) VALUES(365435,'anindamaulik0@gmail.com') RETURNING *;
```
- `query to pass data in the second table`
```
INSERT INTO users_tickets(user_id,zendesk_id) VALUES((SELECT id FROM users),12345) RETURNING *;
```
- `join`
```
SELECT * FROM users
JOIN users_tickets ON users.id=users_tickets.user_id;
```
![result of join](https://github.com/anindameister/coding-interview/blob/master/software_engineer/photos/2.PNG)

### Instructions
- The challenge is on!
- Build a performant, **clean and well-structured solution**.
- Commit early and often. We want to be able to check your progress.
- **Send us an email with a link to repository when you finish the assesment**.
- Please do not spend more than 4 hours.
- Please complete your working solution within 7 days of receiving this challenge.
- Please be as specific as possible in your answers!
- You can use https://www.diagrams.net/, lucidchart or any online tool to present your ideas for the first part.
![diagram](https://github.com/anindameister/coding-interview/blob/master/software_engineer/photos/1.PNG)

### Submission instructions
1. Fork this repository on github.
2. Complete the project as described above within your fork.
3. Keep the commit history - don't squash.
4. Push all of your changes to your fork on github and submit a pull request to this repository.

### Evaluation criteria (in order of importance)
1. Diagram organization and explanation / carity
2. Code readability (including comments)
3. Adherence to the tech requirements described above
4. Commit history - structure and quality
5. Completeness

Remarks:
+ Use es6 or later, do not use es5
+ Use functional programming when it is wise to do so
+ Use fetch()
+ Use airbnb stylesguides for [ES6](https://github.com/airbnb/javascript)

#### Some snaps after server side work
- `GET`
![get](https://github.com/anindameister/coding-interview/blob/master/software_engineer/photos/get.PNG)

- `POST`
![post](https://github.com/anindameister/coding-interview/blob/master/software_engineer/photos/post.PNG)

- `PUT`
![put](https://github.com/anindameister/coding-interview/blob/master/software_engineer/photos/put.PNG)

- `PATCH`
![patch](https://github.com/anindameister/coding-interview/blob/master/software_engineer/photos/patch.PNG)

- `DELETE`
![delete](https://github.com/anindameister/coding-interview/blob/master/software_engineer/photos/delete.PNG)

- `database status now`
![database](https://github.com/anindameister/coding-interview/blob/master/software_engineer/photos/databaseStatus.PNG)

- `front-end now`

![frontend](https://github.com/anindameister/coding-interview/blob/master/software_engineer/photos/frontEnd.PNG)

