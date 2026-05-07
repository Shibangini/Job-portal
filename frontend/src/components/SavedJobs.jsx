import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import Job from './Job';

const SavedJobs = () => {
    const { savedJobs = [] } = useSelector((store) => store.job || {});

    return (
        <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(248,103,2,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf7_0%,_#ffffff_45%,_#f8fafc_100%)]'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-6'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold'>Saved Jobs</h1>
                    <p className='text-sm text-slate-500 mt-1'>Jobs you bookmarked for later.</p>
                </div>

                {savedJobs.length === 0 ? (
                    <div className='rounded-xl border border-slate-200 bg-white p-10 text-center'>
                        <p className='text-slate-600'>No saved jobs yet. Save a job from the jobs page to see it here.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {savedJobs.map((job) => (
                            <div key={job?._id} className='p-4'>
                                <Job job={job} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedJobs;
