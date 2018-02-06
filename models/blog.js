const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        default: 'New Title ' + Date.now()
    },
    author: {
        type: String,
        required: true,
        default: 'Empty'
    },
    body: {
        type: String,
        required: true,
        default: 'New Body ' + Date.now()
    },
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now()},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

blogSchema.statics.findByAuthor = function (author, cb) {
    return this.find({author: new RegExp(author, 'i')}, cb);
};
///// methods //////
blogSchema.methods.findAllBlogs = function (callback) {
    return this.model('Blog').find({}, callback);
};
blogSchema.methods.findByTitle = function (callback) {
    return this.model('Blog').find({title: this.title}, callback);
};

blogSchema.methods.createNew = function (obj, callback) {
    return this.model('Blog').insert(obj, callback);
};

exports.Blog = mongoose.model('Blog', blogSchema);