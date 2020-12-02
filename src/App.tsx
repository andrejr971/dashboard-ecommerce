import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks';

import Routes from './routes';
import GlobalStyles from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
