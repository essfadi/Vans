const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user/", require("./routes/userRoutes"));
app.use('/api/schedule/', require('./routes/scheduleRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
