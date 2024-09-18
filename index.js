const express = require('express');
const cors = require('cors'); // middleware
const dotenv = require('dotenv');
const { userRoute } = require('./routes/user');
const { articleRoute } = require('./routes/article');
const { commentRoute } = require('./routes/comment');
const { connectDb } = require('./config/connectDb');

// enable environmental variables
dotenv.config();
const PORT = process.env.PORT || 4500;
const DB_URL = process.env.DB_URL;
const app = express();

// connect to mongodb
connectDb(DB_URL);

// enable cors
app.use(cors());
app.use(express.json({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ extended: true })); // app will decode the data

app.use('/api/v1', userRoute);
app.use('/api/v1', articleRoute);
app.use('/api/v1', commentRoute);

app.listen(PORT, () => console.log(`app is running on PORT ${PORT}`));