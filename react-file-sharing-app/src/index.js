import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ThemeProvider } from '@mui/material/styles'; // Material-UI theming
import theme from './styles/theme'; // Custom theme
import ErrorBoundary from './components/ErrorBoundary'; // Optional: Error Boundary

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
);
