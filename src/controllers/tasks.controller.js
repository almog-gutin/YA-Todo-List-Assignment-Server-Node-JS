const Task = require('../models/task.model');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});

        res.send({ statusCode: 200, statusMessage: 'Ok', message: null, data: tasks });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};

const createTask = async (req, res) => {
    if (!req.body.task)
        return res.status(400).send({ statusCode: 400, statusMessage: 'Bad Request', message: null, data: null });

    const task = new Task(req.body);

    try {
        await task.save();

        res.status(201).send({
            statusCode: 201,
            statusMessage: 'Created',
            message: 'Task was successfuly created.',
            data: task,
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};

const updateTask = async (req, res, next) => {
    const id = req.params.id;
    const completed = +req.query.completed;
    if (isNaN(completed) || completed < 0 || completed > 1)
        return res.status(400).send({ statusCode: 400, statusMessage: 'Bad Request', message: null, data: null });

    try {
        await Task.findByIdAndUpdate(id, { completed: completed === 0 ? false : true });

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Task was updated successfuly.',
            data: null,
        });
    } catch (err) {
        next();
    }
};

const deleteTask = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Task.findByIdAndDelete(id);

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Task was deleted successfuly.',
            data: null,
        });
    } catch (err) {
        next();
    }
};

const findTask = async (req, res) => {
    const search = req.query.search;
    if (!search)
        return res.status(400).send({ statusCode: 400, statusMessage: 'Bad Request', message: null, data: null });

    try {
        const task = await Task.findOne({ 'task': { $regex: new RegExp(search), $options: 'i' } });

        console.log(task);

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Task was successfuly found.',
            data: task,
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    findTask,
};
