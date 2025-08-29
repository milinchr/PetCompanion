import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    return <header className="Header-navigation">
        <nav className="navbar navbar-expand-lg bg-body-tertiary" id="my-navbar">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={logo} width={30} height={30}></img></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Create Post</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Pet Care Tips</Link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    </header>
};

export default NavigationBar;