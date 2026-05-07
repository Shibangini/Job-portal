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
    <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(248,103,2,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf7_0%,_#ffffff_45%,_#f8fafc_100%)]'>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className='w-fit bg-white shadow-sm border-gray-200'
            placeholder='Filter by name, role'
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className='bg-black text-white hover:bg-black/80' onClick={() => navigate('/admin/jobs/create')}>
            New Jobs
          </Button>
        </div>
        <div className='rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60'>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default adminjobs