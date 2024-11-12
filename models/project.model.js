const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");

const uniqueId = () => uuidv4().slice(0, 8);


const projectSchema = new mongoose.Schema({
  puid: {
    type: String,
    default: uniqueId,
    unique: true,
  },
  client: {
    type: String,
    ref : "alumnis",
    required: true,
  },
  mentor: {
    type: String,
    ref : "staffs",
  },
  students: {
    type: Array,
    ref : "students",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
    default: null,
  },
  completedAt: {
    type: Boolean,
    default: null,
  },
  budget: {
    type: Number,
  },
  data : {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "draft",
    enum: ["draft","pending", "approved", "completed"],
  },
});

const Project = mongoose.model("Project", projectSchema);

const addProject = async (client,data) => {
  try {
    
    const project = new Project(
      {
        client,
        data,
      }
    );
    await project.save();
    return project;
  } catch (error) {
    return { error };
  }
}; 

const getAllProjects = async () => {
  try {
    const projects = await Project.find();
    return projects;
  } catch (error) {
    return { error };
  }
};

const getProjectsByAlumniId = async (id,type) => {

  try {
    const project = await Project.find({ client: id , status : type });
    return project;
  }
  catch (error) {
    return { error };
  }
};
module.exports = {addProject , getAllProjects , getProjectsByAlumniId};
