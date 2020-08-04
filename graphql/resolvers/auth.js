/**
 * Getting all the dependecies
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = {

  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email});
      if (existingUser) {
        throw new Error ("Email already exists!");
      };
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await newUser.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error ("User does not exist with that email");
    };
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error ("Incorrect Password");
    };
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWTKEY, {expiresIn: process.env.EXPIRESIN} );
    return {
      userId: user.id,
      email: user.email,
      token,
      tokenExpiration: process.env.EXPIRESIN
    };
  }

};