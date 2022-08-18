const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/blog_education_dev', function(err, res) {
//     if(err) throw err;
//     console.log('Connected to Database');
// });
// tý cháu note lại lỗi :)
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    slug: {type: String},
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

// const Student = new Schema({
//     studentName: String
// })
module.exports = mongoose.model('courses', Course);
// module.exports = mongoose.model('Student', Student,'student');
