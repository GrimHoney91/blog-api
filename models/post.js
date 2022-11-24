const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {DateTime} = require('luxon');

const PostSchema = new Schema({
    title: {type: String, maxLength: 80, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    timestamp: {type: Date, default: Date.now(), required: true},
    text: {type: String, maxLength: 30000, required: true},
    status: {type: String, enum: ['unpublished', 'published'], default: 'unpublished', required: true}
});

PostSchema
.virtual('formatted_timestamp')
.get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('Post', PostSchema);