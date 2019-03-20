# todo-list-app

A todo list backend built in Node.js, MongoDB, and Mongoose

#### 1. Unzip the file.

#### 2. From your terminal type: `cd Desktop/todo_app` to enter the app's main directory

#### 2. Start the application with the command `node server.js`.

#### 4. The application is now ready to receive requests.

#### 5. You can make requests from postman or with curl.

#### Photo Resources

- **[<code>GET</code> lists]**
- **[<code>GET</code> lists/:id]**
- **[<code>POST</code> lists/]**
- **DATA Params**

  **Required:**

  `listTitle=[string]`

  <!-- **Show User**

---

Returns json data about a single user.

- **URL**

  /users/:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

- **Sample Call:**

  ````javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ``` -->
  <!-- ```
  converter help
  ````

```

#### 5.saal by entering:a

```

converter version

```

## Usage

#### 1. Create a user:

```

converter create-user <username> <password>

```

#### 2. Login and enter your credentials:

```

converter login

```

#### 3. Once you are authenticated, run your first conversion:

```

convert <home currency> <exchange currency> <amount>

```

_For example:_

```

convert USD EUR 10

```

#### 4. Retrieve your conversion history, which will present the last 5 conversions executed (you must be authenticated).

```

logs

```

#### 5. In application help:

```

help

```-->

## Third Party Technologies Used:

- [mlab.com](https://mlab.com/welcome/) provided a cloud instance of MongoDB.

```

```
