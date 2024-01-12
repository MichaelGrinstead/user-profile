import { Request, Response } from "express";
import { pool } from "../database/pool";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT } from "../types";
dotenv.config();

const secret = process.env.JWT_SECRET || "secret";

// Get User

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];

    if (user) res.status(200).send({ message: "User found", user: user });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server error" });
  }
}

// Register User

export async function registerUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: "Username and password required" });
  }

  try {
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userCheck.rows[0]) {
      res.status(400).send({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [username, email, hash]
    );
    const newUser = result.rows[0];

    res.status(200).send({ message: "User created", user: newUser });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server error" });
  }
}

// Login User

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: "Username and password required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 ",
      [username]
    );
    const user = result.rows[0];

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });
        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).send({ message: "Login successful" });
      } else {
        res.status(400).send({ message: "Invalid credentials" });
      }
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server error" });
  }
}

// Get current User

export async function getCurrentUser(req: Request, res: Response) {
  const { id } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];

    if (user) res.status(200).send({ message: "User found", user: user });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server error" });
  }
}

// Logout User

export async function logoutUser(req: Request, res: Response) {
  const { id } = req.body;
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).send({ message: `Logged out user with id ${id}` });
}

// Delete user

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );

    const removedUser = result.rows[0];

    res.status(200).send({ message: "User deleted", user: removedUser });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server error" });
  }
}

// Update user about

export async function updateUserAbout(req: Request, res: Response) {
  const { id } = req.body;
  const { about } = req.body;

  console.log("about", about);
  console.log("id", id);

  try {
    const result = await pool.query(
      "UPDATE users SET about = $1 WHERE id = $2 RETURNING id",
      [about, id]
    );

    const updatedUser = result.rows[0];

    res.status(200).send({ message: "User updated", user: updatedUser });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server error" });
  }
}
