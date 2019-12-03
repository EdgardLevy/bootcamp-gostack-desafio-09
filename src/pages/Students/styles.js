import styled from 'styled-components';
import {darken} from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;

  header {
    display: flex;
    padding: 15px 0;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    div {
      display: flex;
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
        th {
          text-align: left;
          font-weight: bold;
        }
      }
    }

    tr {
      height: 40px;
      & + tr {
        td {
          border-top: 1px solid #eee;
        }
      }
    }
  }
`;
