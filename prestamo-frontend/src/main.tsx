import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react'
import theme from './theme/theme.ts'
import { CssBaseline } from '@mui/material'
import { Provider } from "react-redux";
import { persistor, store } from './store/index.ts'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <App />
      </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
