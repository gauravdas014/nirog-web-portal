const express = require('express');
const path = require('path');
const viewRouter = require('./routes/viewRoutes');
const authRouter = require('./routes/authRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const hospitalRouter = require('./routes/hospitalRoutes');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', viewRouter);
app.use('/auth', authRouter);
app.use('/api/hospital', hospitalRouter);
app.use('/api/doctor', doctorRouter);

module.exports = app;
