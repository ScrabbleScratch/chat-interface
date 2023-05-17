import "./NavBar.css";

type NavBarProps = object;

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <div id="nav-bar">
            <img id="title-logo" src="https://static-00.iconduck.com/assets.00/placeholder-icon-369x512-yy0egg4a.png" alt="logo" />
            <p id="title">CHAT WEB APP</p>
        </div>
    );
};

export default NavBar;