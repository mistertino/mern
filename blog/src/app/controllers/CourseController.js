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
        Course.delete({ _id: req.params.id })
            .then(()=> res.redirect('back'))
            .catch(next)
    }

    //[DELETE] /course/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(()=> res.redirect('back'))
            .catch(next)
    }

     //[PATCH] /course/:id/restore
     restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(()=> res.redirect('back'))
            .catch(next)
    }

    //[POST] /course/handle-form-action
    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds} })
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break;
            default: 
                res.json({message: 'Action invalid'})
        }
    }
}

module.exports = new CoursesController();
