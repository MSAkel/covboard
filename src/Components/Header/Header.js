import './Header.css';

function Header() {
  return (
    <header>
        <nav className="navbar-container">
            <div className="left-side">
                <p>CovBoard</p>
            </div>
            <div className="right-side">
                <p>Other 1</p>
                <p>Other 2</p>
            </div>  
        </nav>
    </header>
  );
}

export default Header;
