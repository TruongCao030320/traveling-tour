import jwt from "jsonwebtoken";
export const verify = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Please log in ! You're not authenticate!",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }
    req.user = user;
    next();
  });
};
export const verifyAdmin = async (req, res) => {
  verify(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authorization !",
      });
    }
  });
};
