import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Calculator from './pages/Calculator';
import AppLayout from './components/AppLayout';

// Handle SPA redirect from 404.html
// The 404.html redirects paths to query string format: /?/path
function handleSPARedirect() {
  const search = window.location.search;
  // Check if this is a redirect from 404.html (format: /?/path)
  if (search.startsWith('?/')) {
    // Extract the path from query string
    // Format: /repo-name/?/calculator&other=params#hash
    const pathAndQuery = search.slice(2); // Remove '?/'
    const parts = pathAndQuery.split('&');
    const path = parts[0].replace(/~and~/g, '&');
    
    // Reconstruct query string from remaining parts (before hash)
    const queryParts = parts.slice(1)
      .map(p => p.split('#')[0]) // Remove hash from query parts
      .filter(p => p.length > 0)
      .map(p => p.replace(/~and~/g, '&'));
    const queryString = queryParts.length > 0 ? '?' + queryParts.join('&') : '';
    
    // Get hash if present (from original URL or query string)
    const hash = window.location.hash || (pathAndQuery.includes('#') 
      ? '#' + pathAndQuery.split('#').slice(1).join('#') 
      : '');
    
    // Build new URL - keep the current pathname base and append the extracted path
    const currentPath = window.location.pathname;
    // If path starts with /, it's absolute, otherwise append to current path
    const newPath = path.startsWith('/') 
      ? currentPath.split('/').slice(0, -1).join('/') + path
      : currentPath + (currentPath.endsWith('/') ? '' : '/') + path;
    
    const finalUrl = newPath + queryString + hash;
    
    // Replace URL without reloading (React Router will handle navigation)
    window.history.replaceState({}, '', finalUrl);
  }
}

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
  // Handle SPA redirect from 404.html before setting up router
  handleSPARedirect();
  
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

