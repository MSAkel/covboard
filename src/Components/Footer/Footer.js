import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div>
          <a href="https://www.mohammedakel.com/">
            <p>By Mohammed Akel</p>
          </a>
        </div>
        <div className="social-media-links">
          <a href="https://www.linkedin.com/in/makel/">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/MSAkel">
            <GitHubIcon />
          </a>
          <a href="https://twitter.com/M_Akel93">
            <TwitterIcon />
          </a>
          <a href="https://www.instagram.com/aklitoo/">
            <InstagramIcon />
          </a>
        </div>
        <div className="sources">
          <p>Sources:</p>
          <a href="https://cov19.cc/"><p>COV19</p></a>
          <p>|</p>
          <a href="https://www.cdc.gov/"><p>CDC</p></a>
          <p>|</p>
          <a href="https://www.who.int/"><p>WHO</p></a>
        </div>
      </div>      
    </footer>
  );
}

export default Footer;
