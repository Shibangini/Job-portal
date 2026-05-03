import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import AdminJobsTable from './adminjobsTable'
import { useDispatch } from 'react-redux'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const adminjobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobByText(input));

  }, [input, dispatch]);
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className='w-fit'
            placeholder='Filter by name, role'
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className='bg-black text-white hover:bg-black/80' onClick={() => navigate('/admin/jobs/create')}>
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default adminjobs