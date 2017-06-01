# Asthma Project


## Usage
This area is used for description

## Client Side Design
### Front End Design
explain features in front endå

### Function explanation 
xxx

### Other parts
list what you wanna say

## Server Side Design

### Data Model
 Data model in this project is built on MongoDB. NoSQLå data model provide more scalable feature.

1. Doctor  

```js
{
    "_id": 1,
    "first_name": "Lorem",
    "last_name": "Lorem",
    "username": "Lorem",
    "patients": [
        ObjectId("1")
    ],
    "created_questions": [
        ObjectId("1")
    ]
}
```

2. Patient
```js
{
    "hash_code": "f1f77bcf86cd7994",
    "salt": "f1f77bcf86cd7994",
    "first_name": "Lorem",
    "last_name": "Lorem",
    "address": "Lorem",
    "email": "Lorem",
    "doctors": [
        ObjectId("1")
    ],
    "results": [
        {
            "question_id": ObjectId("1"),
            "answer": 66
        }
    ],
    "_id": ObjectId("1")
}
```

3. Question
```js
{
    "_id": ObjectId("1"),
    "description": "How are you feeling today",
    "type": "option",
    "options": [
        {
            "option": 1,
            "detail": "Good"
        }
    ],
    "created_time": Timestamp(1460127718,1),
    "created_by": ObjectId("1")
}
```

4. Flow
```js
{
    "_id": ObjectId("1"),
    "current_q": ObjectId("1"),
    "next_q": ObjectId("2"),
    "type": ">",
    "value": 81
}
```




### API Reference

#### End Points
| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
| POST      	| /v1/accounts/doctor 		 | create a doctor account |
| POST    		| /v1/accounts/patient       | create a patient account |
| POST 			| /v1/oauth2/doctor/token    | authenticate doctor a token  |
| POST 			| /v1/oauth2/patient/token   | authenticate patient a token  |
--------
| Method        | URL           				 			| Description  |
| ------------- |:-------------:				 			| -----:|
| GET	      	| /v1/doctor/:id/profile		 			| get profile of a doctor with id |
| GET    		| /v1/doctor/:id/questions       			| get all questions created by a doctor |
| GET 			| /v1/doctor/:id/question/:id    			| query a question with id |
| GET 			| /v1/doctor/:id/patients					| get all patients under a doctor  |
| GET 			| /v1/doctor/:id/question-set/:start_node	| query question set start from start node  |
| POST	      	| /v1/doctor/:id/question		 			| doctor create a new question |
| POST	      	| /v1/doctor/:id/patient		 			| doctor meet a new patient |
| POST	      	| /v1/doctor/:id/search-question		 	| doctor query a question by keywords |
---
| Method        | URL           				 			| Description  |
| ------------- |:-------------:				 			| -----:|
| GET	      	| /v1/patient/:id/profile		 			| get patient's profile |
| GET    		| /v1/patient/:id/data       				| show patient's result set |
| GET 			| /v1/patient/:id/question-set/:start_node  | query question set start from start node |
| POST 			| /v1/patient/:id/submit					| patient submit  |
---
#### POST/v1/accounts/doctor
Create a doctor account. If success, client will receive 200 with created username.

##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | NO     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v1/accounts/doctor'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "username":		"doctor",
  "first_name":	"mike",
  "last_name":	"L",
  "email":		"mike.L@mail.com",
  "password":		"qqq111!"
  "phone":		"6121236523"
}
```
##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| username    			| consists of letters and number, length: 5-10m	|true		|
| password  			| \validation update in future\     			|true		|
| first_name			| consists of letters(uppercase and lower case) |true		|
| last_name				| consists of letters(uppercase and lower case) |true		|
| email					| valid email format							|true		|
| phone					| 10 digits										|true		|

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|

----------


##### POST /v1/accounts/patient
Create a new patient information. Registion of patient need authntication of doctor. 

##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / 				| 

##### Sample Request
```
curl --post --include 'https://localhost/v1/accounts/patient'
-H 'Accept: application/json' -H 'token: {json web token}' -d {data.json}
```
##### Sample Request Data
```js
{
  "username":		"patient",
  "first_name":		"mike",
  "last_name":		"L",
  "email":			"mike.L@mail.com",
  "password":		"qqq111!"
  "phone":			"6121236523"
}
```
##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| username    			| consists of letters and number, length: 5-10m	|true		|
| password  			| \validation update in future\     			|true		|
| first_name			| consists of letters(uppercase and lower case) |true		|
| last_name				| consists of letters(uppercase and lower case) |true		|
| email					| valid email format							|optional	|
| phone					| 10 digits										|optional	|

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
---



### Authentication 

## Where should i go next?  

### client
xxxxx  

### server
xxxxx



