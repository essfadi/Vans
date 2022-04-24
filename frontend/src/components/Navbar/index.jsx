import {useState} from 'react'
import Logo from "../../assets/logo.png";
import {Nav, Bars, NavMenu, NavBtn, NavBtnLink, NavBrand, NavLink, LogoutButton} from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, reset } from '../../features/users/usersSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {user, isAuthenticated} = useSelector(state => state.user);


    const toggleHandler = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };
    const onLogout = () => {
        dispatch(logoutUser());
        dispatch(reset());
        navigate("/");
      };
    const buttonsHandler = (e) => {
        if (e) {
            return (
                <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
            )
        } else {
           return ( <>
            <NavBtnLink to="/login">Login</NavBtnLink>
            <NavBtnLink to="/signup">Sign Up</NavBtnLink>
            </>)
        }
    }
  return (
    <Nav>
        <NavLink to="/">
            <NavBrand src={Logo} alt="It is our logo"/>
        </NavLink>
        <Bars onClick={toggleHandler}/>
       <NavMenu toggle={isOpen}>
            <NavLink to="/" activeStyle>Home</NavLink>
            {isAuthenticated? <NavLink to={`/dashboard/${user? user.id: ''}`}>Dashboard</NavLink>: ''}
            <NavLink to="/about" >About US</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
        </NavMenu>
        <NavBtn toggle={isOpen}>
            {buttonsHandler(isAuthenticated)}
        </NavBtn>
    </Nav>
)
  }

export default Navbar;
