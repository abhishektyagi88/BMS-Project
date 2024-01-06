const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./Routes/UserRoute");
const movieRoute = require("./Routes/MovieRoutes");
const theatreRoute = require("./Routes/TheatreRoutes");
const showRoute = require("./Routes/ShowRoutes");
const bookingRoute = require("./Routes/bookingRoutes");
const path = require("path");

require("dotenv").config();
const db = require("./Config/dbConfig");

app.use(cors());
app.use(express.json());

app.use("/api/user",userRoute);
app.use("/api/movie",movieRoute);
app.use("/api/theatre",theatreRoute);
app.use("/api/show",showRoute);
app.use("/api/booking",bookingRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/CLIENT/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "CLIENT", "build", "index.html"));
    });
  }


app.listen(3001 , () => {
    console.log("Server is running on http://localhost:3001");
})