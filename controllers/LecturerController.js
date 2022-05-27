const Lecturer = require('../models/lecturer');
const Course = require('../models/course');
const { lecturers } = require('../db/data');
const { sendResponse } = require('../utils');

class LecturerController {
  createLecturer(req, res) {
    const { firstname, lastname, gender, dateOfBirth } = req.body;
    
    const existingLecturer = Lecturer.findByFirstName(firstname);
    if (existingLecturer) {
      sendResponse(res, 400, 'Firstname already exists');
      return;
    }

    const newLecturer = new Lecturer(firstname, lastname, gender, dateOfBirth);
    lecturers.push(newLecturer);

    sendResponse(res, 201, "Lecturer was created successfully", newLecturer.toJSON());
  }

  getLecturerByID(req, res) {
    const { lecturerID } = req.params;

    const lecturer = Lecturer.getByID(+lecturerID);
    if (!lecturer) {
      sendResponse(res, 404, "Lecturer not found");
      return;
    }

    sendResponse(res, 200, "Lecturer found", lecturer.toJSON());
  }

  getAssignedCourses(req, res) {
    const { lecturerID } = req.params;
    
    // ensure the lecturer exists
    const lecturer = Lecturer.getByID(+lecturerID);
    if (!lecturer) {
      sendResponse(res, 404, "Lecturer not found");
      return;
    }

    sendResponse(
      res, 
      200, 
      "Courses found", 
      lecturer.courses.map((courseID) => Course.getByID(courseID)),
    );
  }

  assignCourse(req, res) {
    const { lecturerID } = req.params;
    const { courseID } = req.body;
    
    // ensure the lecturer exists
    const lecturer = Lecturer.getByID(+lecturerID);
    if (!lecturer) {
      sendResponse(res, 404, "Lecturer not found");
      return;
    }

    // ensure the course exists
    const course = Course.getByID(+courseID);
    if (!course) {
      sendResponse(res, 404, "Course not found");
      return;
    }

    lecturer.courses.push(+courseID);
    sendResponse(res, 200, "Course was assigned successfully");
  }
}

module.exports = LecturerController;