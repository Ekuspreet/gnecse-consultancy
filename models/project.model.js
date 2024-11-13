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
    ref: "alumnis",
    required: true,
  },
  mentor: {
    type: String,
    ref: "staffs",
    default: null,
  },
  students: {
    type: Array,
    ref: "Student",
  },
  requests: {
    type: Array,
    ref: "Student",
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
  data: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["draft", "pending", "approved", "assigned","active", "completed", "rejected"],
  },
});

const Project = mongoose.model("Project", projectSchema);

const addProject = async (client, data, status) => {
  try {
    const project = new Project({
      client,
      data,
      status: status,
    });
    await project.save();
    return project;
  } catch (error) {
    return { error };
  }
};

const updateProject = async (puid, data, status) => {
  try {
    const result = await Project.updateOne(
      { puid },
      { data: data, status: status }
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found" };
    }
    return result;
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

const getProjectsByAlumniId = async (id, type) => {
  try {
    const project = await Project.find({ client: id, status: type });
    return project;
  } catch (error) {
    return { error };
  }
};

const getPendingProjects = async () => {
  try {
    const project = await Project.find({ status: "pending", approvedAt: null });
    return project;
  } catch (error) {
    return { error };
  }
};

const getAvailibleProjects  = async () => {
  try {
    const project = await Project.find({ status: "approved" , mentor : null });
    return project;
  } catch (error) {
    return { error };
  }
}

const assignProjectToMentor = async (puid,mentor)=> {
  try{
    const result = await Project.updateOne(
      {status : "approved", mentor : null, puid},
      { status : "assigned", mentor:mentor}
    );
    if(result.matchedCount === 0){
      return { error : "Project not found or already assigned"}
    }
    return result;
  }catch(error){
    return { error : error}
  }
}

const approveProject = async (puid) => {
  try {
    const result = await Project.updateOne(
      { status: "pending", puid: puid },
      { status: "approved", approvedAt: Date.now() }
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found or already approved" };
    }
    return result;
  } catch (error) {
    return { error };
  }
};


const rejectProject = async (puid) => {
  try {
    const result = await Project.updateOne(
      { status: "pending", puid: puid },
      { status: "rejected" }
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found or already rejected" };
    }
    return result;
  } catch (error) {
    return { error };
  }
};

const getProjectsByMentorId = async (uuid) => {
  try {
    const project = await Project.find({ mentor: uuid });
    return project;
  } catch (error) {
    return { error };
  }
};

const assignProjectToStudent = async (puid,mentor,student) => {
  try {
    const result = await Project.updateOne(
      { status: "assigned", puid , mentor},
      { $push: { requests: student } }
    );
    console.log(result);
    if (result.matchedCount === 0) {
      return { error: "Project not found or already assigned" };
    }
    return result;
  } catch (error) {
    return { error };
  }
};

const getStudentsByProjectId = async (puid) => {
  try {
    const project = await Project.findOne({ puid });
    return project.students;
  }
  catch (error) {
    return { error };
  }
}

const getRequestedStudentsByProjectId = async (puid) => {
  try {
    const project = await Project.findOne({ puid })
    return project.requests;
  }
  catch (error) {
    return { error };
  }
};

const getRequestsByStudentId = async (uuid) => {
  try {
    const projects = await Project.find({ requests: { $in: [uuid] } });
    return projects;
  }
  catch (error) {
    return { error };
  }
};

const joinProjectByStudent = async (puid, student) => {
  try {
    const result = await Project.updateOne(
      { status: "assigned", puid , requests: { $in: [student] } },
      { $push: { students: student }, $pull: { requests: student } }
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found or already assigned" };
    }
    return result;
  } catch (error) {
    return { error };
  }
}

const leaveProjectByStudent = async (puid, student) => {
  try {
    const result = await Project.updateOne(
      { status: "assigned", puid , requests: { $in: [student] } },
      { $pull: { requests: student } }
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found or already assigned" };
    }
    return result;
  } catch (error) {
    return { error };
  }
}
module.exports = {
  addProject,
  getAllProjects,
  getProjectsByAlumniId,
  updateProject,
  getAvailibleProjects,
  getPendingProjects,
  approveProject,
  rejectProject,
  assignProjectToMentor,
  getProjectsByMentorId,
  getStudentsByProjectId,
  getRequestedStudentsByProjectId,
  assignProjectToStudent,
  getRequestsByStudentId,
  joinProjectByStudent,
  leaveProjectByStudent,
};
