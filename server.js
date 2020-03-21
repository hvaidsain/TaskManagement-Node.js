require("dotenv").config();
const config = require("config");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const userRoutes = require("./routes/routes");
const PORT = process.env.PORT || 4001;
const DB_STRING = config.get("db.connection-string");
const app = express();

//middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.get("/", (req, res) => {
  res.send("<h1>Server Running</h1>");
});
app.use("/api", userRoutes);

//database connection
mongoose
  .connect(DB_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Database Successfully Connected");
      console.log("Server started on PORT:", PORT);
    });
  })
  .catch(err => {
    console.error();
  });
