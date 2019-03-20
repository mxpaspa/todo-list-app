# todo-list-app

A todo list backend built in Node.js, MongoDB, and Mongoose

#### 1. Unzip the file.

#### 2. From your terminal type: `cd Desktop/todo_app` to enter the app's main directory

#### 2. Start the application with the command `node server.js`.

#### 4. The application is now ready to receive requests.

#### LISTS Endpoints

- **<code>GET</code> /lists**
- **<code>GET</code> /lists/:id**
- **<code>POST</code> /lists**
  - required data params: listTitle
- **<code>PUT</code> /lists/:id/toggle_completion**
  - require url params: id
  - required data params: listTitle
- **<code>DELETE</code> /lists/:id**
  - require url params: id

#### TASKS Endpoints

- **<code>GET</code> /tasks**
- **<code>GET</code> /tasks/:id**
- **<code>POST</code> /tasks**
  - required data params: listTitle
  - required data params: taskTitle
  - optional data params: taskDescription
- **<code>PUT</code> /tasks/:id/toggle_completion**
  - required url params: id
  - required data params: listID
- **<code>DELETE</code> /tasks/:id**
  - required url params: id
  - required data params: listID

#### SUBTASKS Endpoints

- **<code>GET</code> /subtasks**
- **<code>GET</code> /subtasks/:id**
- **<code>POST</code> /subtasks**
  - required data params: listTitle
  - required data params: taskTitle
  - optional data params: subTaskDescription
- **<code>PUT</code> /subtasks/:id/toggle_completion**
  - required url params: id
  - required data params: listID
  - required data params: taskID
- **<code>DELETE</code> /subtasks/:id**
  - required url params: id
  - required data params: listID
  - required data params: taskID

## Third Party Technologies Used:

- [mlab.com](https://mlab.com/welcome/) provided a cloud instance of MongoDB.

```

```

```

```
