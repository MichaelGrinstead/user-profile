import express from "express";
import { userRouter } from "./routes/user.router";
import cookieParser from "cookie-parser";
import { loginUser, logoutUser } from "./controllers/user.controller";
import { verifyToken } from "./middleware/verifyToken";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/users", userRouter);
app.post("/login", loginUser);
app.post("/logout", verifyToken, logoutUser);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* {
  "username": "userOne",
  "email": "userOne@one.com",
  "password": "one123"
}*/
