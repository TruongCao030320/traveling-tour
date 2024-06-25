import User from "../models/User";
import formValidate from "../helpers/authValidate";
export const register = async (req, res) => {
  const { username, email, password, repeat_password } = req.body;
  try {
    const error = await formValidate.validateAsync({
      username,
      email,
      password,
      repeat_password,
    });
    if (error) {
      return res.status(404).json({
        success: true,
        message: error.message[0].message,
      });
    }
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Register succeed !",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Can not submit review !",
    });
  }
};
