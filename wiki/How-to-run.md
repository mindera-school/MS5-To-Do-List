# How to run

## 1.  Back-end
1. install postgresql@14
2. create a database "todo"
3. clone the this repository
4. open the directory `"/BE/toDoListAPI"` on `intelij`
5. set the environment variables
`TYPE=postgresql;HOST=localhost;PORT=5432;NAME=todo;USER={your user};PASSWORD=postgres`
7. on `aplication.yml` change `ddl-auto: validate` to `ddl-auto: update`
8. run application
## 2. Front-end
1. open the directory `"/FE"` in terminal
2. install the libraries with `npm install`
3. then run with `npm start`