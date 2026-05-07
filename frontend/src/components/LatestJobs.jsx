import React from 'react'
import { useSelector } from 'react-redux'
import LatestJobCards from './LatestJobCards';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        <div className='mx-auto max-w-7xl px-4 py-20 md:px-6'>
            <div className='mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
                <div>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-[#6A38C2]'>Latest jobs</p>
                    <h1 className='mt-2 text-3xl font-black text-slate-900 md:text-4xl'><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
                    <p className='mt-2 max-w-2xl text-sm text-slate-500'>Fresh openings from companies actively hiring right now.</p>
                </div>
                <Link to='/jobs' className='inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#6A38C2] hover:text-[#6A38C2]'>
                    View all jobs
                </Link>
            </div>
            <motion.div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {
                    (!uniqueJobs || uniqueJobs.length === 0)
                        ? <span>No jobs available</span>
                        : uniqueJobs.slice(0, 6).map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.35, delay: index * 0.05 }}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))
                }
            </motion.div>
        </div>
    )
}

export default LatestJobs