import { createGlobalStyle } from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

export default createGlobalStyle`
:root {
    --background: #d5d5d5;
    --orange: #ffd984;
    --orange-dark: #ffbf5a;
    --primary: #1b1b1b;
    --gray: #838383;
    --gray-light: #a3a6b3;
    --gray-dark: #070707;
    --blue: #80e4ed;
    --green: #80ebff;
    --red: #ff5983;
    --white: #fff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    min-height: 100%;
    background: var(--background);
  }

  *, button, input {
    border: 0;
    background: none;
    font-family: 'Roboto', sans-serif;
    font-size: 17px;
  }

  body {
    color: var(--primary);
  }

  ul {
    list-style: none;
  }
  
  button {
    cursor: pointer;
  }
`;
