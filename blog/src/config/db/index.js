const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.createConnection('mongodb://localhost:27017/blog_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');
    }
    catch(e){
        console.log('Connect failed');
    }
}

module.exports = {connect}