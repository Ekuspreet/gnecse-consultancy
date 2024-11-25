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
    ref: "Alumni",
    required: true,
  },
  mentor: {
    type: String,
    ref: "Staff",
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
  interests: [
    {
      staff: {
        type: String,
        ref: "Staff",
        required: true,
      },
      details: {
        type: Object,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
    default: null,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  data: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["draft", "pending", "approved", "assigned", "active", "completed","submitted"]
  },
  submission: {
    type: Object,
    default: null,
  },
  progress: {
    type: Number,
    default: 0,
  }
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

const getInterests = async (mentor) => {
  try {
    const project = await Project.find({ status : 'approved', interests: { $elemMatch: { staff: mentor } } });
    return project;
  } catch (error) {
    return { error };
  }
};

const getAvailibleProjects  = async (mentor) => {
  try {
    const project = await Project.find({ status: "approved", mentor: null, interests: { $not: { $elemMatch: { staff: mentor } } } });
    return project;
  } catch (error) {
    return { error };
  }
}

const assignProjectToMentor = async (puid,mentor)=> {
  try{
    const result = await Project.updateOne(
      {status : "approved", mentor : null, puid, interests : { $elemMatch : { staff : mentor }}},
      {status : "assigned", mentor:mentor , interests : [] }
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
    const project = await Project.find({ mentor: uuid , status : "assigned"});
    return project;
  } catch (error) {
    return { error };
  }
};

const getActiveProjectsByMentorId = async (uuid) => {
  try {
    const project = await Project.find({ mentor: uuid , status : "active"});
    return project;
  } catch (error) {
    return { error };
  }
};

const expressInterestByMentor = async ( puid, mentor, details) => {
  try {
    const result = await Project.updateOne(
      { status: "approved", puid },
      { $push: { interests: { staff: mentor, details: details } } }
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found or already assigned." };
    }
    return result;
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

const getApprovedProjects = async () => {
  try {
    const project = await Project.find({ status: "approved" });
    return project;
  } catch (error) {
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

const startProject = async (puid) => {
  try {
    const result = await Project.updateOne(
      { status: "assigned", puid },
      { status: "active" }
    );
    console.log(result);
    if (result.matchedCount === 0) {
      return { error: "Project not found or already active" };
    }
    return result;
  } catch (error) {
    return { error };
  }
};

const completeProject = async (puid,submission) => {
  try {
    const result = await Project.updateOne(
      { puid : puid , status : "active" },
      { status: "completed", completedAt: Date.now(), submission: submission }
    );
    console.log(result);
    if (result.matchedCount === 0) {
      return { error: "Project not found or already completed" };
    }
    return result;
  } catch (error) {
    return { error };
  }
}

const submitProject = async (puid) => {
  try {
    const result = await Project.updateOne(
      { status: "completed", puid },
      { status: "submitted"}
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found or already submitted" };
    }
    return result;
  } catch (error) {
    return { error };
  }
}

const updateProjectProgress = async (puid,progress) => {
  try {
    const result = await Project.updateOne(
      { puid },
      { progress }
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found" };
    }
    return result;
  } catch (error) {
    return { error };
  } 
};

const rejectSubmission = async (puid) => {
  try {
    const result = await Project.updateOne(
      { status: "completed", puid },
      { status: "active"}
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found or already active" };
    }
    return result;
  } catch (error) {
    return { error };
  }
}

const getSubmittedProjects = async () => {
  try {
    const project = await Project.find({ status: "submitted" });
    return project;
  } catch (error) {
    return { error };
  }
}

const updateProgress = async (puid,progress) => {
  try {
    const result = await Project.updateOne(
      { puid },
      { progress }
    );
    if (result.matchedCount === 0) {
      return { error: "Project not found" };
    }
    return result;
  } catch (error) {
    return { error };
  }
}


const getActiveProjectsByAlumniId = async (uuid) => {
  try {
    const project = await Project.find({ client: uuid, status: "active" });
    return project;
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
  getInterests,
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
  startProject,
  completeProject,
  submitProject,
  rejectSubmission,
  getActiveProjectsByMentorId,
  getSubmittedProjects,
  expressInterestByMentor,
  getApprovedProjects,
  updateProjectProgress,
  updateProgress,
  getActiveProjectsByAlumniId,
};
