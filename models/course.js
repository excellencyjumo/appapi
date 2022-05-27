const db = require("../db/database");

class Course {
  constructor(code, title) {
    this.id = null;
    this.code = code;
    this.title = title;
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      title: this.title,
    };
  }

  save() {
    const query = `UPDATE courses SET code="${this.code}", title="${this.title}" WHERE id="${this.id}"`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }

  static create(code, title) {
    const course = new Course(code, title);
    const query = `INSERT INTO courses (code, title) VALUES ("${course.code}", "${course.title}")`;

    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          course.id = results.insertId;
          resolve(course);
        }
      });
    });
  }

  static getByID(id) {
    const query = `SELECT * FROM courses WHERE id="${id}"`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            const res = results[0];
            const course = new Course(res.code, res.title);
            course.id = res.id;
            resolve(course);
          }
        }
      });
    });
  }

  static getAll() {
    const query = `SELECT * FROM courses`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const models = results.map((res) => {
            const course = new Course(res.code, res.title);
            course.id = res.id;
            return course;
          });
          resolve(models);
        }
      });
    });
  }

  static deleteByID(id) {
    const courseIndex = courses.findIndex((course) => course.id === id);
    if (courseIndex === -1) {
      return false;
    }

    courses.splice(courseIndex, 1);
    return true;
  }
}

module.exports = Course;