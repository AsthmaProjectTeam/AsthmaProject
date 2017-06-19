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

1. Initiator  
/**
 * This is schema for all possible initiator.
 *
 * @model Initiator
 * @param {String}      username:    A unique identifier for each initiator
 * @param {String}      email:       Contact email for initiator, should be unique
 * @param {String}      first_name:  Personal information
 * @param {String}      last_name:   Personal information
 * @param {String}      hash:        Hash code for authentication
 * @param {String}      salt:        Salt code for authentication
 * @param {[Patient]}   patients:    A array show patients this initiator in charge of
 * @param {Date}        created_data:The date this initiator created
 * @param {String}      phone:       Personal information
 * @param {String}      role:        Indicate the role. Can be 'doctor'/'nurse'/'admin'/'unknown'

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
/**
 * This is schema for patient
 *
 * @model Patient
 * @param {String}          uuid:       A unique identifier for patients
 * @param {[Initiator]}     initiators: A array indicates all doctor/nurse who in charge of this patient
 * @param {[ResultSet]}     result_set: A array show all results this patient has made
 * @param {String}          first_name: Personal information
 * @param {String}          last_name:  Personal information
 * @param {String}          phone:      Personal information
 * @param {String}          email:      Personal information
 * @param {String}          role:       Used for Permission. Can only be 'Patient'
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


### API

#### Account

| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
| POST      	| /v2/accounts/initiator 	 |Create a Initiator |
| GET    		| /v2/accounts/patient/register/temp-token       | Initiator create a temp token for patient registration|
| POST 			| /v2/accounts/patients/register    | Create a Patient account  |
| PATCH 			| /v2/accounts/patients/:uuid/profile/update   | Update a Patient account  |
|POST| /v2/accounts/initiator/login|Initiator Login|
|GET|/v2/accounts/patients/:uuid/login/temp-token|Initiator generate temp token(used for QRcode) authenticate user to login|
|PATCH|v2/accounts/patients/login|Patient Relogin with help of initiator.|

#### Initiator
| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
|GET|/v2/initiator/:id/profile|Get a Initiator's profile by ID|
|PATCH|/v2/initiator/:id/profile|Update a Initiator Profile by ID|
|POST|/v2/initiator/:id/patients/add|Append/Add a patient to Initiator|
|POST|/v2/initiator/:id/patients/export|Export patients result set to Excel|

#### Paitient
| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
|POST|/v2/patients/:uuid/pain-check/results|Upload patient's pain check result|
|GET|/v2/patients/:uuid/results| GET all results of a patient|


#### Question
| Method        | URL           			 | Description  |
| ------------- |:-------------:			 | -----:|
|POST|/v2/questions/create|Create a Question|
|GET|/v2/questions/|Query a question|
|POST|/v2/question-set/create|Create a Question Set|
|GET|/v2/question-set/:id|GET a Question Set by ID|

---
#### POST/v2/accounts/initiator
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
#### GET /v2/accounts/patient/register/temp-token
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
#### POST /v2/accounts/patients/register
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
#### PATCH /v2/accounts/patients/:uuid/profile/update
Initiator update patient's profile.
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/accounts/patients/:uuid/profile/update'
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
	"uuid": "******uuid****",
  "first_name":	"mike",
  "last_name":	"L",
  "email":		"mike.L@mail.com",
  "phone":		"6121236523"
}
```
------------------------------------------------------------
#### POST /v2/accounts/initiator/login
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
#### GET /v2/accounts/patients/:uuid/login/temp-token
Initiator generate temp token(used for QRcode) authenticate user to login. Token include current patient's uuid.
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --get --include 'https://localhost/v2/accounts/patients/:uuid/login/temp-token'
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
#### PATCH /v2/accounts/patients/login
Patient Relogin via QRCode. Need temporary JWT for authentication.
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
| uuid	    			| Patient's new uuid in the form of uuidv4/uuidv5|true		|
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
  "option":[
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
{
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
#### GET /v2/initiator/:id/profile
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
    "patients":		[{_id:1 , username:"nick"},
    				 {_id:2,  username:"bell}]
}
```
------------------------------------------------------
#### PATCH /v2/initiator/:id/profile
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
#### PATCH /v2/initiator/:id/patients/add
Append/Add a patient to Initiator
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
  "uuid": "*****uuid****"
```
##### Request Data Validation

| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| uuid	    			| Patient's new uuid in the form of uuidv4/uuidv5|true		|

##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|

##### Sample Response Data
```js
"success"
```
------------------------------------------------------
#### GET /v2/initiator/:id/patients/export
Update a Initiator Profile by ID
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES(Initiator)     			|
| Rate limited? 			| / | 

##### Sample Request
```
curl --post --include 'https://localhost/v2/initiator/:id/patients/export/?id=1'
-H 'Accept: application/json' -d {data.json}
```
##### Optional Query
| 			     			| 		 			|
| ------------- 			|:-------------:	|
|id|id number of patient|
|--|||


##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|
------------------------------------------------------
------------------------------------------------------
------------------------------------------------------
#### POST /v2/patients/:uuid/results
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
  "answer_set":[
  	{"question_id":1, "answer":5}
  ],
  "timestamp":"2017-06-19T14:44:54+00:00"
}
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



