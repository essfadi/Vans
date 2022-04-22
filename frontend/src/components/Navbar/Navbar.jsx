import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import {FaBars} from "react-icons/fa";


export const Nav = styled.nav`
    background: rgba(28, 49, 68, 0.7);    
    height: 80px;
    min-width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
    z-index: 1000;
    @media screen and (max-width: 768px) {
      background: rgba(28, 49, 68, 1);
      justify-content: center;
      position: relative;
    }
`;

export const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding: 0rem 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`
export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 2rem;
    cursor: pointer;
  }
`
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    ${prop => {
    if (prop.toggle) {
      return `
      margin: 0;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      top: 80px;
      width: 100%;
      min-height: 60vh;
      padding: 2rem;
      background: #1C3144;
      `;

    } else {
      return `
      display: none;
      `
    }
    }}
  }
`;

export const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
  @media screen and (max-width: 768px) {
    ${prop => {
    if (prop.toggle) {
      return `
      margin: 0;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      top: 67vh;
      min-height: 30vh;
      max-height: 50vh;
      width: 100%;
      padding: 2rem;
      background: #1C3144;

      `;

    } else {
      return `
      display: none;
      `
    }
    }}
  }
`;

export const NavBtnLink = styled(Link)`
  text-decoration: none;
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 72px;
  color: #fff;
  border: none;
  outline: none;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;


export const NavBrand = styled.img`
  width: 100px;
  height: 100px;
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;