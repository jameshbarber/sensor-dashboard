import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var reading = new Schema({
    device_id: String,
    data: Object,
    created: { type: Number, default: Date.now },
});

// @ts-ignore
mongoose.models = {};

var Reading = mongoose.model('Reading', reading);

export default Reading;