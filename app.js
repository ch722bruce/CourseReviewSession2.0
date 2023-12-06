import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import crypto from "crypto"; 
import LocalStrategy from "passport-local";
import { myDB } from "./db/database.js";

import usersRouter from "./routes/users.js";
import sessionRouter from "./routes/sessions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await myDB.getUser({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
        if (err) {
          return done(err);
        }
        if (!crypto.timingSafeEqual(Buffer.from(user.password, 'hex'), hashedPassword)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
      });

    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.username); // Using username for serialization
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await myDB.getUser({ username }); // Fetch the user by username
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Existing middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Session middleware for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "TEST", // Use an environment variable for the secret
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "front", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "dist", "index.html"));
});

app.use("/user", usersRouter);
app.use("/api", sessionRouter);

export default app;

// import express from "express";
// import path, { dirname } from "path";
// import cookieParser from "cookie-parser";
// import logger from "morgan";
// import { fileURLToPath } from "url";

// import usersRouter from "./routes/users.js";
// import sessionRouter from "./routes/sessions.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// let app = express();

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "front", "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "front", "dist", "index.html"));
// });

// app.use("/user", usersRouter);
// app.use("/api", sessionRouter);

// export default app;
