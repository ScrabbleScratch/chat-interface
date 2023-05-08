import "./NavBar.css";

type NavBarProps = object;

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <div id="nav-bar">
            <p id="title">CHAT WEB APP</p>
        </div>
    );
};

export default NavBar;