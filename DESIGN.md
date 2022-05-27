# School

Create a server that:
- allows admins:
    - register students
    - register lecturers
    - create courses
    - assigns courses to lecturers
- allows students:
    - register for courses
    - drop courses

## Business entities
- students
- lecturers
- courses
- admin

### Student
- firstname
- lastname
- gender
- dateOfBirth

### Lecturer
- firstname
- lastname
- gender
- dateOfBirth
- courses

### Course
- code
- title
- units

### Admin
- username

# RESTful API

GET, POST, DELETE, PUT, PATCH

## Routes
[x] POST */students* - create student
[x] GET */students/:id* - get a student by id
[x] PUT */students/:studentID/courses* - register student for a course
**request body:**
```json
{
    courseID: string;
}
```
[x] GET */students/:studentID/courses* - get courses student registered
[x] DELETE */students/:studentID/courses/:courseID* - drop a course

[x] POST */courses* - create a course
**request body:**
```json
{
    title: string;
    name: string;
    units: number;
}
```
[x] GET */courses* - get all courses
[x] GET */courses/:id* - get a course by id
[x] DELETE */courses/:id* - delete a course by id

[x] POST */lecturers* - create lecturer
[x] GET */lecturers/:lecturerID* - get lecturer by id
```json
{
    
}
```
[x] GET */lecturers/:lecturerID/courses* - get courses assigned to lecturer
[x] PUT */lecturers/:lecturerID/courses* - assign course to lecturer
**request body:**
```json
{
    courseID: string;
}
```


```json
{
    status,
    message,
    data
}
```