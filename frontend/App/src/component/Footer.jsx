import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer-name">Salam Shakhatreh</h3>

      <p className="footer-role">Full Stack Developer</p>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Salam Shakhatreh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;