const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class MeController {

  // [GET] /me/stored/courses

  storeCourse(req, res, next) {
    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
      .then(([course, deletedCount]) => res.render("me/store-courses", {
        course: mutipleMongooseToObject(course),
        deletedCount,
      }))
      .catch(next)

   
  }

  // [GET] /trash/courses

  trashCourse(req, res, next) {
    Course.findDeleted({})
      .then((course) => res.render("me/trash-courses", {
        course: mutipleMongooseToObject(course)
      }))
      .catch(next);
  }
}

module.exports = new MeController();
