import logo from "../images/logo.png";

const NavigationBar = () => {
    return <header className="Header-navigation">
        <nav className="navbar navbar-expand-lg bg-body-tertiary" id="my-navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src={logo} width={30} height={30}></img></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Create Post</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Pet Care Tips</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    </header>
};

export default NavigationBar;