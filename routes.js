const express = require('express');
const CourseController = require('./controllers/CourseController');
const LecturerController = require('./controllers/LecturerController');
const StudentController = require('./controllers/StudentController');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Pong!'
  });
});

// courses
const courseController = new CourseController();
router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseByID);
router.delete('/courses/:id', courseController.deleteCourseByID);

// students
const studentController = new StudentController();
router.post('/students', studentController.createStudent);
router.get('/students/:id', studentController.getStudentByID);
router.get('/students/:studentID/courses', studentController.getRegisteredCourses);
router.put('/students/:studentID/courses', studentController.registerCourse);
router.delete('/students/:studentID/courses/:courseID', studentController.dropRegisteredCourse);

const lecturerController = new LecturerController();
router.post('/lecturers', lecturerController.createLecturer);
router.get('/lecturers/:lecturerID', lecturerController.getLecturerByID);
router.get('/lecturers/:lecturerID/courses', lecturerController.getAssignedCourses);
router.put('/lecturers/:lecturerID/courses', lecturerController.assignCourse);

module.exports = router;