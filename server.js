const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const  logger = require('./utils/logger.js');


const app = express();
const db  = require('./utils/db.js');
const User = require('./models/userModel.js');


app.use(bodyParser.json())

  
  // Middleware to log API requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// ROUTES 
app.use('/user',require('./routes/userRoute.js'));
app.use('/course',require('./routes/courseRoute.js'));

app.listen(process.env.PORT,()=>{
    console.log("listening port on 3000");
})
