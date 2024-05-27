import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryConfig.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username === "" || email === "" || password === "") {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExistAlready = await User.findOne({ email });
    if (isUserExistAlready) {
      return res.status(409).json({ message: "User already exist" });
    }

    const encryptedPassword = bcryptjs.hashSync(password, 10);

    const refreshToken = jwt.sign(
      { username, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const avatarFileLocalPath = req.file.path;

    if (!avatarFileLocalPath) {
      return res
        .status(402)
        .json({ message: "Error occur while uploading avatar to server" });
    }

    const avatar = await uploadToCloudinary(avatarFileLocalPath);
    if (!avatar) {
      return res
        .status(402)
        .json({ message: "Error occur while uploading avatar to server" });
    }

    const savedUser = User({
      username,
      email,
      password: encryptedPassword,
      avatar: avatar.url,
      refreshToken,
    });
    await savedUser.save();
    savedUser.password = undefined;
    savedUser.refreshToken = undefined;

    res.status(200).json({
      message: "User successfully registered",
      userData: savedUser,
    });
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "" || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isUserRegistered = await User.findOne({ email });
    if (!isUserRegistered) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = bcryptjs.compareSync(
      password,
      isUserRegistered.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const refreshTokenPayload = {
      username: isUserRegistered.username,
      email: isUserRegistered.email,
    };
    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const accessTokenPayload = {
      _id: isUserRegistered._id,
      email: isUserRegistered.email,
    };
    const accessToken = jwt.sign(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    isUserRegistered.refreshToken = undefined;
    isUserRegistered.password = undefined;
    res
      .status(200)
      .cookie("access_token", accessToken)
      .cookie("refresh_token", refreshToken)
      .json({
        message: "User logged in successfully",
        userData: isUserRegistered,
        tokens: [accessToken, refreshToken],
      });
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }

  // getting email and password from frontend
  //valiadatiom of email and password if it is null or ""empty
  //check if user is registered or not
  //comparing password
  //generate access and refresh token
  //set cookie in brower of user
  // sending response
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(402).json({
        message: "User id not found",
      });
    }

    const user = await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: user,
    });
  } catch (error) {
    res.status(error.statusCode || 501).json({
      message: error.message || "Internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .clearCookie("refresh_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    return res.status(error.statusCode || 501).json({
      message: error.message || "Internal server error",
    });
  }
};
export { registerUser, loginUser, deleteUser, logoutUser };
