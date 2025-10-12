import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LogIn } from 'lucide-react';
import Home from './components/Home';
import Signup from './components/auth/Signup';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
