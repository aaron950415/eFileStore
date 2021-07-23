import React from "react";
import LogoUrl from "./logo.svg";
import { NavLink,useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";
import { useStores } from "../stores";
import { observer } from "mobx-react";

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

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const Component=observer(() =>{
  const { UserStore, AuthStore } = useStores();
  const history=useHistory();
  const handleOut = () => {
    AuthStore.logout();
    history.push("/login")
  };
  const handleRegister = () => {
    history.push("/register")
  };
  const handleLogin = () => {
    history.push("/login")
  };
  return (
    <Header>
      <Logo src={LogoUrl} />
      <nav>
        <StyledLink to="/" activeClassName="active" exact>
          Home page
        </StyledLink>
        <StyledLink to="/history" activeClassName="active">
          Upload history
        </StyledLink>
        <StyledLink to="/about" activeClassName="active">
          About me
        </StyledLink>
      </nav>
      <Login>
        {UserStore.currentUser ? 
          <>
            {UserStore.currentUser.attributes.username}
            <StyledButton type="primary" onClick={handleOut}>
              Logout
            </StyledButton>
          </>
         : <>
          <StyledButton type="primary" onClick={handleLogin}>
            Login
          </StyledButton>
        
        <StyledButton type="primary" onClick={handleRegister}>
          Register
        </StyledButton></>
        }
      </Login>
    </Header>
  );
})

export default Component;
