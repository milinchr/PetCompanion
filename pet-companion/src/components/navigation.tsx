import logo from "../images/logo.png";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./logout-button";
import { useAuth } from "./auth-context";

const NavigationBar = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const getNavLinkClass = (path: string) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <header className="Header-navigation">
      {/* Change to small letter (H -> h)  */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary" id="my-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} width={30} height={30} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={getNavLinkClass("/")}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={getNavLinkClass("/create-post")}
                  to="/create-post"
                >
                  Create a Post
                </Link>
              </li>
              <li className="nav-item">
                <Link className={getNavLinkClass("/pet-tips")} to="/tips">
                  Care Tips
                </Link>
              </li>
              <li className="nav-item">
                <Link className={getNavLinkClass("/create-tips")} to="/create-tips">
                  Create Tips
                </Link>
              </li>
            </ul>

            {isLoggedIn && (
              <div className="d-flex align-items-center">
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
