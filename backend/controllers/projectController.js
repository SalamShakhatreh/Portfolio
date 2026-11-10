
const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get projects",
            error: error.message
        });
    }
};

const addProject = async (req, res) => {
    try {
        const projectData = {
            ...req.body,
            image: req.file ? req.file.path : "",
            public_id: req.file ? req.file.filename : ""
        };

        if (typeof projectData.technologies === "string") {
            projectData.technologies = JSON.parse(projectData.technologies);
        }

        const newProject = await Project.create(projectData);

        res.status(201).json({
            message: "Project added successfully",
            project: newProject
        });
    } catch (error) {
        if (req.file) {
            await cloudinary.uploader.destroy(req.file.filename);
        }

        res.status(400).json({
            message: "Failed to add project",
            error: error.message
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const projectData = { ...req.body };

        if (typeof projectData.technologies === "string") {
            projectData.technologies = JSON.parse(projectData.technologies);
        }

        const existingProject = await Project.findById(req.params.id);

        if (!existingProject) {
            if (req.file) {
                await cloudinary.uploader.destroy(req.file.filename);
            }

            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (req.file) {
            if (existingProject.public_id) {
                await cloudinary.uploader.destroy(existingProject.public_id);
            }

            projectData.image = req.file.path;
            projectData.public_id = req.file.filename;
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            projectData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update project",
            error: error.message
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.public_id) {
            await cloudinary.uploader.destroy(project.public_id);
        }

        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Project deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete project",
            error: error.message
        });
    }
};

module.exports = {
    getProjects,
    addProject,
    updateProject,
    deleteProject
};
