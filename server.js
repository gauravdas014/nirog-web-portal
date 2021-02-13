const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

let DB;
if (process.env.NODE_ENV === 'development') {
  DB = process.env.MONGODB_LOCAL_URI;
} else {
  DB = process.env.MONGODB_CLOUD_URI;
}

DB = process.env.MONGODB_CLOUD_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    throw err;
  });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
