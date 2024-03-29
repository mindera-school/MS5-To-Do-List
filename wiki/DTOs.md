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
<summary>CHANGE USER INFO</summary>

## Request

**Endpoint:** `PATCH` http://localhost:8086/todo/users/{userId}

**Body:**

```json
{
  
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "password": "string",
  "currentPassword": "string"

}
```

</details>
<details>
<summary>FORGOT PASSWORD</summary>

## Request

**Endpoint:** `PATCH` http://localhost:8086/todo/users/forgot_password

**Body:**

```json
{
  "email": "string"
}
```

</details>

<details>
<summary>RESET PASSWORD</summary>

## Request

**Endpoint:** `PATCH` http://localhost:8086/todo/users/reset-password

**Body:**

```json
{
  "token": "string",
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

**Endpoint:** `POST` http://localhost:8086/todo/tasks/v1

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
<summary>UPDATE TASK</summary>

## Request

**Endpoint:** `PATCH` http://localhost:8086/todo/tasks/v1/{taskId}

**Body:**

```json
{
  "title": "String",
  "description": "String",
  "isDone": "Boolean",
  "date": "String",
  "isFavorite": "Boolean",
  "disabled": "Boolean"
}
```

</details>
<details>
<summary>UPDATE POSITION</summary>

## Request

**Endpoint:** `PATCH` http://localhost:8086/todo/tasks/v1/change-position

**Body:**

```json
[
  {
    "taskId": "Integer",
    "position": "Integer",
    "parentId": "Integer"
  },
  {
    "taskId": "Integer",
    "position": "Integer",
    "parentId": "Integer"
  }
]
```

</details>
<details>
<summary>GET PREVIEW TASK</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/preview/{userId}

**Body:**

```json
{}
```

</details>
<details>
<summary>GET FULL TASK</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/v1/{taskId}/{userId}

**Body:**

```json
{}
```

</details>
<details>
<summary>GET SUB TASKS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/v1/{parentId}

**Body:**

```json
{}
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

**Endpoint:** `POST` http://localhost:8086/todo/tags/v1

**Body:**

```json
{
  "name": "String",
  "color": "String",
  "userId": "Integer",
  "taskId": "Integer"
}
```

</details>
<details>
<summary>GET ALL USER TAGS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tags/v1/users/{userId}

**Body:**

```json
{}
```

</details>
<details>
<summary>GET ALL TASK TAGS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tags/v1/task/{taskId}

**Body:**

```json
{}
```

</details>
<details>
<summary>DELETE TAG</summary>

## Request

**Endpoint:** `DELETE` http://localhost:8086/todo/tags/{taskId}/{tagId}

**Body:**

```json
{}
```

</details>
<details>
<summary>UPDATE TAG</summary>

## Request

**Endpoint:** `PUT` http://localhost:8086/todo/tags/v1/{taskId}

**Body:**

```json
[
  {
    "name": "string",
    "color": "string",
    "userId": "integer",
    "taskId": "integer"
  }
]
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

**Endpoint:** `POST` http://localhost:8086/todo/comments/v1

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

**Endpoint:** `GET` http://localhost:8086/todo/comments/v1/{taskId}

**Body:**

```json
{}
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

---

## BackEnd

### USERS

<details>
<summary>LOGIN</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/users/login

**Body:**

```json
{
  "userId": "Integer",
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "email": "string",
  "groupsURL": "string",
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
  "userId": 0,
  "firstName": "string",
  "lastName": "string",
  "profileImage": "string",
  "username": "string",
  "email": "string",
  "groupsURL": "string",
  "tasksPreviewsURL": "string"
}
```

</details>
<details>
<summary>CHANGE PROFILE IMAGE</summary>

## Request

**Endpoint:** `PATCH` http://localhost:8086/todo/users/{userId}/profile_image

**Body:**

```json
{
  "profileImage": "String"
}
```

</details>
<details>
<summary>FORGOT PASSWORD</summary>

## Request

**Endpoint:** `PATCH` http://localhost:8086/todo/users/forgot_password

**Body:**

```json
{}
```

</details>

### TASKS

<details>
<summary>CREATE TASK</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/tasks/v1

**Body:**

```json
{
  "taskId": "Integer",
  "parentId": "Integer",
  "position": "Integer",
  "title": "string",
  "date": "03-04-2023",
  "isDone": "Boolean",
  "isFavorite": "Boolean",
  "taskURL": "string",
  "tags": [
    {
      "tagId": "Integer",
      "name": "string",
      "color": "string"
    }
  ],
  "expired": "Boolean"
}
```

</details>
<details>
<summary>UPDATE TASK</summary>

## Request

**Endpoint:** `PATCH` http://localhost:8086/todo/tasks/v1/{taskId}

**Body:**

```json
{
  "title": "String",
  "description": "String",
  "isDone": "Boolean",
  "date": "String",
  "isFavorite": "Boolean",
  "disabled": "Boolean"
}
```

</details>
<details>
<summary>UPDATE POSITION</summary>

## Request

**Endpoint:** `PATCH` http://localhost:8086/todo/tasks/v1/change-position

**Body:**

```json
[
  {
    "taskId": "Integer",
    "position": "Integer",
    "parentId": "Integer"
  },
  {
    "taskId": "Integer",
    "position": "Integer",
    "parentId": "Integer"
  }
]
```

</details>
<details>
<summary>GET PREVIEW TASK</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/preview/{taskId}

**Body:**

```json
[
  {
    "taskId": "Integer",
    "parentId": "Integer",
    "position": "Integer",
    "title": "string",
    "date": "03-04-2023",
    "isDone": "Boolean",
    "isFavorite": "Boolean",
    "taskURL": "string",
    "tags": [
      {
        "tagId": "Integer",
        "name": "string",
        "color": "string"
      }
    ],
    "expired": "Boolean"
  }
]
```

</details>
<details>
<summary>GET FULL TASK</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/v1/{taskId}/{userId}

**Body:**

```json
{
  "taskId": "Integer",
  "title": "string",
  "description": "string",
  "isDone": "Boolean",
  "date": "03-04-2023",
  "expired": "Boolean",
  "isFavorite": "Boolean",
  "parentId": "Integer",
  "position": "Integer",
  "tags": [
    {
      "tagId": "Integer",
      "name": "string",
      "color": "string"
    }
  ],
  "commentsURL": "string"
}
```

</details>
<details>
<summary>GET SUB TASKS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tasks/v1/{parentId}

**Body:**

```json
[
  {
    "taskId": "Integer",
    "parentId": "Integer",
    "position": "Integer",
    "title": "string",
    "date": "03-04-2023",
    "isDone": "Boolean",
    "isFavorite": "Boolean",
    "taskURL": "string",
    "tags": [
      {
        "tagId": "Integer",
        "name": "string",
        "color": "string"
      }
    ],
    "expired": "Boolean"
  }
]
```

</details>

### TAGS

<details>
<summary>CREATE TAG</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/tags/v1

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
<summary>GET ALL USER TAGS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tags/v1/users/{userId}

**Body:**

```json
[
  {
    "tagId": "Integer",
    "name": "string",
    "color": "string"
  }
]
```

</details>
<details>
<summary>GET ALL TASK TAGS</summary>

## Request

**Endpoint:** `GET` http://localhost:8086/todo/tags/v1/task/{taskId}

**Body:**

```json
[
  {
    "tagId": "Integer",
    "name": "string",
    "color": "string"
  }
]
```

</details>
<details>
<summary>DELETE TAG</summary>

## Request

**Endpoint:** `DELETE` http://localhost:8086/todo/tags/{taskId}/{tagId}

**Body:**

```json
{}
```

</details>
<details>
<summary>UPDATE TAG</summary>

## Request

**Endpoint:** `PUT` http://localhost:8086/todo/tags/v1/{taskId}

**Body:**

```json
[
  {
    "tagId": "integer",
    "name": "string",
    "color": "string"
  }
]
```

</details>

### COMMENTS

<details>
<summary>CREATE COMMENT</summary>

## Request

**Endpoint:** `POST` http://localhost:8086/todo/comments/v1

**Body:**

```json
{
  "commentId": "Integer",
  "description": "string",
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
[
  {
    "commentId": "Integer",
    "description": "string",
    "taskId": "Integer"
  }
]
```

</details>
</br>

# HeadingError codes

## User

**10** - _`wrong credentials`_

**11** - _`register conflict`_

**12** - _`users doesn't have permission`_

## Task

**20** - _`task not found`_

**21** - _`missing data`_

**22** - _`invalid task`_

## Tag

**30** - _`tag not found`_

**31** - _`already in use`_

## Comment

**40** - _`comment not found`_
