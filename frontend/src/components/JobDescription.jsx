import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'


const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const {singleJob}=useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);

    // Check if user already applied by looking for their ID in applications array
    const isApplied = singleJob?.applications?.some(app => {
        const appId = typeof app === 'string' ? app : app?.applicantId || app?._id;
        return appId === user?._id;
    });

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
                if (res.data.success) {
                    console.log('Fetched jobs count:', Array.isArray(res.data.jobs) ? res.data.jobs.length : 0);
                    console.log('Fetched job ids:', res.data.jobs?.map(j => j._id));
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }  
        }
        fetchSingleJob();
    },[jobId, dispatch, user?._id]);


    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-xl font-bold'>{singleJob?.title }</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant='ghost'>{singleJob?.positions }</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant='ghost'>{singleJob?.jobType }</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>{singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5c007a]'} font-bold text-white`}>
                    {isApplied ? 'Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location }</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0] }</span></h1>
            </div>
        </div>
    )
}

export default JobDescription