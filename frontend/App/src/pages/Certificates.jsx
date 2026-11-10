
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/certificates`
        );

        setCertificates(response.data);
      } catch (error) {
        setError("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section className="certificates-section" id="certificates">
      <div className="certificates-container">
        <h2>My Certificates</h2>

        <p className="certificates-description">
          My achievements and certifications.
        </p>

        {loading ? (
          <p>Loading certificates...</p>
        ) : error ? (
          <p>{error}</p>
        ) : certificates.length === 0 ? (
          <p>No certificates available yet.</p>
        ) : (
          <div className="certificates-grid">
            {certificates.map((certificate) => (
              <div className="certificate-card" key={certificate._id}>
                <h3>{certificate.title}</h3>

                <p>{certificate.issuer}</p>

                <p>{certificate.issueDate}</p>

                <a
                  href={
                    certificate.file.startsWith("http")
                      ? certificate.file
                      : `${API_URL}${certificate.file}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="certificate-view-btn"
                >
                  View Certificate
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
