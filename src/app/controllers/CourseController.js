const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");
class CourseController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // [GET] /course/create

  create(req, res, next) {
    res.render("courses/create");
  }
  // [POST] /course/store
  store(req, res, next) {
    req.body.image = `${req.body.videoId}`;

    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/me/stored/course"))
      .catch(next);
  }

  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/course"))
      .catch(next);
  }

  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  force(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  formAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;

      default:
        res.json({ mesage: "invalid" });
    }
  }

  restoreAndForce(req, res, next) {

    switch (req.body.action) {
      case "restore":
        Course.restore({ _id: { $in: req.body.courseIds } })
        .then(() => res.redirect("back"))
        .catch(next);
      break;

      case "force":
        Course.deleteOne({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;

      default:
        res.json({ mesage: "invalid" });
    }
  }
}

module.exports = new CourseController();
