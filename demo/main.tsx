import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { DashboardPage } from './DashboardPage';
import './global.css';

function Router() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (route.startsWith('#/dashboard')) {
    const params = new URLSearchParams(route.split('?')[1] || '');
    const theme = (params.get('theme') || 'default') as 'default' | 'ey' | 'light';
    return <DashboardPage initialTheme={theme} />;
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
