import {createGlobalStyle} from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing:border-box;
  }
  /**remove a borda azul ao receber o foco */
  *:focus{
    outline:0
  }
  html,body,#root{
    height:100%;
  }
  body{
    -webkit-font-smoothing:antialiased !important;
  }
  body,input,button{
   font: 14px 'Roboto', sans-serif;
  }
  /**resentando configuracoes */
  a {
    text-decoration:none;
  }
  ul {
    list-style:none
  }
  button{
    cursor: pointer;
  }

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

  .disableInput {
    background: #ddd;
    color: #000;
  }

`;
