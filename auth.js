const jwt = require("jsonwebtoken");
const User = require("./models/User.js");

module.exports = {
  refreshTokens: async (token) => {
    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        return {};
      }
      /**find the user */
      const user = await User.findById(decoded.sub);
      if (!user) {
        return {};
      }
      const refreshSecret = process.env.JWT_SECRET_2 + user.password;
      const { access_token, refreshToken } = await createTokens(
        user,
        refreshSecret
      );
      return {
        access_token,
        refreshToken,
        user,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
const createTokens = async (user, SECRET_2) => {
  const access_token = jwt.sign(
    {
      sub: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1m" }
  );
  const refreshToken = jwt.sign(
    {
      sub: user._id,
    },
    SECRET_2,
    { expiresIn: "15m" }
  );
  return {
    access_token,
    refreshToken,
  };
};
