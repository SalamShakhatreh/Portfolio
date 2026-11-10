
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post(
        `${API_URL}/api/contact`,
        form
      );

      setStatus(response.data.message);

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      setStatus(
        error.response?.data?.message || "Failed to send your message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-header">
        <span className="contact-label">GET IN TOUCH</span>
        <h1>
          Let's <span>Connect</span>
        </h1>
        <p>
          Have a project in mind or just want to say hello?
          I'd love to hear from you!
        </p>
      </div>

      <div className="contact-card">
        <div className="contact-info">
          <h2>Let's talk about your ideas</h2>
          <p>
            I'm always excited to learn, collaborate, and
            create something meaningful. Feel free to leave
            me a message.
          </p>

          <div className="contact-detail">
            <a
              href="mailto:salam.mustafa.shakhatreh@gmail.com"
              className="contact-icon"
              aria-label="Send me an email"
              title="Send me an email"
            >
              ✉
            </a>
            <div>
              <h3>Email</h3>
              <p>Feel free to reach out anytime</p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-icon">✦</span>
            <div>
              <h3>Let's Collaborate</h3>
              <p>Ideas, projects, and new opportunities</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-input-group">
            <label htmlFor="contact-name">Your Name</label>
            <input
              type="text"
              id="contact-name"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-input-group">
            <label htmlFor="contact-email">Your Email</label>
            <input
              type="email"
              id="contact-email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-input-group">
            <label htmlFor="contact-message">Your Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message here..."
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          {status && <p className="contact-status">{status}</p>}

          <button
            type="submit"
            className="contact-submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
            <span>↗</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
