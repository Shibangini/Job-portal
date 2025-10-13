import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/login';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />, // Use the Login component, not the icon
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
