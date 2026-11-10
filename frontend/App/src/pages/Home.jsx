
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home-section">
      <div className="home-content">
        <span className="home-label">WELCOME TO MY PORTFOLIO</span>

        <h1>
          Hi, I'm <span>Salam Shakhatreh</span>
          <span className="home-role">Full Stack Developer</span>
        </h1>

        <p className="home-description">
          I build modern, responsive, and user-friendly web applications. I'm
          passionate about learning new technologies and turning ideas into
          reality through code.
        </p>

        <div className="home-buttons">
          <Link to="/projects" className="home-btn primary-btn">
            View My Projects <span>↗</span>
          </Link>
        </div>

        <div className="home-skills">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>React</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>MongoDB</span>
          <span>Bootstrap</span>
        </div>
      </div>

      <div className="home-visual">
        <div className="home-glow"></div>

        <div className="code-card">
          <div className="code-card-header">
            <div className="code-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>developer.jsx</span>
          </div>

          <div className="code-card-body">
            <p>
              <span className="code-purple">const</span> developer = {"{"}
            </p>

            <p className="code-indent">
              name: <span className="code-green">"Salam Shakhatreh"</span>,
            </p>

            <p className="code-indent">
              focus: <span className="code-green">"Web Development"</span>,
            </p>

            <p className="code-indent">
              approach: <span className="code-green">"Building Practical Projects"</span>
            </p>

            <p>{"};"}</p>

            <p className="code-comment">
              // Turning ideas into meaningful experiences ✨
            </p>
          </div>
        </div>

        <div className="floating-badge">
          <span>✦</span> Creative Developer
        </div>
      </div>
    </section>
  );
};

export default Home;
