import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/login';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/companies';
import CompanyCreate from './components/admin/companyCreate';
import CompanySetup from './components/admin/companySetup';

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
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path:"/description/:id",
    element:<JobDescription />
  },
  // for admin
  {
    path: "/admin/companies",
    element:<Companies/>
  },
  {
    path: "/admin/companies/create",
    element:<CompanyCreate/>
  },
  {
    path: "/admin/companies/:id",
    element:<CompanySetup/>
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
