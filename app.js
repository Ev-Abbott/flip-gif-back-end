const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

// Sets up enviroment variables for config
require('dotenv').config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors({ exposedHeaders: 'Auth' }));
app.use(morgan('dev'));

app.use(`/${process.env.SECRET_PATH}`, routes.other);
app.use('/users', routes.users);
app.use('/flipbooks', routes.flipbook);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.log(err);
    res.status(status).json({ error: err, message: err.message });
});

app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'Route not found!' }});
});

function listener() {
    console.log(`Listening on port ${port}...`);
}

app.listen(port, listener);