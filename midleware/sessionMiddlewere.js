import session from "express-session";

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to `true` in production with HTTPS
});

export default sessionMiddleware;
