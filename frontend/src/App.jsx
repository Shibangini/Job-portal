import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/login';
import Jobs from './components/Jobs';

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
  {
    path: '/jobs',
    element: <Jobs />
  }
]);

function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
