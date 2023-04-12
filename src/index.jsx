import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import App from './app';
import theme from './theme';
import AppStore from './store';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';

// Fonts
import '@fontsource/karla/200.css';
import '@fontsource/karla/300.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/500.css';
import '@fontsource/karla/600.css';
import '@fontsource/karla/700.css';
import '@fontsource/karla/800.css';

const { store, persistor } = AppStore;

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
