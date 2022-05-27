const Course = require('../models/course');
const { sendResponse } = require('../utils');

class CourseController {
  constructor() {}

  async createCourse(req, res) {
    const { code, title } = req.body;
    try {
      const newCourse = await Course.create(code, title);
      sendResponse(res, 201, "Course was created successfully", newCourse.toJSON());
    } catch (err) {
      sendResponse(res, 500, "An error occured while creating a new course");
    }
  }

  // /courses/:id -> /courses/44
  async getCourseByID(req, res) {
    const { id } = req.params;

    try {
      const course = await Course.getByID(+id);

      if (!course) {
        sendResponse(res, 404, `Course with id "${id}" was not found`);
        return;
      }

      sendResponse(res, 200, "Course found", course.toJSON());
    } catch (err) {
      sendResponse(res, 500, "An error occured while creating a new course");
    }
  }

  async getAllCourses(req, res) {
    try {
      const courses = await Course.getAll();
      sendResponse(res, 200, "Courses fetched", courses.map(course => course.toJSON()));
    } catch (err) {
      sendResponse(res, 500, "An error occured while fetching courses");
    }
  }

  deleteCourseByID(req, res) {
    const { id } = req.params;

    const existing = Course.getByID(parseInt(id));

    if (existing) {
      Course.deleteByID(parseInt(id));

      res.status(200).json({
        status: 200,
        message: 'Course was deleted successfully'
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'Course was not found',
      });
    }
  }
}

module.exports = CourseController;