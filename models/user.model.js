const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");


const uniqueId = () => uuidv4().slice(0, 8);

const userSchema = new Schema({
  uuid: {
    type: String,
    default: uniqueId,
    unique: true,
  },
  name : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  passhash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["alumni", "student", "training", "mentor"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  crn: {
    type: String,
    validate: {
      validator: function (v) {
        if (this.role === "student") {
          return !!v;
        }
        return true;
      },
      message: "Class Roll Number is required for students.",
    },
  },
  passyear: {
    type: String,
    validate: {
      validator: function (v) {
        if (this.role === "alumni") {
          return !!v;
        }
        return true;
      },
      message: "Passout year is required for alumni.",
    },
  },
  phone : {
    type: String,
  },
  employeeid: {
    type: String,
    validate: {
      validator: function (v) {
        if (this.role === "training" || this.role === "mentor") {
          return !!v;
        }
        return true;
      },
      message: "Employee ID is required for staff.",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
