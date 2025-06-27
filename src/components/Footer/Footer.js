import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
  return (
    <div className="FooterContainer">
      <div className="socialmedia">
        <Link to="https://www.linkedin.com/in/madhu-gowthami-337419314/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="uparrow twitter" />
        </Link>
        <Link to="https://github.com/Gowthami17-M/Timer_Stopwatch.git" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className="uparrow github" />
        </Link>
      </div>

      <hr />

      <p className="footer_text">Copyright © 2025 Madhu Gowthami. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
