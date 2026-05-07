import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSavedJob } from '@/redux/jobSlice'
import { toast } from 'sonner'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { savedJobs = [] } = useSelector((store) => store.job || {});

    const isSaved = Array.isArray(savedJobs) && savedJobs.some((savedJob) => savedJob?._id === job?._id);

    const saveToggleHandler = () => {
        const message = isSaved ? 'Removed from saved jobs' : 'Job saved for later';
        dispatch(toggleSavedJob(job));
        toast.success(message);
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = Math.abs(currentTime - createdAt);
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    return (
        <div className='h-full min-h-[360px] p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transform transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-105 flex flex-col'>
            <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button
                    variant="outline"
                    className={`rounded-full ${isSaved ? 'bg-violet-50 border-violet-300 text-violet-700' : ''}`}
                    size="icon"
                    onClick={saveToggleHandler}
                >
                    <Bookmark className={isSaved ? 'fill-current' : ''} />
                </Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo || "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"}></AvatarImage>
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>
                        India
                    </p>
                </div>
            </div>
            <div className='min-h-[110px]'>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p
                    className='text-sm text-gray-600 overflow-hidden'
                    style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                >
                    {job?.description}
                </p>

            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant='ghost'>{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant='ghost'>{job?.jobType || 'Full Time'}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>{job?.salary}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-auto pt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button
                    onClick={saveToggleHandler}
                    className={isSaved ? 'bg-violet-100 text-violet-800 hover:bg-violet-200' : 'bg-[#7209b7] text-white hover:bg-[#5c007a]'}
                >
                    {isSaved ? 'Saved' : 'Save for later'}
                </Button>
            </div>
        </div>
    )
}

export default Job