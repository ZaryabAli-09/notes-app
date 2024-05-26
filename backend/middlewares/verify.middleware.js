import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const verifyUser = async (req, res, next) => {
  const userBrowserAccessToken = req.cookies.access_token;
  const userBrowserRefreshToken = req.cookies.refresh_token;

  if (!userBrowserAccessToken || !userBrowserRefreshToken) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }
  const decodedAccessToken = jwt.verify(
    userBrowserAccessToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  const decodedRefreshToken = jwt.verify(
    userBrowserRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decodedAccessToken) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  const user = await User.findById(decodedAccessToken._id);
  if (!user) {
    return res.status(401).json({
      message: "Invalid Token || Unauthorized",
    });
  }
  if (decodedRefreshToken.username === user.username) {
    next();
  }
};

export { verifyUser };
