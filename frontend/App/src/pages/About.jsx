
import { useState } from 'react'

const About = () => {
  const [selectedInfo, setSelectedInfo] = useState(null)

  const info = [
    {
      title: 'Education',
      description: 'Computer Engineering',
      details:
        'I am a Computer Engineering graduate with an interest in software development and modern web technologies.',
      icon: '🎓',
    },
    {
      title: 'Specialization',
      description: 'Full Stack MERN Developer',
      details:
        'I enjoy building web applications using MongoDB, Express.js, React, and Node.js.',
      icon: '💻',
    },
    {
      title: 'Interests',
      description: 'Building Web Applications',
      details:
        'I enjoy learning new technologies, improving my coding skills, and creating useful web experiences.',
      icon: '✨',
    },
  ]

  return (
    <section className="about-section">
      <div className="container">
        <p className="about-greeting">GET TO KNOW ME</p>

        <h1>
          About <span>Me</span>
        </h1>

        <p className="about-description">
          I'm a Computer Engineering graduate and a Full Stack MERN developer.
          I enjoy building web applications and learning new technologies.
        </p>

        <div className="about-card">
          {info.map((item) => (
            <button
              className="about-item"
              key={item.title}
              onClick={() => setSelectedInfo(item)}
            >
              <span className="about-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="about-learn-more">Learn more ↗</span>
            </button>
          ))}
        </div>

        {selectedInfo && (
          <div
            className="popup-overlay"
            onClick={() => setSelectedInfo(null)}
          >
            <div
              className="popup-content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="popup-close"
                onClick={() => setSelectedInfo(null)}
                aria-label="Close popup"
              >
                ×
              </button>

              <span className="popup-icon">{selectedInfo.icon}</span>

              <h2 id="popup-title">{selectedInfo.title}</h2>

              <h3>{selectedInfo.description}</h3>

              <p>{selectedInfo.details}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
