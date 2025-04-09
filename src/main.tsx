import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.tsx'
import { TOCProvider } from './components/contexts/TOCContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TOCProvider>
      <App />
    </TOCProvider>
  </StrictMode>,
)
