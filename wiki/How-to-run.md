# How to run
## 1. Clone repository
Clone the this repository
## 2.  Back-end
1. Install postgresql@14
2. Create a database "todo"
3. Open the directory `"/BE/toDoListAPI"` on `intelij`
4. Set the environment variables
`TYPE=postgresql;HOST=localhost;PORT=5432;NAME=todo;USER={your user};PASSWORD=postgres`
7. On `aplication.yml` change `ddl-auto: validate` to `ddl-auto: update`
8. Run application
## 3. Front-end
1. Open the directory `"/FE"` in terminal
2. Install the libraries with `npm install`
3. Then run with `npm start`