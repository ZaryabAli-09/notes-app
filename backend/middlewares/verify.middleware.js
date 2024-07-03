import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const verifyUser = async (req, res, next) => {
  const userBrowserAccessToken = req.cookies.access_token;

  if (!userBrowserAccessToken) {
    return res.status(401).json({
      message: "Unauthorized userrr",
    });
  }
  const decodedAccessToken = jwt.verify(
    userBrowserAccessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (!decodedAccessToken) {
    return res.status(401).json({
      message: "Unauthorized userrrr",
    });
  }

  const user = await User.findById(decodedAccessToken._id);
  if (!user) {
    return res.status(401).json({
      message: "Invalid Tokenn || Unauthorized",
    });
  }

  next();
};

export { verifyUser };
