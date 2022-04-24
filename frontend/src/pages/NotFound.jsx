import React from 'react'
import NotFoundImage from '../assets/NotFoundVan.png'
import { NavLink as Link} from 'react-router-dom'
import styled from 'styled-components'

const NotFound = () => {
  return (
    <div style={{textAlign: 'center', padding: '2rem'}}>
        <img src={NotFoundImage} alt="Not Found" />
        <p style={{margin: '2rem'}}> Go Back To Home Page</p>
        <NavBtnLink to="/"> Home </NavBtnLink>
    </div>
  )
}

export default NotFound;

export const NavBtnLink = styled(Link)`
  text-decoration: none;
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 72px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;