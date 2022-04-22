import {useState} from 'react'
import Logo from "../../assets/logo.png";
import {Nav, Bars, NavMenu, NavBtn, NavBtnLink, NavBrand, NavLink} from "./Navbar";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleHandler = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };
  return (
    <Nav>
        <NavLink to="/">
            <NavBrand src={Logo} alt="It is our logo"/>
        </NavLink>
        <Bars onClick={toggleHandler}/>
       <NavMenu toggle={isOpen}>
            <NavLink to="/" activestyle>Home</NavLink>
            <NavLink to={`/dashboard/${404}`}>Dashboard</NavLink>
            <NavLink to="/about" >About US</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
        </NavMenu>
        <NavBtn toggle={isOpen}>
            <NavBtnLink to="/login">Login</NavBtnLink>
            <NavBtnLink to="/signup">Sign Up</NavBtnLink>
        </NavBtn>
    </Nav>
)
  }

export default Navbar;
