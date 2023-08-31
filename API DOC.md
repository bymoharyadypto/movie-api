# My Assets App Server

My Assets app is an application to manage your assets, this app has:

    * RESTful endpoint for asset's CRUD operation
    * JSON formatted response

# RESTful endpoint for ADMIN

### POST /register

- Request Header

```
{
    not needed
}
```

- Request Body

```json
{
  "username": "budi",
  "email": "admin@mail.com",
  "password": "12345"
}
```

- Response (201 - Success POST REGISTER)

```json
{
  "id": 5,
  "email": "admin2@mail.com"
}
```

- Response (400 - Bad Request)

```js
{
    "message": [
        "Email is already used"
    ]
}
```

- Response (400 - Bad Request)

```js
{
    "message": [
        "password must be 5 character"
    ]
}
```

- Response (500 - Not Found)

```js
{
  message: ['Internal server error'];
}
```

### POST /sign-in

- Request Header

```
    { not needed }
```

- Request Body

```json
{
  "email": "admin2@mail.com",
  "password": "12345"
}
```

- Response (200 - Success POST SIGN-IN)

```json
{
  "access_token": "<your access token>"
}
```

- Response (401 - Bad Request)

```json
{
  "message": "Email or Password Not Found"
}
```

- Response (401 - Unauthorized)

```json
{
  "message": "Invalid Password"
}
```

- Response (500 - Not Found)

```json
{
  "message": "Internal Server Error"
}
```

### POST /movies

- Request Header

```json
{
  "access_token": "<your access token>"
}
```

- Request Body

```json
{
  "title": "budi",
  "description": "admin@mail.com",
  "imgUrl": "",
  "rating": 8
}
```

- Response (201 - Success POST Movie)

```json
{
  "news": {
    "id": 6,
    "title": "Pengabdi Setan",
    "description": "Pengabdi Setan merupakan film horor Indonesia yang dirilis pada 28 September 2017, yang ditulis dan disutradarai oleh Joko Anwar.",
    "imgUrl": "",
    "rating": 8,
    "authorId": 5,
    "updatedAt": "2023-08-31T03:47:49.794Z",
    "createdAt": "2023-08-31T03:47:49.794Z"
  }
}
```

- Response (401 - Unauthorized)

```json
{
  "message": "Missing Access Token"
}
```

- Response (400 - Bad Request)

```json
{
  "message": ["title cannot be empty string"]
}
```

- Response (500 - Not Found)

```json
{
  "message": "Internal Server Error"
}
```

### GET /movies

- Request Header

```json
{
  "access_token": "<your access token>"
}
```

- Request Body

```json
    not needed
```

- Response (200 - Success GET Movies)

```js
{
    "totalItems": 3,
    "movies": [
        {
            "id": 4,
            "title": "Babi Buta yang Ingin Terbang",
            "description": "Babi Buta yang Ingin Terbang adalah film drama dari Indonesia yang dirilis pada 3 Oktober 2008 dengan disutradarai oleh Edwin",
            "rating": 8,
            "imgUrl": "",
            "authorId": 5,
            "createdAt": "2023-08-31T03:30:45.110Z",
            "updatedAt": "2023-08-31T03:30:45.110Z",
            "User": {
                "id": 5,
                "username": "budi",
                "email": "admin2@mail.com",
                "role": "admin"
            }
        },
        {
            "id": 5,
            "title": "Pengabdi Setan 2: Communion",
            "description": "Beberapa tahun setelah berhasil menyelamatkan diri dari kejadian mengerikan yang membuat mereka kehilangan ibu dan si bungsu Ian, Rini dan adik-adiknya, Toni dan Bondi, serta Bapak tinggal di rumah susun karena percaya tinggal di rumah susun aman jika terjadi sesuatu karena ada banyak orang.",
            "rating": 8,
            "imgUrl": "",
            "authorId": 5,
            "createdAt": "2023-08-31T03:46:34.271Z",
            "updatedAt": "2023-08-31T04:18:10.537Z",
            "User": {
                "id": 5,
                "username": "budi",
                "email": "admin2@mail.com",
                "role": "admin"
            }
        },
        {
            "id": 6,
            "title": "Pengabdi Setan",
            "description": "Pengabdi Setan merupakan film horor Indonesia yang dirilis pada 28 September 2017, yang ditulis dan disutradarai oleh Joko Anwar.",
            "rating": 8,
            "imgUrl": "",
            "authorId": 5,
            "createdAt": "2023-08-31T03:47:49.794Z",
            "updatedAt": "2023-08-31T03:47:49.794Z",
            "User": {
                "id": 5,
                "username": "budi",
                "email": "admin2@mail.com",
                "role": "admin"
            }
        }
    ],
    "totalPages": 1,
    "currentPage": 1
}
```

- Response (401 - Unauthorized)

```json
{
  "message": "Missing Access Token"
}
```

- Response (404 - Bad Request)

```json
{
  "message": "Data Not Found"
}
```

- Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error";
}
```

### GET /movies/:id

- Request Header

```json
{
  "access_token": "<your access token>"
}
```

- Request Body

```json
    not needed
```

- Response (200 - Success GET Movie)

```json
{
  "Movie": {
    "id": 4,
    "title": "Babi Buta yang Ingin Terbang",
    "description": "Babi Buta yang Ingin Terbang adalah film drama dari Indonesia yang dirilis pada 3 Oktober 2008 dengan disutradarai oleh Edwin",
    "rating": 8,
    "imgUrl": "",
    "authorId": 5,
    "createdAt": "2023-08-31T03:30:45.110Z",
    "updatedAt": "2023-08-31T03:30:45.110Z",
    "User": {
      "id": 5,
      "email": "admin2@mail.com",
      "username": "budi",
      "role": "admin"
    }
  }
}
```

- Response (401 - Unauthorized)

```js
{
    "message": "Missing Access Token"
}
```

- Response (404 - Not Found)

```js
{
    "message": "Data Not Found"
}
```

- Response (500 - Internal Server Error)

```js
{
  "message": "Internal server error"
}
```

### PUT /movies/:id

- Request Header

```json
{
  "access_token": "<your access token>"
}
```

- Request Body

```json
{
  "title": "Pengabdi Setan - updated",
  "description": "Adalah sebuah film horor Indonesia tahun 2017 yang disutradarai dan ditulis oleh Joko Anwar.",
  "imgUrl": "",
  "rating": 7
}
```

- Response (200 - Success Update Movie)

```json
{
  "movie": {
    "id": 2,
    "title": "Pengabdi Setan - updated",
    "description": "Adalah sebuah film horor Indonesia tahun 2017 yang disutradarai dan ditulis oleh Joko Anwar",
    "rating": 7,
    "imgUrl": "",
    "authorId": 1,
    "createdAt": "2023-08-30T13:33:29.337Z",
    "updatedAt": "2023-08-31T03:26:37.744Z"
  }
}
```

- Response (401 - Unauthorized)

```json
{
  "message": "Missing Access Token"
}
```

- Response (404 - Not Found)

```json
{
  "message": "Data Not Found"
}
```

- Response (403 - Forbidden)

```json
{
  "message": ["Forbidden"]
}
```

- Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error";
}
```

### DELETE /movies/:id

- Request Header

```json
{
  "access_token": "<your access token>"
}
```

- Request Body

```json
    not needed
```

- Response (200 - Success DELETE Movie)

```json
{
  "message": "title: Babi Buta yang Ingin Terbang with id: 4, has been deleted by admin"
}
```

- Response (401 - Unauthorized)

```json
{
  "message": "Missing Access Token"
}
```

- Response (404 - Not Found)

```json
{
  "message": "Data Not Found"
}
```

- Response (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
```

- Response (500 - Internal Server Error)

```js
{
  "message": "Internal server error"
}
```

- Request Header

```js
{
    "access_token" : "<your access token>"
}
```

- Request Body

```
    { not needed }
```

- Response (200 - Success GET News)

```js
{
    "history": [
        {
            "id": 5,
            "name": "DPR Minta Kuota Biosolar Ditambah",
            "description": "News with title 'Update 5' with id 1 has been updated to title 'DPR Minta Kuota Biosolar Ditambah' with id 1",
            "entitasId": 1,
            "updateBy": 2,
            "createdAt": "2022-03-30T12:30:20.405Z",
            "updatedAt": "2022-03-30T12:30:20.405Z",
            "User": {
                "id": 2,
                "username": "rahayu",
                "role": "staff",
                "email": "staff@mail.com"
            },
            "News": {
                "title": "DPR Minta Kuota Biosolar Ditambah",
                "content": "Komisi VII DPR mendesak pemerintah menambah kuota biosolar sebanyak 2 juta kiloliter tahun ini sehingga total alokasinya naik dari 15,1 juta kiloliter menjadi 17,1 juta kiloliter. Pemerintah juga diminta menjamin pendistribusian biosolar tepat sasaran di daerah.",
                "status": "active",
                "Category": {
                    "name": "Ekonomi"
                }
            }
        }
    ],
    "user": {
        "id": 1,
        "username": "dia",
        "email": "admin@mail.com",
        "role": "admin"
    }
}
```

- Response (401 - Unauthorized)

```js
{
    "message": [
        "Missing Access Token"
    ]
}
```

- Response (404 - Bad Request)

```js
{
    "message": [
        "Data Not Found"
    ]
}
```

- Response (500 - Internal Server Error)

```js
{
  message: ['Internal server error'];
}
```

### PATCH /movies/id

- Request Header

```js
{
    "access_token" : "<your access token>"
}
```

- Request Body

```json
    "title": "Pengabdi Setan 2: Communion"
```

- Response (200 - Success Update Title)

```json
{
  "message": "title: Pengabdi Setan 2: Communion with id: 5, has been updated by admin",
  "movie": {
    "id": 5,
    "title": "Pengabdi Setan 2: Communion",
    "description": "Adalah sebuah film horor Indonesia tahun 2017 yang disutradarai dan ditulis oleh Joko Anwar",
    "rating": 7,
    "imgUrl": "",
    "authorId": 5,
    "createdAt": "2023-08-31T03:46:34.271Z",
    "updatedAt": "2023-08-31T08:32:03.672Z"
  }
}
```

- Response (401 - Unauthorized)

```js
{
    "message": "Missing Access Token"
}
```

- Response (500 - Internal Server Error)

```js
{
  "message": "Internal server error";
}
```
