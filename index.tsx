import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
// import Demo from './demo';
import PermissionMatrix from './permission.demo';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <PermissionMatrix />
    </StyledEngineProvider>
  </React.StrictMode>
);
