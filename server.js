const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');

let DB;
if (process.env.NODE_ENV === 'development') {
  DB = process.env.MONGODB_LOCAL_URI;
} else {
  DB = process.env.MONGODB_CLOUD_URI;
}


// mongo db connection using mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    throw err;
  });

const port = process.env.PORT || 8080;

// listening to the app
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
