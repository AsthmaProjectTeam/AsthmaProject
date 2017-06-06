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
	Lead to Scan QR code page if first time register. 
	Lead to welcomePage if already registered.
	  
2. #### welcomePage: 
	<Button> Click to start answer questions - lead to questionList page.
3. #### questionList: 
	Display all questions and a submit button at bottom.

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



### API

##### POST /v1/accounts/doctor
##### POST /v1/accounts/patient

##### POST /v1/oauth2/doctor/token
##### POST /v1/oauth2/patient/token

##### GET /v1/doctor/:id/profile
##### GET /v1/doctor/:id/questions
##### GET /v1/doctor/:id/question/:id
##### GET /v1/doctor/:id/patients
##### GET /v1/doctor/:id/question-set/:start_node



##### POST /v1/doctor/:id/patient/add
##### POST /v1/doctor/:id/search-question


##### PATCH /v1/doctor/:id/profile
##### PATCH /v1/patient/:id/profile

##### GET /v1/patient/:id/profile
##### GET /v1/patient/:id/data
##### GET /v1/patient/:id/question-set/:start_node

##### POST /v1/patient/:id/submit

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
| POST	      	| /v1/doctor/:id/patient/add				| doctor meet a new patient |
| POST	      	| /v1/doctor/:id/search-question		 	| doctor query a question by keywords |
| PATCH			| /v1/doctor/:id/profile					| update doctor's profile		|
---
| Method        | URL           				 			| Description  |
| ------------- |:-------------:				 			| -----:|
| GET	      	| /v1/patient/:id/profile		 			| get patient's profile |
| PATCH			| /v1/patient/:id/profile					| update patient's profile		|
| GET    		| /v1/patient/:id/data       				| show patient's result set |
| GET 			| /v1/patient/:id/question-set/:start_node  | query question set start from start node |
| POST 			| /v1/patient/:id/submit					| patient submit  |
---


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

#### POST /v1/oauth2/doctor/token
Doctor login with token. If success, it will return a valid json web token and doctor's id
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | NO    			|
| Rate limited? 			| / 				| 
##### Sample Request
```
curl --post --include 'https://localhost/v1/oauth2/doctor/token'
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

---
#### POST /v1/oauth2/patient/token
Patient login with token. If success, it will return a valid json web token.
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | NO    			|
| Rate limited? 			| / 				| 
##### Sample Request
```
curl --post --include 'https://localhost/v1/oauth2/patient/token'
-H 'Accept: application/json' -d {data.json}
```
##### Sample Request Data
```js
{
  "username":		"patient",
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

---
#### POST /v1/oauth2/patient/qrcode
Patient login with QR Code.

##### Not Implement yet


------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

#### GET /v1/doctor/:id/profile
Retrive a doctor's profile
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES    			|
| Rate limited? 			| / 				| 
##### Sample Request
```
curl --get --include 'https://localhost/v1/doctor/:id/profile'
-H 'Accept: application/json'
```
##### Sample Response
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
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 401    					| User is not authenticated								|
| 403    					| User does not have authorization to access a specific resource|

------------------------------------------------------------------------------------------------
#### PATCH /v1/doctor/:id/profile
#### PATCH /v1/patient/:id/profile
This two endpoints are used to update doctor/patient basic profile. Note: it's not used to update password.
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES    			|
| Rate limited? 			| / 				| 
##### Sample Request
```
curl --patch --include 'https://localhost/v1/accounts/patient/1'
-H 'Accept: application/json' -d {data.json}
```
##### Request Data Validation
| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| first_name    		| 												|optional	|
| last_name				| 												|optional	|
| email		    		| 												|optional	|
| phone					| 												|optional	|
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 400    					| Invalid request data format. Recheck validation again	|
| 401    					| User is not authenticated								|
| 403    					| User can't access target user's profile				|
| 500    					| Internal Database Error								|
<span style="color:red"> Doctor should have access to their patientS. Patients themselvies can access. Currently, we allow any user to update profile</span>

------------------------------------------------------------------------------------------------
#### POST /v1/doctor/:id/patient/add
Append a new patient to doctor's patient lists. Pair Doctor and Patient.
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES    			|
| Rate limited? 			| / 				| 
##### Sample Request
```
curl --patch --include 'https://localhost/v1/doctor/:id/patient/add'
-H 'Accept: application/json' -d {data.json}
```
##### Request Data Validation
| 		Field 			| 		 	Description 						| Required	| 		 			
| ------------- 		|:-------------:								|:----		|
| patient_id    		|must be a valid patient ID						|true		|

------------------------------------------------------------------------------------------------

#### GET /v1/doctor/:id/questions
Retrieve all questions created by this doctor
Retrive a doctor's profile
##### Resource Information
| 			     			| 		 			|
| ------------- 			|:-------------:	|
| Response formats    		| JSON	 			|
| Requires authentication?  | YES    			|
| Rate limited? 			| / 				| 
##### Sample Request
```
curl --get --include 'https://localhost/v1/doctor/:id/profile'
-H 'Accept: application/json'
```
##### Sample Response
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
##### Error and status codes
| Status Code	   			| 	Meaning	 											|
| ------------- 			|:-------------:										|
| 401    					| User is not authenticated								|
| 403    					| User does not have authorization to access a specific resource|

---------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------



## Where should i go next?  

### client
xxxxx  

### server
xxxxx



