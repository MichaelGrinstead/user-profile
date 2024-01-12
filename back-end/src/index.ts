import express from "express";
import { userRouter } from "./routes/user.router";
import cookieParser from "cookie-parser";
import { loginUser, logoutUser } from "./controllers/user.controller";
import { verifyToken } from "./middleware/verifyToken";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/login", loginUser);
app.use("/logout", verifyToken, logoutUser);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* {
  "username": "userOne",
  "email": "userOne@one.com",
  "password": "one123"
}*/
