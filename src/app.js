import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import connection from './bin/db/models'

//var indexRouter = require('./routes/index');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
connection.db.sync({force:false}).then(function(data){
    console.log('db Sync done')
})
//app.use('/', indexRouter);



export default app;
