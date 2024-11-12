const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const uniqueId = () => uuidv4().slice(0, 8);

const baseSchema = new Schema({
  uuid: {
    type: String,
    default: uniqueId,
    unique: true,
  },
  name: {
    type: String,
    required: true,
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
  phone: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const studentSchema = new Schema({
  ...baseSchema.obj,
  crn: {
    type: String,
    required: [true, "Class Roll Number is required for students."],
  },
});

const Student = mongoose.model("Student", studentSchema);

const alumniSchema = new Schema({
  ...baseSchema.obj,
  passyear: {
    type: String,
    required: [true, "Passout year is required for alumni."],
  },
});

const Alumni = mongoose.model("Alumni", alumniSchema);

const staffSchema = new Schema({
  ...baseSchema.obj,
  role: {
    type: String,
    required: true,
    enum: ["tcc", "mentor"],
  },
  employeeid: {
    type: String,
    required: [true, "Employee ID is required for staff."],
  },
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = {
  Student,
  Alumni,
  Staff,
};
