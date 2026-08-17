import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // 1. Check if email already exists
    const foundUser = await User.findOne({
      where: { email },
    });

    if (foundUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // 2. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await User.create({
      fullName,
      email,
      passwordHash,
      role: "client",
    });

    // 4. Response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};