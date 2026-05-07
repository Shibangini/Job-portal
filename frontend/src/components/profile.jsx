import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Pen, Mail } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  
  const skills = user?.profile?.skills || [];
  const isResumeAvailable = !!user?.profile?.resume;

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(248,103,2,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf7_0%,_#ffffff_45%,_#f8fafc_100%)]'>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src={user?.profile?.profilePhoto || "https://www.siegelgale.com/app/uploads/2021/10/SGCOM_Blog_211018.png"} alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname || "Full Name"}</h1>
              <p>{user?.profile?.bio || "No bio added yet"}</p>
            </div>
          </div>
          <Button onClick= {() => setOpen(true)} className='text-right variant-outline'><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email || "No email"}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber || "No phone number"}</span>
          </div>
        </div>
        <div >
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>
            {
              skills.length > 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>No skills listed</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {isResumeAvailable ? (
            <a
              href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/user/profile/resume`}
              target="_blank"
              rel="noreferrer"
              className='text-blue-500 w-full hover:underline cursor-pointer'
            >
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span>No resume uploaded</span>
          )}
        </div>
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          <h1 className='text-lg font-bold my-5'>Applied Jobs</h1>
          {/* Applied Job Table */}
          <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
       
    </div>
  )
}

export default profile