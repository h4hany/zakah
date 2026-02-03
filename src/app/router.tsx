import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Calculator from './pages/Calculator';
import AppLayout from './components/AppLayout';

export function createStandaloneRouter() {
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
  ]);
}

