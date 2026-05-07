import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/login';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/profile';
import JobDescription from './components/JobDescription';
import SavedJobs from './components/SavedJobs';
import Companies from './components/admin/companies';
import CompanyCreate from './components/admin/companyCreate';
import CompanySetup from './components/admin/companySetup';
import Adminjobs from './components/admin/adminjobs';
import PostJobs from './components/admin/PostJobs';
import Applicants from './components/admin/Applicants';
import RecruiterDashboard from './components/admin/RecruiterDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/recruiter/dashboard',
    element: <ProtectedRoute><RecruiterDashboard /></ProtectedRoute>
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
    path: '/saved-jobs',
    element: <SavedJobs />
  },
  {
    path:"/description/:id",
    element:<JobDescription />
  },
  // for admin
  {
    path: "/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element:<ProtectedRoute><Adminjobs/></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element:<ProtectedRoute><PostJobs/></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
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
