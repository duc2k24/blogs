const Course = require("../models/Course");
const { mutipleMongooseToObject} = require('../../util/mongoose')
class SiteController {
   index(req, res, next) {
    Course.find({})
    .then(course => res.render('home', {
      course: mutipleMongooseToObject(course)
    }))
    .catch(err => next(err))
  }

  show(req, res) {
    res.send("Welcome");
  }
}

module.exports = new SiteController();
