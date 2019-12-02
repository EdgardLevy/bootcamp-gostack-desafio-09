import styled from 'styled-components';

export const Container = styled.div`
  background: blue;
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    padding: 30px;
    justify-content: space-between;

    strong {
      color: #fff;
      font-size: 24px;
    }

    button {
      padding: 5px;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      color: #fff;
      background: #ee4d64;
      font-weight: bold;
    }
  }
`;
