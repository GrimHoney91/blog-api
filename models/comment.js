const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {DateTime} = require('luxon');

const CommentSchema = new Schema({
    username: {type: String, minLength: 8, maxLength: 25, required: true},
    post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    timestamp: {type: Date, default: Date.now(), required: true},
    text: {type: String, maxLength: 5000, required: true}
});

CommentSchema
.virtual('formatted_timestamp')
.get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('Comment', CommentSchema);