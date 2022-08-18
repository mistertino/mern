const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CoursesController {
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(courses => { 
                res.render('courses/show', { courses: mongooseToObject(courses) })
            })
            .catch(next);
        // res.send('Course Detail');
    }
}

module.exports = new CoursesController();
