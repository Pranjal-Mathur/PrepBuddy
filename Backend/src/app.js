const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://prep-buddy-frontend.vercel.app",
];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes")


app.use("/api/auth", authRouter);
app.use("/api/interview",interviewRouter);

module.exports = app;