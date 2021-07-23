import React from "react";
import LogoUrl from "./logo.svg";
import{NavLink} from "react-router-dom"
import styled from "styled-components"

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101f;
  color: #fff;
`;

const Logo = styled.img`
  height: 30px;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;

  &.active {
    border-bottom: 1px solid #fff;
  }
`;


const Login = styled.div`
  margin-left: auto;
`;

const Button = styled.button`
  margin-left: 10px;
`;

function Component(){
    return (
        <Header>
        <Logo src={LogoUrl}/>
        <nav>
        <StyledLink to="/" activeClassName="active" exact>Home page</StyledLink>
        <StyledLink to="/history" activeClassName="active">Upload history</StyledLink>
        <StyledLink to="/about" activeClassName="active">About me</StyledLink>
        </nav>
        </Header>

    );
}

export default Component;