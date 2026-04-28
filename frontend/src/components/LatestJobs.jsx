import React from 'react'
import { useSelector } from 'react-redux'
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
    const jobs = useSelector(store => store.job?.jobs || []);
    const uniqueJobs = React.useMemo(() => {
        const map = new Map();
        for (const j of jobs) {
            if (j && j._id) map.set(j._id, j);
        }
        return Array.from(map.values());
    }, [jobs]);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-2'>
                {
                    (!uniqueJobs || uniqueJobs.length === 0)
                        ? <span>No jobs available</span>
                        : uniqueJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs