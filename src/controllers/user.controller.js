import userModel from "../schemas/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await userModel.create({
      ...user,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: `"Error", ${error}` });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successfully",
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
