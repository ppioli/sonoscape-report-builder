import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/renderer/components/ThemeProvider';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <App />
  </ThemeProvider>
);
