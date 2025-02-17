import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Wardrobify</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shoes">Shoes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shoes/new">Add shoes</NavLink>
            </li>
              <li className="nav-item-dropdown"> 
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Hats</a>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to="/hats">Hat List</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/hats/new/">Add Hat</NavLink></li>
                  </ul>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
