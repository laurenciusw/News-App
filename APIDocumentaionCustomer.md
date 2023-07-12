# My news App Server

My Assets App is an application to manage your assets. This app has :

- RESTful endpoint for asset's CRD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### GET /pub/articles

> Get all assets

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

### GET /articles/:id

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
{
    "id": 1,
    "title": "Snake Invasion",
    "content": "there is a snake invasion",
    "imgUrl": "http://dummyimage.com/108x100.png/dddddd/000000",
    "authorId": 1,
    "categoryId": 4,
    "status": "Active",
    "createdAt": "2023-06-04T22:24:46.583Z",
    "updatedAt": "2023-06-04T22:24:46.583Z",
    "qr":"string"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

### GET /boomark

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
        "CustId": 1,
        "ArticleId": 1,
        "createdAt": "2023-06-04T22:47:58.408Z",
        "updatedAt": "2023-06-04T22:47:58.408Z",
        "Article": {
            "id": 1,
            "title": "Snake Invasion",
            "content": "there is a snake invasion",
            "imgUrl": "http://dummyimage.com/108x100.png/dddddd/000000",
            "authorId": 1,
            "categoryId": 4,
            "status": "Active",
            "createdAt": "2023-06-04T22:24:46.583Z",
            "updatedAt": "2023-06-04T22:24:46.583Z"
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

## POST /pub/bookmark

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

_Response (201 - Created)_

```
{
    "id": 1,
    "CustId": 1,
    "ArticleId": 1,
    "updatedAt": "2023-06-04T22:47:58.408Z",
    "createdAt": "2023-06-04T22:47:58.408Z"
}
```

_Response (404 - not found)_

```
{
    "message": "Data not Found"
}
```

_Response (500 - internal server error)_

```
{
     message: "internal server error"
}
```

## POST /pub/register

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

## POST /pub/login

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

## POST /pub/googleLogin

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
