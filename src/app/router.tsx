import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ExcelMode from './pages/ExcelMode';
import FormMode from './pages/FormMode';
import AppLayout from './components/AppLayout';

export function createStandaloneRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/excel',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <ExcelMode />,
        },
      ],
    },
    {
      path: '/form',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <FormMode />,
        },
      ],
    },
  ]);
}

