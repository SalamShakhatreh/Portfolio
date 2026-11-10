
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getFileUrl = (file) => {
  if (!file) return "";
  return file.startsWith("http") ? file : `${API_URL}${file}`;
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [certificates, setCertificates] = useState([]);
  const [certificateLoading, setCertificateLoading] = useState(true);
  const [certificateEditingId, setCertificateEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");

  const [certificateForm, setCertificateForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/admin/login", { replace: true });
        return;
      }

      try {
        await axios.get(`${API_URL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        fetchProjects();
        fetchCertificates();
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login", { replace: true });
        } else {
          setError("Unable to verify your login. Please try again.");
          setLoading(false);
          setCertificateLoading(false);
        }
      }
    };

    verifyToken();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`);

      setProjects(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load projects"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/certificates`);

      setCertificates(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load certificates"
      );
    } finally {
      setCertificateLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
      liveLink: "",
    });

    setSelectedImage(null);
    setImagePreview("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = new FormData();

    projectData.append("title", form.title);
    projectData.append("description", form.description);
    projectData.append(
      "technologies",
      JSON.stringify(
        form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "")
      )
    );
    projectData.append("githubLink", form.githubLink);
    projectData.append("liveLink", form.liveLink);

    if (selectedImage) {
      projectData.append("image", selectedImage);
    }

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/api/projects/${editingId}`,
          projectData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${API_URL}/api/projects`,
          projectData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      resetForm();
      setError("");
      await fetchProjects();
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);

    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      githubLink: project.githubLink || "",
      liveLink: project.liveLink || "",
    });

    setSelectedImage(null);
    setImagePreview(getFileUrl(project.image));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchProjects();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  };

  const handleCertificateChange = (e) => {
    setCertificateForm({
      ...certificateForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview("");
      }
    }
  };

  const resetCertificateForm = () => {
    setCertificateForm({
      title: "",
      issuer: "",
      issueDate: "",
    });

    setSelectedFile(null);
    setFilePreview("");
    setCertificateEditingId(null);
  };

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();

    const certificateData = new FormData();

    certificateData.append("title", certificateForm.title);
    certificateData.append("issuer", certificateForm.issuer);
    certificateData.append("issueDate", certificateForm.issueDate);

    if (selectedFile) {
      certificateData.append("file", selectedFile);
    }

    try {
      if (certificateEditingId) {
        await axios.put(
          `${API_URL}/api/certificates/${certificateEditingId}`,
          certificateData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${API_URL}/api/certificates`,
          certificateData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      resetCertificateForm();
      setError("");
      await fetchCertificates();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to save certificate"
      );
    }
  };

  const handleCertificateEdit = (certificate) => {
    setCertificateEditingId(certificate._id);

    setCertificateForm({
      title: certificate.title,
      issuer: certificate.issuer,
      issueDate: certificate.issueDate,
    });

    setSelectedFile(null);

    const filePath = certificate.file || "";
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(
      filePath.split("?")[0]
    );

    setFilePreview(
      isImage ? getFileUrl(filePath) : ""
    );
  };

  const handleCertificateDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/certificates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchCertificates();

      if (certificateEditingId === id) {
        resetCertificateForm();
      }

      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete certificate"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-dashboard-content">
        <h2>{editingId ? "Edit Project" : "Add New Project"}</h2>

        <form onSubmit={handleSubmit} className="admin-project-form">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="image-upload">
            <label htmlFor="project-image">Project Image</label>

            <input
              id="project-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Project preview"
                className="image-preview"
              />
            )}
          </div>

          <input
            type="text"
            name="technologies"
            placeholder="Technologies (HTML, CSS, React)"
            value={form.technologies}
            onChange={handleChange}
          />

          <input
            type="text"
            name="githubLink"
            placeholder="GitHub Link"
            value={form.githubLink}
            onChange={handleChange}
          />

          <input
            type="text"
            name="liveLink"
            placeholder="Live Demo Link"
            value={form.liveLink}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>

        <h2>My Projects</h2>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects available yet.</p>
        ) : (
          <div className="admin-projects-list">
            {projects.map((project) => (
              <div className="admin-project-item" key={project._id}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <button onClick={() => handleEdit(project)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(project._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <hr />

        <h2>
          {certificateEditingId ? "Edit Certificate" : "Add New Certificate"}
        </h2>

        <form
          onSubmit={handleCertificateSubmit}
          className="admin-project-form"
        >
          <input
            type="text"
            name="title"
            placeholder="Certificate Title"
            value={certificateForm.title}
            onChange={handleCertificateChange}
            required
          />

          <input
            type="text"
            name="issuer"
            placeholder="Issuing Organization"
            value={certificateForm.issuer}
            onChange={handleCertificateChange}
            required
          />

          <input
            type="text"
            name="issueDate"
            placeholder="Issue Date (e.g. June 2026)"
            value={certificateForm.issueDate}
            onChange={handleCertificateChange}
            required
          />

          <div className="image-upload">
            <label htmlFor="certificate-file">
              Certificate File (PDF or Image)
            </label>

            <input
              id="certificate-file"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              required={!certificateEditingId}
            />

            {filePreview && (
              <img
                src={filePreview}
                alt="Certificate preview"
                className="image-preview"
              />
            )}

            {selectedFile && selectedFile.type === "application/pdf" && (
              <p>Selected PDF: {selectedFile.name}</p>
            )}

            {certificateEditingId && !selectedFile && (
              <p>Leave file empty to keep the current certificate file.</p>
            )}
          </div>

          <button type="submit">
            {certificateEditingId
              ? "Update Certificate"
              : "Add Certificate"}
          </button>

          {certificateEditingId && (
            <button type="button" onClick={resetCertificateForm}>
              Cancel
            </button>
          )}
        </form>

        <h2>My Certificates</h2>

        {certificateLoading ? (
          <p>Loading certificates...</p>
        ) : certificates.length === 0 ? (
          <p>No certificates available yet.</p>
        ) : (
          <div className="admin-projects-list">
            {certificates.map((certificate) => (
              <div className="admin-project-item" key={certificate._id}>
                <h3>{certificate.title}</h3>
                <p>{certificate.issuer}</p>
                <p>{certificate.issueDate}</p>

                <a
                  href={getFileUrl(certificate.file)}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Certificate
                </a>

                <button
                  onClick={() => handleCertificateEdit(certificate)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleCertificateDelete(certificate._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="login-error">{error}</p>}
      </div>
    </section>
  );
};

export default AdminDashboard;
