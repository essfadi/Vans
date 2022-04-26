import React from 'react';
import MyTable from '../components/Table/index';
import styled from 'styled-components';

const Dashboard = () => {
  return (
    <Container>
      <MyTable />
    </Container>
  )
}

export default Dashboard

const Container = styled.div`
  background-color: #3F88C5;
  width: 100vw;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;  