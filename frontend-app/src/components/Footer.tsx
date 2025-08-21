import React from "react";
import github from '../assets/github-logo_icon-icons.com_73546.svg';
import linkedin from '../assets/in_linked_linkedin_media_social_icon_124259.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <p>Professional portfolio</p>
      </div>
      
      <div className="footer-container">
        <div className="footer-icons">
          <img src={github} alt="GitHub logo" />
          <a href="https://github.com/Rodri0701" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <img src={linkedin} alt="LinkedIn logo" />
          <a href="https://www.linkedin.com/in/rodrigo-guadalupe-esparza-palos-68436a269/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>

        <div className="footer-bottom">
          <a href="https://bigdevsoon.me" target="_blank" rel="noopener noreferrer">
            Project by BigDevSoon
          </a>
          <span> | Built with ❤️ by Rodri0701</span>
        </div>
      </div>
    </footer>
  );
}
