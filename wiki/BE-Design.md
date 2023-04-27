# DataBase

<img width="742" alt="image" src="https://github.com/Adan0k/images/blob/main/TODO_LIST/Captura%20de%20Tela%202023-04-27%20%C3%A0s%2014.08.12.png?raw=true">

This is our DataBase that's where we store all ToDo List Data

<details>
<summary><h2>Users</h2></summary>
<img width="801" alt="image" src="https://user-images.githubusercontent.com/62727949/227173035-927ce9a3-5942-43be-a07f-ba70badd9325.png">

The Users table is related to the Tasks and Tags tables, these are the tables where task and tag are kept with the necessary information for each one, being unique for each user, only the user has access to them.
</details>

<details>
<summary><h2>Tasks</h2></summary>
<img width="801" alt="image" src="https://user-images.githubusercontent.com/62727949/227174611-d5c0918f-5780-4741-940b-ab80ebd266ae.png">

The Tasks table is related to the Task-tags, Users and Comments tables, a task can only have one user but it can have several tags and several comments. In addition, the Tasks table has a relation to itself that creates a connection between the parent and child of tasks.
</details>

<details>
<summary><h2>Tags</h2></summary>
<img width="801" alt="image" src="https://user-images.githubusercontent.com/62727949/227174764-ad111f21-ee6b-4051-bae4-15b61026a4e6.png">

The Tags table is related to the Users and Task_tags tables, the tags can be created by the user and saved for future operations, and only the user who created them has access to them. The task_tags table is there to make it possible for a task to have more than one tag but not to have two of the same tag.
</details>

<details>
<summary><h2>Task Tags</h2></summary>
<img width="801" alt="image" src="https://user-images.githubusercontent.com/62727949/227174855-98e0e4d0-a95d-4f3f-a26e-3618089d51dc.png">

The Task_tags table basically serves as a support in relating the Task and Tag tables with the help of a composite key. Saving which are the tags that the task has.
</details>

<details>
<summary><h2>Comments</h2></summary>
<img width="801" alt="image" src="https://user-images.githubusercontent.com/62727949/227175066-df44dd8b-9a7b-492a-95e6-fcbb1a8313f2.png">

The Comments table has a direct relationship with the Task table, with the objective of storing the comments of a respective task.
</details>

<details>
<summary><h2>Code</h2></summary>
<img width="801" alt="image" src="https://github.com/Adan0k/images/blob/main/TODO_LIST/Captura%20de%20Tela%202023-04-27%20%C3%A0s%2014.10.14.png?raw=true">

The code table has a direct relationship with the User table, with the objective of storing the codes for password reset.
</details>