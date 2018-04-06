const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Sets up enviroment variables for config
require('dotenv').config();

app.use(cors({ exposedHeaders: 'Auth' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));

const routes = require('./routes');
// Include routes here
app.use('/flipbooks', routes.flipbook);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.log(err);
    res.status(status).json({ error: err });
});

app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'Route not found!' }});
});

function listener() {
    console.log(`Listening on port ${port}...`);
}

app.listen(port, listener);