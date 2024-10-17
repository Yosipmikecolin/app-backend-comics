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

    const token = jwt.sign(
      { id: newUser._id.toString(), email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.status(201).json({
      message: "User created successfully",
      username: newUser.name + " " + newUser.lastname,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
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

      const token = jwt.sign(
        { id: user._id.toString(), email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "10h",
        }
      );

      res.status(200).json({
        message: "Login successfully",
        username: user.name + " " + user.lastname,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
