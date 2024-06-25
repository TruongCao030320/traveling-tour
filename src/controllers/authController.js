import User from "../models/User";
import formValidate from "../helpers/authValidate";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { username, email, password, repeat_password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const hashPassword = bcrypt.hashSync(password, salt);
    const { error } = await formValidate.validateAsync({
      username,
      email,
      password,
      repeat_password,
    });
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: true,
        message: "Username is existed !!",
      });
    }
    if (error) {
      return res.status(404).json({
        success: true,
        message: error,
      });
    }
    const newUser = new User({ username, email, password: hashPassword });
    const savedUser = await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Register succeed !",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      //   message: "Register failed !",
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const checkedPassword = bcrypt.compare(req.body.password, user.password);

      const { password, _id, ...data } = user._doc;
      const token = jwt.sign(
        {
          id: _id,
          role: data.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      if (checkedPassword) {
        return res
          .cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn,
          })
          .status(200)
          .json({
            success: true,
            message: "Login Success",
            data: data,
            token: token,
          });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      //   message: "Register failed !",
      message: error.message,
    });
  }
};
