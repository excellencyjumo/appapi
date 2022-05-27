const { lecturers } = require("../db/data");

let lecturerID = 0;

class Lecturer {
  constructor(firstname, lastname, gender, dateOfBirth) {
    this.id = lecturerID++;
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
    return lecturers.find(lecturer => lecturer.id === id);
  }

  static findByFirstName(firstname) {
    return lecturers.find(lecturer => lecturer.firstname === firstname);
  }
}

module.exports = Lecturer;