## FrontEnd


### USERS
<details>
<summary>LOGIN</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/users/login

**Body:**

```json
{
	"username": "STRING",
	"password": "STRING"
}
```
</details>
<details>
<summary>REGISTER</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/users/register

**Body:**

```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "profileImage": "string",
  "username": "string",
  "password": "string"
}
```
</details>
<details>
<summary>CHANGE PROFILE IMAGE</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/users/{userId}/profile_image

**Body:**

```json
{
    "profileImage": "string"
}
```
</details>
<details>
<summary>FORGOT PASSWORD</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/users/forgot_password

**Body:**

```json
{
    "newPassword": "string"
}
```
</details>

<details>
<summary>ERROR CODES</summary>

<h3>401</h3>

```
{
        "message": "Wrong credentials",
        "type": "....",
        "code": 10,
        "timestemp": date
}
```

<h3>403</h3>

```
{
        "message": "User don't have permission",
        "type": "....",
        "code": 12,
        "timestemp": date
}
```

<h3>409</h3>

```
{
        "message": "Register conflict",
        "type": "....",
        "code": 11,
        "timestemp": date
}
```
</details>



### TASKS
<details>
<summary>CREATE TASK</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/tasks

**Body:**

```json
{
  "title": "string",
  "description": "string",
  "date": "31-03-2023",
  "userId": 0,
  "parentId": 0,
  "position": 0
}
```
</details>
<details>
<summary>EDIT TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/edit-task/{taskId}

**Body:**

```json
{
    "title": "String",
    "description": "String",
    "endDate": "String"
}
```
</details>
<details>
<summary>DONE/UNDONE TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/done-state/{taskId}

**Body:**

```json
{
    "isDone": "Boolean"
}
```
</details>
<details>
<summary>FAVORITE TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/favorite-state/{taskId}

**Body:**

```json
{
    "favorite": "Boolean"
}
```
</details>
<details>
<summary>CHANGE POSITION TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/change-position/{taskId}

**Body:**

```json
{
    "parentId": "Integer",
    "position": "Integer"
}
```
</details>
<details>
<summary>DELETE TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/delete/{taskId}

**Body:**

```json
{

}
```
</details>
<details>
<summary>GET PREVIEW TASK</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/preview/{taskId}

**Body:**

```json
{

}
```
</details>
<details>
<summary>GET TASK</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/{taskId}

**Body:**

```json
{

}
```
</details>
<details>
<summary>GET ALL TASKS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/{userId}

**Body:**

```json
{

}
```
</details>

<details>
<summary>ERROR CODES</summary>

<h3>400</h3>

```
{
        "message": "Missing data o creation task",
        "type": "....",
        "code": 21,
        "timestemp": date
}
```

<h3>400</h3>

```
{
        "message": "Invalid task",
        "type": "....",
        "code": 22,
        "timestemp": date
}
```

<h3>404</h3>

```
{
        "message": "Task not found",
        "type": "....",
        "code": 20,
        "timestemp": date
}
```
</details>

### TAGS
<details>
<summary>CREATE TAG</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/tags/create-tag

**Body:**

```json
{
    "name": "String",
    "color": "String",
    "userId": "Integer"
}
```
</details>
<details>
<summary>DELETE TAG</summary>

## Request

**Endpoint:** `DELETE` http://localhost:8086/todo/tags/{tagId}/{userId}

**Body:**

```json
{
    
}
```
</details>
<details>
<summary>GET ALL TAGS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tags/{userId}

**Body:**

```json
{
    
}
```
</details>

<details>
<summary>ERROR CODES</summary>

<h3>404</h3>

```
{
        "message": "Tag not found",
        "type": "....",
        "code": 30,
        "timestemp": date
}
```
</details>


### COMMENTS
<details>
<summary>CREATE COMMENT</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/comments/create-comment

**Body:**

```json
{
    "description": "String",
    "taskId": "Integer"
}
```
</details>
<details>
<summary>GET ALL COMMENTS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/comments/{taskId}

**Body:**

```json
{
    
}
```
</details>

<details>
<summary>ERROR CODES</summary>

<h3>404</h3>

```
{
        "message": "Comment not found",
        "type": "....",
        "code": 30,
        "timestemp": date
}
```
</details>

--------

## BackEnd


### USERS
<details>
<summary>LOGIN</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/users/login

**Body:**

```json
{
    "userId": "number",
    "profileImage": "To be discussed",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "tasksPreviewsURL": "string"
}
```
</details>
<details>
<summary>REGISTER</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/users/register

**Body:**

```json
{
    "userId": "number",
    "profileImage": null,
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "tasksPreviewsURL": "string"
}
```
</details>
<details>
<summary>CHANGE PROFILE IMAGE</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/users/profile_image

**Body:**

```json
{
    "profileImage": "To be discussed"
}
```
</details>
<details>
<summary>FORGOT PASSWORD</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/users/forgot_password

**Body:**

```json
{
    "userId": "number",
    "profileImage": "To be discussed",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "tasksPreviewsURL": "string"
}
```
</details>



### TASKS
<details>
<summary>CREATE TASK</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/tasks/create-task

**Body:**

```json
{
    "taskId": "Integer",
    "title": "String",
    "isDone": "Boolean",
    "date": "String",
    "expired": "Boolean",
    "isFavorite": "Boolean",
    "position": "Integer",
    "ParentId": "Integer",
    "tagsURL": "String URL",
    "fullTaskURL": "String URL"
}
```
</details>
<details>
<summary>EDIT TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/edit-task/{taskId}

**Body:**

```json
{
    "taskId": "Integer",
    "title": "String",
    "description": "String",
    "isDone": "Boolean",
    "date": "String",
    "expired": "Boolean",
    "isFavorite": "Boolean",
    "position": "Integer",
    "ParentId": "Integer",
    "tagsURL": "String URL"
}
```
</details>
<details>
<summary>DONE/UNDONE TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/done-state/{taskId}

**Body:**

```json
{
    // To be discussed
}
```
</details>
<details>
<summary>FAVORITE TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/favorite-state/{taskId}

**Body:**

```json
{
    // To be discussed
}
```
</details>
<details>
<summary>CHANGE POSITION TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/change-position/{taskId}

**Body:**

```json
{
    // To be discussed
}
```
</details>
<details>
<summary>DELETE TASK</summary>

## Request

**Endpoint:** `PACH` http://localhost:8086/todo/tasks/delete/{taskId}

**Body:**

```json
{
    // To be discussed
}
```
</details>
<details>
<summary>GET PREVIEW TASK</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/preview/{taskId}

**Body:**

```json
{
    "taskId": "Integer",
    "title": "String",
    "isDone": "Boolean",
    "date": "String",
    "expired": "Boolean",
    "isFavorite": "Boolean",
    "position": "Integer",
    "ParentId": "Integer",
    "tagsURL": "String URL",
    "fullTaskURL": "String URL"
}
```
</details>
<details>
<summary>GET TASK</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/{taskId}

**Body:**

```json
{
    "taskId": "Integer",
    "title": "String",
    "description": "String",
    "isDone": "Boolean",
    "date": "String",
    "expired": "Boolean",
    "isFavorite": "Boolean",
    "position": "Integer",
    "ParentId": "Integer",
    "tagsURL": "String URL"
}
```
</details>
<details>
<summary>GET ALL TASKS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/{userId}

**Body:**

```json
[{
    "taskId": "Integer",
    "title": "String",
    "isDone": "Boolean",
    "date": "String",
    "expired": "Boolean",
    "isFavorite": "Boolean",
    "position": "Integer",
    "ParentId": "Integer",
    "tagsURL": "String URL",
    "fullTaskURL": "String URL"
},
{
    "taskId": "Integer",
    "title": "String",
    "isDone": "Boolean",
    "date": "String",
    "expired": "Boolean",
    "isFavorite": "Boolean",
    "position": "Integer",
    "ParentId": "Integer",
    "tagsURL": "String URL",
    "fullTaskURL": "String URL"
}
]
```
</details>



### TAGS
<details>
<summary>CREATE TAG</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/tags/create-tag

**Body:**

```json
{
    "tagId": "Integer",
    "name": "String",
    "color": "String"
}
```
</details>
<details>
<summary>DELETE TAG</summary>

## Request

**Endpoint:** `DELETE` http://localhost:8086/todo/tags/{tagId}/{userId}

**Body:**

```json
{
    // To be discussed
}
```
</details>
<details>
<summary>GET ALL TAGS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tags/{userId}

**Body:**

```json
[{
    "tagId": "Integer",
    "name": "String",
    "color": "String"
},
{
    "tagId": "Integer",
    "name": "String",
    "color": "String"
}
]
```
</details>



### COMMENTS
<details>
<summary>CREATE COMMENT</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/comments/create-comment

**Body:**

```json
{
    "commentId": "Integer",
    "description": "String"
}
```
</details>
<details>
<summary>GET ALL COMMENTS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/comments/{taskId}

**Body:**

```json
[{
    "commentId": "Integer",
    "description": "String"
},
{
    "commentId": "Integer",
    "description": "String"
}
]
```
</details>
</br>

# HeadingError codes

## User

**10** - *`wrong credentials`*

**11** - *`register conflict`*

**12** - *`users doesn't have permission`*

## Task

**20** - *`task not found`*

**21** - *`missing data`*

**22** - *`invalid task`*

## Tag

**30** - *`tag not found`*

## Comment

**40** - *`comment not found`*