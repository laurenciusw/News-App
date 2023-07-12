# My news App Server

My Assets App is an application to manage your assets. This app has :

- RESTful endpoint for asset's CRD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### GET /articles

> Get all assets

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
     {
        "id": 1,
        "title": "Snake Invasion",
        "content": "there is a snake invasion",
        "imgUrl": "http://dummyimage.com/108x100.png/dddddd/000000",
        "authorId": 1,
        "categoryId": 4,
        "createdAt": "2023-05-16T02:39:56.296Z",
        "updatedAt": "2023-05-16T02:39:56.296Z",
        "User": {
            "id": 1,
            "username": "johndoe",
            "email": "johndoe@example.com",
            "role": "staff",
            "phoneNumber": "123-456-7890",
            "address": "123 Main St, Anytown USA",
            "createdAt": "2023-05-16T02:39:55.493Z",
            "updatedAt": "2023-05-16T02:39:55.493Z"
        }
    },
    {
        "id": 2,
        "title": "Far Far away",
        "content": "there is a kingdom in the far far away land",
        "imgUrl": "http://dummyimage.com/131x100.png/cc0000/ffffff",
        "authorId": 1,
        "categoryId": 3,
        "createdAt": "2023-05-16T02:39:56.296Z",
        "updatedAt": "2023-05-16T02:39:56.296Z",
        "User": {
            "id": 1,
            "username": "johndoe",
            "email": "johndoe@example.com",
            "role": "staff",
            "phoneNumber": "123-456-7890",
            "address": "123 Main St, Anytown USA",
            "createdAt": "2023-05-16T02:39:55.493Z",
            "updatedAt": "2023-05-16T02:39:55.493Z"
        }
    }
]
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

### POST /articles

> Create new asset

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
    "title": "<title of the articles>",
    "content": "<content of the articles>",
    "imgUrl": "<picture of the articles>",
    "authorId": "<id from user>",
    "categoryId": "<id from category>",
}
```

_Response (201 - Created)_

```
{
    "title": "<title of the posted articles>",
    "content": "<content of the posted articles>",
    "imgUrl": "<picture of the posted articles>",
    "authorId": "<id from user>",
    "categoryId": "<id from category>",
    "updatedAt": "<data updated at>",
    "createdAt": "<data created at>"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Input the News Title",
        "Input the News Content",
    ]
}
```

_Response (404 - not found)_

```
{
     message: "data not found"
}

```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}

```

### PUT /articles/:id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
    "title": "<new title of the articles>",
    "content": "<new content of the articles>",
    "imgUrl": "<new picture of the articles>",
    "authorId": "<id from user>",
    "categoryId": "<new id from category>",
}
```

_Response (200 )_

```
{
    "message": "Article with id 30 has been updated"
}
```

_Response (403 - forbidden)_

```
{
     message : "You are not authorized"
}
```

_Response (404 - not found)_

```
{
     message: "data not found"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

### PATCH /articles/:id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
    "status": "<new status of the articles>",

}
```

_Response (200 )_

```
{
    "message": "cuisine status with id 30 has benn changed to `<new status of the articles>`"
}
```

_Response (403 - forbidden)_

```
{
     message : "You are not authorized"
}
```

_Response (404 - not found)_

```
{
     message: "data not found"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

### GET /articles/:id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "id": 1,
    "title": "Snake Invasion",
    "content": "there is a snake invasion",
    "imgUrl": "http://dummyimage.com/108x100.png/dddddd/000000",
    "authorId": 1,
    "categoryId": 4,
    "createdAt": "2023-05-16T02:39:56.296Z",
    "updatedAt": "2023-05-16T02:39:56.296Z"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

### GET /categories

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
     {
        "id": 1,
        "name": "Global",
        "createdAt": "2023-05-16T02:39:56.281Z",
        "updatedAt": "2023-05-16T02:39:56.281Z"
    },
    {
        "id": 2,
        "name": "Tech",
        "createdAt": "2023-05-16T02:39:56.281Z",
        "updatedAt": "2023-05-16T02:39:56.281Z"
    }
]
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

### GET /histories

_Request Header_

```
  not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
      {
        "id": 11,
        "title": "test1",
        "description": "Article status with id 30 has been updated from undefined to Inactive",
        "updatedBy": "test1@mail.com",
        "createdAt": "2023-05-24T10:57:06.115Z",
        "updatedAt": "2023-05-24T10:57:06.115Z"
    },
    {
        "id": 10,
        "title": "test12",
        "description": "Article status with id 30 has been updated from undefined to Inactive",
        "updatedBy": "test1@mail.com",
        "createdAt": "2023-05-24T10:55:23.746Z",
        "updatedAt": "2023-05-24T10:55:23.746Z"
    }
]
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

## POST /users/register

Request:

- body:

```
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
}
```

_Response (201 - Created)_

```
{
  "message": "user with email (user.email) has been created"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "email is required"
}
{
  "message": "password is required"
}
{
  "message": "email must be unique"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

## POST /users/login

Request:

- body:

```
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```
{
  "access_token": "string",
  "email": "string",
  "userRole":"string"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "email is required"
}
{
  "message": "password is required"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

## POST /users/google-login

- body:

```
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```
{
  "access_token": "string",
  "userRole": "string",
  userEmail,: "string"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```
