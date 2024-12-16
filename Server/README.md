# API Documentation

## `/user/register`

### Description
This endpoint is used to register a new user. It validates the input data, hashes the password, and stores the user information in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

### Method
`POST`

### Endpoint
`/user/register`

### Request Body
The request body should be a JSON object containing the following fields:

- `fullName`: An object containing the user's first and last name.
  - `firstName`: A string representing the user's first name. It must be at least 3 characters long.
  - `lastName`: A string representing the user's last name. It must be at least 3 characters long.
- `email`: A string representing the user's email. It must be a valid email address and at least 5 characters long.
- `password`: A string representing the user's password. It must be at least 5 characters long.

#### Example
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

### Response

#### Success (`201`)
If the registration is successful, the server responds with a status code of 201 and a JSON object containing the JWT token and user details.

#### Example
```json
{
    "token": "your_jwt_token_here",
    "user": {
        "_id": "user_id_here",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
    }
}
```

#### Error (400)
If there are validation errors or other issues with the request, the server responds with a status code of 400 and a JSON object containing the errors.

#### Example
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Password must be of length 5",
            "path": "password",
            "location": "body"
        }
    ]
}
```

### Validation Rules
- `email`: Must be a valid email address.
- `password`: Must be at least 5 characters long.
- `fullName.firstName`: Must be at least 3 characters long.
- `fullName.lastName`: Must be at least 3 characters long.

## `/user/login`

### Description
This endpoint is used to authenticate a user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) and the user details if the credentials are valid.

### Method
`POST`

### Endpoint
`/user/login`

### Request Body
The request body should be a JSON object containing the following fields:

- `email`: A string representing the user's email. It must be a valid email address.
- `password`: A string representing the user's password. It must be at least 5 characters long.

#### Example
```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

### Response

#### Success (`200`)
If the login is successful, the server responds with a status code of 200 and a JSON object containing the JWT token and user details.

#### Example
```json
{
    "token": "your_jwt_token_here",
    "user": {
        "_id": "user_id_here",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
    }
}
```

#### Error (400)
If there are validation errors or other issues with the request, the server responds with a status code of 400 and a JSON object containing the errors.

#### Example
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Please enter a valid email",
            "path": "email",
            "location": "body"
        }
    ]
}
```

#### Error (401)
If the email or password is incorrect, the server responds with a status code of 401 and a JSON object containing an error message.

#### Example
```json
{
    "message": "Invalid email or password"
}
```

### Validation Rules
- `email`: Must be a valid email address.
- `password`: Must be at least 5 characters long.

## `/user/logout`

### Description
This endpoint is used to log out a user. It clears the JWT token from the cookies and adds the token to a blacklist to prevent further use.

### Method
`GET`

### Endpoint
`/user/logout`

### Response

#### Success (`200`)
If the logout is successful, the server responds with a status code of 200 and a JSON object containing a success message.

#### Example
```json
{
    "message": "Logged Out Successfully"
}
```

## `/user/profile`

### Description
This endpoint is used to get the profile of the authenticated user. It returns the user details.

### Method
`GET`

### Endpoint
`/user/profile`

### Response

#### Success (`200`)
If the request is successful, the server responds with a status code of 200 and a JSON object containing the user details.

#### Example
```json
{
    "_id": "user_id_here",
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
}
```

#### Error (401)
If the user is not authenticated, the server responds with a status code of 401 and a JSON object containing an error message.

#### Example
```json
{
    "message": "Unauthorized"
}
```
