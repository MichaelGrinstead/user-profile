import express from "express";
import {
  registerUser,
  loginUser,
  removeUser,
} from "./controllers/userController";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/register", registerUser);

app.delete("/remove", removeUser);

app.post("/login", loginUser);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
