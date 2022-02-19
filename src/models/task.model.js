const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Task description is required'],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
