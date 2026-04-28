import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const Jobs = () => {
    useGetAllJobs();
    const jobs = useSelector((store) => store.job?.jobs || [])
    // Deduplicate by _id in case the server returns duplicates or multiple fetches occurred
    const uniqueJobs = React.useMemo(() => {
        const map = new Map();
        for (const j of jobs) {
            if (j && j._id) map.set(j._id, j);
        }
        const result = Array.from(map.values());
        if (result.length !== jobs.length) {
            console.warn('Duplicate jobs removed. before:', jobs.length, 'after:', result.length);
        }
        return result;
    }, [jobs]);

    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    {/* sidebar / filters - reduce width */}
                    <aside className='w-1/6 md:w-1/5'>
                        <FilterCard />
                    </aside>

                    {/* job list */}
                    <main className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {uniqueJobs.length === 0 ? (
                            <span>Job not Found</span>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                {uniqueJobs.map((job) => (
                                    <div key={job?._id} className='p-4'>
                                        <Job job={job} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Jobs