import './Header.css';
import logo from '../../imgs/logo.png'
import {Link} from 'react-router-dom';

function Header() {
  return (
    <header>
        <nav className="navbar-container">
            <div className="left-side">
              <Link to="/covcharts"><img src={logo} className="logo"/></Link >
              <Link to="/covcharts"><h3>CovBoard</h3></Link >
              <Link to="/map"><h3>Map</h3></Link >
              <Link to="/charts" ><h3>Charts</h3></Link >
            </div>
            <div className="right-side">
                <button className="coffee-button">
                  <a href="https://www.buymeacoffee.com/mohammedakel" target="_blank">
                    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" className="coffee-img" >
                    </img>
                  </a>
                </button>
            </div>  
        </nav>
    </header>
  );
}

export default Header;
