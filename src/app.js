const express = require('express');
const cors = require('cors');

const tasksRouter = require('./routers/tasks.router');
const notFoundMiddleware = require('./middleware/not-found.middleware');

require('./databases/mongoose.databse');

const app = express();

app.use(express.json());

const NODE_ENV = process.env.NODE_ENV || 'development';
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin = '', callback) {
        if (whitelist.indexOf(origin) !== -1) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};
app.use(NODE_ENV === 'development' ? cors() : cors(corsOptions));

app.get('/', (req, res) => res.send());
app.use('/tasks', tasksRouter);
app.use(notFoundMiddleware);

module.exports = app;
