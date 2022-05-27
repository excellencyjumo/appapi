const Student = require('../models/student');
const Course = require('../models/course');
const { students } = require('../db/data');
const { sendResponse } = require('../utils');

class StudentController {
  constructor() {}

  createStudent(req, res) {
    const { firstname, lastname, gender, dateOfBirth } = req.body;
    
    const existingStudent = Student.findByFirstName(firstname);
    if (existingStudent) {
      sendResponse(res, 400, 'Firstname already exists');
      return;
    }

    const newStudent = new Student(firstname, lastname, gender, dateOfBirth);
    students.push(newStudent);

    sendResponse(res, 201, "Student was created successfully", newStudent.toJSON());
  }

  getStudentByID(req, res) {
    const { id } = req.params;

    const student = Student.getByID(parseInt(id));
    if (student) {
      sendResponse(res, 200, 'Student was found', student.toJSON());
    } else {
      sendResponse(res, 404, `Student with id "${id}" was not found`);
    }
  }

  registerCourse(req, res) {
    const { studentID } = req.params;
    const { courseID } = req.body;

    const student = Student.getByID(parseInt(studentID));
    if (student) {
      // Check if the course exists
      const course = Course.getByID(+courseID);
      if (!course) {
        sendResponse(res, 404, 'Course does not exist');
        return;
      }

      const hasRegisteredBefore = student.courses.includes(+courseID);
      if (hasRegisteredBefore) {
        sendResponse(422, 'Student has already registered course');
      } else {
        student.courses.push(+courseID);
        sendResponse(200, 'Course was registered successfully');
      }
    } else {
      sendResponse(404, 'Student does not exist');
    }
  }

  getRegisteredCourses(req, res) {
    const { studentID } = req.params;

    const student = Student.getByID(+studentID);
    if (student) {
      sendResponse(
        200, 
        'Student courses found', 
        student.courses.map((courseID) => {
          return Course.getByID(courseID);
        })
      );
    } else {
      sendResponse(404, 'Student not found');
    }
  }

  dropRegisteredCourse(req, res) {
    const { studentID, courseID } = req.params;

    const student = Student.getByID(+studentID);
    if (!student) {
      sendResponse(404, 'Student not found');
      return;
    }

    const course = Course.getByID(+courseID);
    if (!course) {
      sendResponse(404, 'Student not found');
      return;
    }

    Course.deleteByID(+courseID);

    sendResponse(res, 200, 'Course was deleted successfully');
  }
}

module.exports = StudentController;