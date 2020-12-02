import React from 'react';
import { AuthProvider } from './auth';
import { BrandProvider } from './brand';
import { CategoryProvider } from './categories';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CategoryProvider>
          <BrandProvider>{children}</BrandProvider>
        </CategoryProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default AppProvider;
