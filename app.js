const express           = require('express');
const app               = express();
const morgan            = require('morgan');
const mongoose          = require('mongoose');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const expressValidator  = require('express-validator');
const dotenv            = require('dotenv');
dotenv.config();


//db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  ).then(() => console.log('DB connected'));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
})


//routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err,req,res,next){
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({error: "Unauthorized"});
  }
});


const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`a Node JS API ${port}`)});
