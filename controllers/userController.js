import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, password,email,address,role } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      address,
      role,
    });

    await newUser.save();

    res.status(201).json({ newUser, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    //I will check if the user exists
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //if user exist we will compare the password with the hashed password,for this we need bycrpt compare method

    const isPassowordCorrect = await bcrypt.compare(password, user.password);

    //check if this password is valid or not

    if (!isPassowordCorrect) {
      return res.status(404).json({ message: "Password is invalid" });
    }

    //After this I will generate jwt token

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.status(200).send({
      success: true,
      message: "login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error while login" });
  }
};
