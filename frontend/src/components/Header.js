import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  background-color: black;
  color: yellow;
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0.5rem;
  }
`;

const Logo = styled.img`
  height: auto;
  width: 5rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Nav = styled.nav`
  display: flex; /* Display the navigation links in a row */
  align-items: center; /* Align the links vertically */
`;

const NavLink = styled(Link)`
  color: yellow;
  text-decoration: none;
  padding: 0.5rem 1rem; /* Add padding to create button-like appearance */
  margin-right: 1rem; /* Add spacing between buttons */

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    font-size: 1rem; /* Adjust the font size for smaller screens */
    list-style-type: disc; /* Add bullet points for smaller screens */
    list-style-position: inside; /* Place bullet points inside the link area */
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Logo src="/swlogo.jpeg" alt="Star Wars Logo" />
      <Title>SithScribe</Title>
      <Nav>
        <NavLink to="/">Search</NavLink>
        <NavLink to="/notes">Notes</NavLink>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
