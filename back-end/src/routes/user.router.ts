import express from "express";
import {
  getUser,
  registerUser,
  deleteUser,
  updateUserAbout,
  getCurrentUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middleware/verifyToken";

export const userRouter = express.Router();

userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);

userRouter.post("/", registerUser);
userRouter.put("/", verifyToken, updateUserAbout);
userRouter.get("/", verifyToken, getCurrentUser);
