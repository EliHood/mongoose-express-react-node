const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
cors = require("cors");
var mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const usersRouter = require("./routes/users");
const countriesRouter = require("./routes/countries");

const app = express();
app.disable("etag");

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://ayuba:ayuba@cluster0-xev7x.mongodb.net/olanrewaju?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use(logger("dev"));
app.use("/api/user", usersRouter);
app.use("/api/countries", countriesRouter);

app.listen(PORT, function () {
  console.log(`Server is running on Port: ${PORT}`);
});

module.exports = app;
