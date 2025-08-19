const express = require("express");
const cors = require("cors");
const messageRoute=require("./routes/messageRoute/messageRoute")
const productRoute=require("./routes/productRoute/productRoute")
const settingsRoute=require("./routes/settingsRoute/settingsRoute")
//test
const app = express();

app.use(cors({
    origin: ['http://localhost:3002', 'https://laxmigi.netlify.app/'],
    credentials: true
  }));
app.use(express.json({ limit: '50mb' })); // Increase the limit as needed
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For URL-encoded data

app.use("/api/message",messageRoute);
app.use("/api/product",productRoute);
app.use("/api/settings",settingsRoute);

module.exports = app;