import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Home from '@/app/pages/Home';
import ExcelMode from '@/app/pages/ExcelMode';
import FormMode from '@/app/pages/FormMode';
import AppLayout from '@/app/components/AppLayout';

export function createRouter() {
  return createMemoryRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'excel',
          element: <ExcelMode />,
        },
        {
          path: 'form',
          element: <FormMode />,
        },
      ],
    },
  ], {
    initialEntries: ['/'],
  });
}

