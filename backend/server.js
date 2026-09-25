const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectDB = require("./config/db");

// .env
dotenv.config();

// connection
connectDB();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", require("./routers/test.Route"));
app.use("/api/v1/auth", require("./routers/auth.Route"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is runnning on PORT ${PORT}`);
});
