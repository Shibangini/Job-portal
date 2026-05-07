import { Badge } from './ui/badge'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'


const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/description/${job._id}`)} className='group h-full cursor-pointer rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition-transform hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(106,56,194,0.12)]'>
            <div className='flex items-start justify-between gap-4'>
                <div>
                    <p className='text-sm font-semibold text-[#6A38C2]'>{job?.company?.name}</p>
                    <p className='mt-1 text-sm text-slate-500'>{job?.location || 'India'}</p>
                </div>
                <span className='rounded-full bg-[#ede9fe] p-2 text-[#6A38C2] transition group-hover:translate-x-1 group-hover:-translate-y-1'>
                    <ArrowUpRight className='h-4 w-4' />
                </span>
            </div>
            <div className='mt-4'>
                <h1 className='text-lg font-bold text-slate-900'>{job?.title}</h1>
                <p className='mt-2 line-clamp-3 text-sm leading-6 text-slate-600'>{job?.description}</p>
            </div>
            <div className='mt-5 flex flex-wrap items-center gap-2'>
                <Badge className={'rounded-full bg-blue-50 px-3 py-1 text-blue-700 font-bold'} variant='ghost'>{job?.position} Positions</Badge>
                <Badge className={'rounded-full bg-orange-50 px-3 py-1 text-[#F83002] font-bold'} variant='ghost'>{job?.jobType || 'Full Time'}</Badge>
                <Badge className={'rounded-full bg-violet-50 px-3 py-1 text-[#7209b7] font-bold'} variant='ghost'>{job?.salary}</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards