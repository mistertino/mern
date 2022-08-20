const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CoursesController {
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((courses) => {
                res.render('courses/show', {
                    courses: mongooseToObject(courses),
                });
            })
            .catch(next);
        // res.send('Course Detail');
    }

    //[Get] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }
    //[POST] /course/store
    store(req, res, next) {
        // res.json(req.body)
        const formData = req.body;
        const courses = new Course(formData);
        courses
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    //[Get] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((courses) =>
                res.render('courses/edit', {
                    courses: mongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    //[PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /course/:id
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(()=> res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CoursesController();
