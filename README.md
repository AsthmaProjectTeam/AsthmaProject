# Asthma Project


## Usage
This is a platform that we designed for doctors to collect patients' information easily. The big idea is "information sharing" in the format of questionnaires.
Doctors will be able to create a questionnaire for his patients, and all doctors of the same patient can get access to this patient's questionnaire record. 
Patients will get notification from the doctor when he needs to answer a questionnaire, and he can also answer a questionnaire anytime he wants.
The flow of each questionnaire is different based on the answer of this patient as well as the type of each question. 

## Client Side Design
### Front End Design
Front End part in this project is built in React Native. The main idea of this app is its generic feature and its simplified user interaface. This app is generic to both Android and IOS. Clients simply scan a QR code to register and no need to log on afterwords. There are three screens descripted as follows.

### Function explanation 
Three Screens:
1. #### loginPage: 
	Click log in button to QR code scanner if first time register. 
	After scanning, it directs the client to welcomePage.
	  
2. #### welcomePage: 
	Click start to answer questions button to start answer questions. It directs the client to questionList page.
3. #### questionList: 
	Displays all questions for client to select and a submit button at bottom.
	**NOTE: needs to be refactored to display one question on each page*

### Other parts
list what you wanna say

## Server Side Design

### Data Model
 Data model in this project is built on MongoDB. NoSQLå data model provide more scalable feature.

### API

#### Account

| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
| POST      	| /v2/accounts/initiators	 |Create a Initiator |
| POST    		| /v2/accounts/initiators/login      | Initiator login|
| GET 			| /v2/accounts/patients/:id/register/temp-token   |Initiator create a temp token(used for generate QR code) for patient registeration|
| PATCH 			| /v2/accounts/patients/register   | Register Patient's phone to database(connected phone with profile in database via QRCode). |


#### Initiator
| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
|GET|/v2/initiators/profile|Get a Initiator's profile|
|PATCH|/v2/initiators/profile|Update a Initiator Profile|
|PATCH|/v2/initiators/patients/add|Append/Add a list of patients to Initiator|
|POST|/v2/initiators/patients/new|Create a new patient in database|
|PATCH|/v2/initiators/patients/:id/profile|update profile of a patient|
|DELETE|/v2/initiators/patients/:id|delete target patient of initiator's patients list|
|PATCH|/v2/initiators/patients/question-set|Initiator append new questions set to a list of patients|
|DELETE|/v2/initiators/patients/:id/question-set|delete target patient's(under initiator's patients list) question set.|
|GET|/v2/initiators/patients/:id/profile|Get a patient's(under initiator's patients list) profile|
|POST|/v2/initiators/patients/:id/results|Initiator answer a patient's(under his patients list) question set|
|POST|/v2/initiators/patients/query|Initiator query a patient via first name and last name|

#### Paitient
| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
|POST|/v2/patients/results|Upload patient's pain check result|
|GET|/v2/patients/results| GET all results of a patient|
|GET|/v2/patients/profile|GET a patient's profile via jwt|


#### Question
| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
|POST|/v2/questions/create|Create a Question|
|GET|/v2/questions/|Query a question|
|POST|/v2/question-set/create|Create a Question Set|
|GET|/v2/question-set/:id|GET a Question Set by ID|

#### Admin
| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
|GET|/v2/admin/patients|get all patients|
|GET|/v2/admin/initiators|get all initiators|
|GET|/v2/admin/questions|get all questions|
|GET|/v2/admin/question-set/:id|get all question-set|

#### CSV
| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
|GET|/v2/csv/patients/results|export patients results to csv for downloading|


---
#### POST/v2/accounts/initiators
Create a doctor account. If success, client will receive 200 with created username and json web token.

##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | NO     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/accounts/initiator'
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

##### Sample Response Data
```js
{
	"username": "test",
    "token":	"****this is json web token***"
}
```
------------------------------------------------------------
#### GET /v2/accounts/patients/:id/register/temp-token 
Initiator create a temp token for patient registration
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --get --include 'https://localhost/v2/accounts/patient/register/temp-token'
-H 'Accept: application/json' 
```

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 401    					| Unauthorized User			|
| 500    					| Internal Database Error								|

##### Sample Response Data
```js
{
    "token":	"****this is json web token***"
}
```
------------------------------------------------------------
#### PATCH /v2/accounts/patients/register
Create a Patient account. Need temporary JWT for authentication.
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 
##### Sample Request
```
curl --post --include 'https://localhost/v2/accounts/patients/register'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "uuid": "*****uuid****"
}
```
##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| uuid	    			| in the form of uuidv4/uuidv5					|true		|
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| No token/Invalid token		|
| 500    					| Internal Database Error								|
##### Sample Response Data
```js
{
    "token":	"****this is json web token***"
}
```
------------------------------------------------------------

------------------------------------------------------------
#### POST /v2/accounts/initiators/login
Doctor login with token. If success, it will return a valid json web token and doctor's id
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | NO    			|
| Rate limited? 			| / 				| 
##### Sample Request
```
curl --post --include 'https://localhost/v2/accounts/initiator/login'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "username":		"doctor",
  "password":		"qqq111!"
}
```
##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| username    			| consists of letters and number, length: 5-10m	|true		|
| password  			| \												|true		|

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| Username doesn't exist or invalid password			|
| 500    					| Internal Database Error								|
------------------------------------------------------------

------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------
#### POST /v2/questions/create
Patient Relogin via QRCode. Need temporary JWT for authentication.
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 
##### Sample Request
```
curl --post --include 'https://localhost/v2/questions/create'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "app": "pain_check",
  "type":"option",
  "description":"This is test Qustion",
  "options":[
  		{"key":"A", "value":"Yes"},
        {"key":"B",  "value":"No"},
  ]
}
```
##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| app	    			| application which this question below to/must be a string|true		|
|description|the main part of question. required for all question|true|
|type|question type; used for client render question|true|
|option|only required when "type" is "option";indicate options|false|
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| No token/Invalid token		|
| 500    					| Internal Database Error								|
##### Sample Response Data
```js
{
    "question":{
    	"_id":1
    	"author":1,
        "app":"pain_check",
        "description":"How are you feeling today",
        "type":"option",
        "option":[
              {"key":"A", "value":"Yes"},
              {"key":"B",  "value":"No"},
        ],
        "created_date":"2017-06-18"
    }
}
```
------------------------------------------------------------
#### GET /v2/questions/
Query a question
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 
##### Sample Request
```
curl --post --include 'https://localhost/v2/questions/?id=1'
-H 'Accept: application/json' 
```
##### Optional Query
| 			     			| 		 			|
| ------------- 			|:-------------:	|
|id|id number of question|
|--|||

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| No token/Invalid token		|
| 500    					| Internal Database Error								|
##### Sample Response Data
```js
{
    "question":{
    	"_id":1
    	"author":1,
        "app":"pain_check",
        "description":"How are you feeling today",
        "type":"option",
        "option":[
              {"key":"A", "value":"Yes"},
              {"key":"B",  "value":"No"},
        ],
        "created_date":"2017-06-18"
    }
}
```
------------------------------------------------------------
#### POST /v2/question-set/create
Create a Question Set
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 
##### Sample Request
```
curl --post --include 'https://localhost/v2/question-set/create'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{ "app":"pain-check",
  "title":"Pain Check",	
  "content":[
  	{
    	"question":1,
        "end_question":false,
        "next_question":[
        	{
            	"question_id":"2",
                "prerequisite":{
                	"option":"A"
                }
            },
            {
            	"question_id":"3",
                "prerequisite":{
                	"option":"B"
                }
            }
        ]
    },
    {
    	"question":2,
        "end_question":true
    },
    {
        "question":3,
        "end_question":true
    }
  ]
}
```
specifically, for "prerequisite" field, we can choose one of  them:
```js
"prerequisite":{
"option":"A"
},
"prerequisite":{
"value":52
},
"prerequisite":{
"interval":{
	"interval":[0,50],
    "left_close":true,
    "right_close":true
    }
},
"prerequisite":{
  "greater_than":{
      "value":52,
      "include_value":true
  }
 }
"prerequisite":{
  "less_than":{
      "value":52,
      "include_value":true
  }
 }

```


##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|

|option|only required when "type" is "option";indicate options|false|
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| No token/Invalid token		|
| 500    					| Internal Database Error								|
##### Sample Response Data
Same as request data
------------------------------------------------------------
#### GET /v2/question-set/:id
GET a Question Set by ID
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 
##### Sample Request
```
curl --get --include 'https://localhost/v2/question-set/1'
-H 'Accept: application/json' 
```
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| No token/Invalid token		|
| 500    					| Internal Database Error								|
##### Sample Response Data
```js

```
------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------
#### GET /v2/initiators/profile
Get a Initiator's profile by ID
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator himself)     			|
| Rate limited? 			| / | 
##### Sample Request
```
curl --get --include 'https://localhost/v2/initiator/:id/profile'
-H 'Accept: application/json' 
```
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| No token/Invalid token		|
| 500    					| Internal Database Error								|
##### Sample Response Data
```js
{
	"username":		"doctor",
  	"first_name":	"mike",
  	"last_name":	"L",
  	"email":		"mike.L@mail.com",
  	"phone":		"6121236523"
    "patients":		[{_id:1 , first_name:"p", last_name:"c"},
    				 {_id:2,  first_name:"bell", last_name:""g }]
}
```
---------
#### POST /v2/initiators/patients/new
Create a new patient;
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/initiator/:id/profile'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "first_name":	"mike",
  "last_name":	"L",
  "mrn":		"123124124",
  "date_of_birth":		"1990-01-01"
}
```
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|
---------
---------
#### POST /v2/initiators/patients/query
Query a patient via first name and last name
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/initiator/:id/profile'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "first_name":	"mike",
  "last_name":	"L",
}
```
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|
---------


#### PATCH /v2/initiators/patients/:id/profile
Update profile of a patient
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/initiator/:id/profile'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "first_name":	"mike",
  "last_name":	"L",
  "mrn":		"123124124",
  "date_of_birth":		"1990-01-01"
}
```
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|

------------------------------------------------------
#### PATCH /v2/initiators/profile
Update a Initiator Profile by ID
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/initiator/:id/profile'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "first_name":	"mike",
  "last_name":	"L",
  "email":		"mike.L@mail.com",
  "phone":		"6121236523"
}
```
##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| first_name			| consists of letters(uppercase and lower case) |true		|
| last_name				| consists of letters(uppercase and lower case) |true		|
| email					| valid email format							|true		|
| phone					| 10 digits										|true		|

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|

##### Sample Response Data
```js
{
  "first_name":	"mike",
  "last_name":	"L",
  "email":		"mike.L@mail.com",
  "phone":		"6121236523"
}
```
------------------------------------------------------
#### PATCH /v2/initiators/patients/add
Append/Add a list of patients to Initiator
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/initiator/:id/patients/add'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "patients_id": [1,2,3]
```
##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| patients_id	   		| a list of patients id  |true		|

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|

##### Sample Response Data
```js
"profile": {initiator's profile}
```
------------------------------------------------------
#### PATCH /v2/initiators/patients/question-set
Initiator assign new questions set to a list of patients
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/initiator/patients/question-set'
-H 'Accept: application/json' -d {data.json}
```
##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
|patient_list|array of patient's id|true|
|q_list|array of id of question set|true|
##### Sample Request Data
```js
{
  "patient_list":[1,2,3],
  "q_list":[1,2,3]
}
```

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|
------------------------------------------------------
------------------------------------------------------
#### DELETE /v2/initiators/patients/:id
Initiator delete target patient from his patients' list
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/initiator/patients/question-set'
-H 'Accept: application/json'
```

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|
------------------------------------------------------
------------------------------------------------------
------------------------------------------------------
------------------------------------------------------
#### DELETE /v2/initiators/patients/:id/question-set
Initiator delete target patient's question set. target patient must under this initiator's patients list.
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/initiator/patients/question-set'
-H 'Accept: application/json'
```

##### Sample Request Data
```js
{
  "q_list":[1,2,3]
}
```

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|
------------------------------------------------------
#### GET /v2/initiators/patients/:id/profile
Initiator get target patient's detailed profile(including results). target patient must under this initiator's patients list.
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --get --include 'https://localhost/v2/initiator/patients/question-set'
-H 'Accept: application/json'
```


##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|
------------------------------------------------------
#### POST /v2/initiators/patients/:id/results
Initiator answer a patient's(under his patients list) question set
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/patients/:uuid/results'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "app":"pain_check",
  "results":[
  	{"q_id":1, "value":5}
  ]
}
```

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|

-------------------
------------------------------------------------------
#### POST /v2/patients/results
Upload patient's result
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/patients/:uuid/results'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "app":"pain_check",
  "results":[
  	{"q_id":1, "value":5}
  ]
}
```

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|


--------------------------------------------
#### GET /v2/patients/profile
Get Patient's profile
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/patients/:uuid/results'
-H 'Accept: application/json' -d {data.json}
```

##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|


##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|

##### Sample Response Data



































----------










---------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------



## Where should i go next?  

### client
xxxxx  

### server
xxxxx



