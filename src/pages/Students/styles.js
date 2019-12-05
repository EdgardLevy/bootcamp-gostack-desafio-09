import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  header {
    display: flex;
    padding: 15px 0;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    aside {
      display: flex;
    }

    input {
      margin-left: 5px;
    }
  }

  table {
    border-radius: 4px;
    width: 100%;

    padding: 30px;
    background: #fff;
    line-height: 20px;
    font-size: 16px;
    .center {
      text-align: center;
    }
    .edit {
      color: blue;
    }
    .delete {
      color: red;
    }

    thead {
      tr {
        color: #444;
        th {
          text-align: left;
          font-weight: bold;
        }
      }
    }

    tr {
      height: 40px;
      color: #666;
      & + tr {
        td {
          border-top: 1px solid #eee;
        }
      }
    }
  }
`;
