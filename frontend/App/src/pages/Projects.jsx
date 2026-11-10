
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ProjectPreview = ({ image, title }) => {
  return (
    <div className="project-preview">
      <div className="preview-topbar">
        <div className="preview-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="preview-address"></div>
      </div>

      {image ? (
        <img
          src={image.startsWith("http") ? image : `${API_URL}${image}`}
          alt={title}
          className="project-image"
        />
      ) : (
        <div className="preview-content">
          <h3>{title}</h3>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load projects. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="projects-heading">
          <span className="projects-eyebrow">MY WORK</span>

          <h1>
            My <span>Projects</span>
          </h1>

          <p>
            A collection of projects I've built while learning and improving my
            development skills.
          </p>
        </div>

        {loading && <p>Loading projects...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && projects.length === 0 && (
          <p>No projects available yet.</p>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project._id}>
                <ProjectPreview image={project.image} title={project.title} />

                <div className="project-info">
                  <span className="project-number">PROJECT</span>

                  <h2>{project.title}</h2>

                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((technology, index) => (
                      <span key={index}>{technology}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.githubLink && (
                      <a
                        className="project-demo-button"
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        className="project-demo-button"
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
