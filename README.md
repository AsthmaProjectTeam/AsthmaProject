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



### API

##### GET /xxxx
Response Body:
```js
```
##### POST /xxxx
Response Body:
```js
```

### Authentication 

## Where should i go next?  

### client
xxxxx  

### server
xxxxx



