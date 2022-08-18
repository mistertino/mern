const Course = require('../models/Course');

class SiteController {
    home(req, res) {
        // res.render('home');
        res.json({name: 'test'})
        Course.find({}, function(err, courses){
            if (!err){
                res.json(courses);
            } 
            else {
                res.status(400).json({error: 'ERROR!'});
            }   
        });
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
