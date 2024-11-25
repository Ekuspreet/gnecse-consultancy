const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/user.auth");
const {
  getAvailibleProjects,
  getProjectsByMentorId,
  getActiveProjectsByMentorId,
  getSubmittedProjects,
  getInterests,
} = require("../../models/project.model");

router.get("/profile", authMiddleware(["mentor"], "web"), async (req, res) => {
  const projects = await getAvailibleProjects(req.user.uuid);
  const interests = await getInterests(req.user.uuid);

  const filteredInterests = interests.map((project) => {
    const plainProject = project.toObject(); // Convert each Mongoose document to a plain object
    return {
      ...plainProject, // Spread the plain project details
      interests: plainProject.interests.filter(
        (interest) => interest.staff.toString() === req.user.uuid // Filter the interests array
      ),
    };
  });

  res.render("mentor/index", {
    title: "PROFILE",
    layout: "layouts/mentor",
    user: req.user,
    projects: projects,
    interests: filteredInterests,
  });
});

router.get("/project", authMiddleware(["mentor"], "web"), async (req, res) => {
  const projects = await getActiveProjectsByMentorId(req.user.uuid);
  console.log(projects);
  res.render("mentor/project", {
    title: "ACTIVE PROJECTS",
    layout: "layouts/mentor",
    user: req.user,
    projects: projects,
  });
});

router.get("/team", authMiddleware(["mentor"], "web"), async (req, res) => {
  const projects = await getProjectsByMentorId(req.user.uuid);

  res.render("mentor/team", {
    title: "FORM A TEAM WITH STUDENTS",
    layout: "layouts/mentor",
    user: req.user,
    projects: projects,
  });
});

router.get("/submit", authMiddleware(["mentor"], "web"), async (req, res) => {
  const projects = await getSubmittedProjects();
  res.render("mentor/submit", {
    title: "SUBMISSIONS OF WORK DONE",
    layout: "layouts/mentor",
    user: req.user,
    projects: projects,
  });
});

router.get("/logout", authMiddleware(["mentor"], "web"), (req, res) => {
  res.clearCookie("auth-token");
  res.redirect("/");
});

module.exports = router;
