import './Header.css';
import logo from '../../imgs/logo.png'

function Header() {
  return (
    <header>
        <nav className="navbar-container">
            <div className="left-side">
                <img src={logo} />
                <h3>CovBoard</h3>
            </div>
            <div className="right-side">
                <button className="coffee-button">
                  <a href="https://www.buymeacoffee.com/mohammedakel" target="_blank">
                    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" className="coffee-img" >
                    </img>
                  </a>
                </button>
                {/* <p>Other 2</p> */}
            </div>  
        </nav>
    </header>
  );
}

export default Header;
