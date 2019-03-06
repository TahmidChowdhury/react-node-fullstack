const express           = require('express');
const app               = express();
const morgan            = require('morgan');
const mongoose          = require('mongoose');
const bodyParser        = require('body-parser');
const expressValidator  = require('express-validator');
const dotenv            = require('dotenv');
dotenv.config();

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');


//db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  ).then(() => console.log('DB connected'));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
})

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);


const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`a Node JS API ${port}`)});