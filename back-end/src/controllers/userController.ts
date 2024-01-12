import { Request, Response } from "express";
import { pool } from "../database/pool";
import bcrypt from "bcrypt";

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

    console.log(user);
    console.log(result.rows[0]);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
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

export async function removeUser(req: Request, res: Response) {
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
