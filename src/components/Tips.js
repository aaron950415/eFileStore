import React from "react";
import { useStores } from "../stores";
import styled from 'styled-components'
const Tips = styled.div`
  background: orange;
  padding: 10px;
  margin: 30px 0;
  color: #fff;
  border-radius: 4px;
`;
const Component = ({ children }) => {
  const { UserStore } = useStores();
  return <>{UserStore.currentUser ? null : <Tips>{children}</Tips>}</>;
};

export default Component;
