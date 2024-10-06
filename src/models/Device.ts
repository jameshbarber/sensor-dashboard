import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var device = new Schema({
    _id: String,
    created: { type: Number, default: Date.now },
    location: {
        latitude: Number,
        longitude: Number,
        height: Number,
    },
    shade: Boolean,
});

// @ts-ignore
mongoose.models = {};

var Device = mongoose.model('Device', device);

export default Device;