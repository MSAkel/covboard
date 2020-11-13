import './Header.css';
import logo from '../../imgs/logo.png'
import {NavLink} from 'react-router-dom';

function Header() {
  return (
    <header>
        <nav className="navbar-container">
            <div className="left-side">
              <NavLink to="/covcharts"><img src={logo} className="logo" alt="logo"/></NavLink >
              <NavLink to="/covcharts"><p>Dashboard</p></NavLink >
              <NavLink to="/map"><p>Map</p></NavLink >
              <NavLink to="/charts" ><p>Charts</p></NavLink >
            </div>
            <div className="right-side">
                <button className="coffee-button">
                  <a href="https://www.buymeacoffee.com/mohammedakel" target="_blank" rel="noreferrer">
                    <img src="https://cdn.buymeacoffee.com/buttons/v2/lato-blue.png" alt="Buy Me A Coffee" className="coffee-img" >
                    </img>
                  </a>
                </button>
            </div>  
        </nav>
    </header>
  );
}

export default Header;
