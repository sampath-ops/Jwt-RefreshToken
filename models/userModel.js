const mongoose = require("mongoose");
const validator = require("validator");
const bcrpt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "please provide valid email"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "passwords are not same",
    },
  },
  refreshToken: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) return next();

  // hash the password with cost of 12
  this.password = await bcrpt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrpt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
