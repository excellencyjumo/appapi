const { students } = require('../db/data');

let studentId = 0;

class Student {
  constructor(firstname, lastname, gender, dateOfBirth) {
    this.id = studentId++;
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.courses = [];
  }

  toJSON() {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
    };
  }

  static getByID(id) {
    return students.find((student) => student.id === id);
  }

  static findByFirstName(firstname) {
    return students.find((student) => {
      return student.firstname === firstname;
    });
  }
}

module.exports = Student;