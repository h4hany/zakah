import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Calculator from './pages/Calculator';
import AppLayout from './components/AppLayout';

// Detect base path for GitHub Pages
// GitHub Pages serves from /REPO_NAME/ so we need to extract that
function getBasePath() {
  // In development or root domain, no base path
  if (window.location.hostname === 'localhost' || window.location.pathname === '/') {
    return '/';
  }
  
  const pathname = window.location.pathname;
  // Extract the base path (e.g., '/zakah' from '/zakah/' or '/zakah/calculator')
  // Split by '/' and get the first non-empty part (repository name)
  const parts = pathname.split('/').filter(Boolean);
  
  if (parts.length > 0) {
    // Return the repository name as base path
    // This handles cases like '/zakah/', '/zakah/calculator', etc.
    return `/${parts[0]}`;
  }
  
  return '/';
}

export function createStandaloneRouter() {
  const basename = getBasePath();
  
  // Log for debugging (remove in production if needed)
  if (process.env.NODE_ENV === 'development') {
    console.log('Router basename:', basename, 'Current pathname:', window.location.pathname);
  }
  
  return createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/calculator',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Calculator />,
        },
      ],
    },
  ], {
    basename,
  });
}

