const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        description: { type: String },
        image: { type: String },
        videoID: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
        _id: false,
    },
);

Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
Course.plugin(AutoIncrement);

module.exports = mongoose.model('courses', Course);
