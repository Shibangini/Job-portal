import React, { useMemo, useState } from 'react'
import { Search, Sparkles, Briefcase, MapPin, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'
import { setSearchedQuery } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const highlightTags = [
  { label: 'Remote friendly', icon: MapPin },
  { label: 'Fast hiring', icon: Briefcase },
  { label: 'Top rated employers', icon: Sparkles },
];

const stats = [
  { value: '2.5k+', label: 'Open roles' },
  { value: '800+', label: 'Companies' },
  { value: '95%', label: 'Match rate' },
];

export const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector((store) => store.job?.jobs || []);

  const liveJobs = useMemo(() => {
    const map = new Map();

    [...jobs]
      .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
      .forEach((job) => {
        if (job?._id && !map.has(job._id)) {
          map.set(job._id, job);
        }
      });

    return Array.from(map.values()).slice(0, 3);
  }, [jobs]);


  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div className='relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-[#6A38C2]/15 blur-3xl' />
        <div className='absolute right-[-6rem] top-20 h-80 w-80 rounded-full bg-[#F83002]/10 blur-3xl' />
      </div>

      <div className='relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.15fr,0.85fr] md:px-6 lg:py-20'>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className='flex flex-col justify-center'
        >
          <span className='mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#f6d7d0] bg-white/80 px-4 py-2 text-sm font-semibold text-[#F83002] shadow-sm backdrop-blur'>
            <TrendingUp className='h-4 w-4' />
            Your trusted job hunt website
          </span>

          <h1 className='max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl'>
            Search, apply & get your <span className='bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent'>dream job</span>
          </h1>

          <p className='mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg'>
            Discover opportunities that fit your skills, browse trusted employers, and move faster from search to interview.
          </p>

          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            {highlightTags.map(({ label, icon: Icon }) => (
              <div key={label} className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur'>
                <Icon className='h-4 w-4 text-[#6A38C2]' />
                {label}
              </div>
            ))}
          </div>

          <div className='mt-8 grid gap-4 sm:grid-cols-3'>
            {stats.map((stat) => (
              <div key={stat.label} className='rounded-2xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/70 backdrop-blur'>
                <p className='text-2xl font-black text-slate-900'>{stat.value}</p>
                <p className='mt-1 text-sm text-slate-500'>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className='mt-8 flex w-full flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-white/90 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:flex-row sm:items-center'>
            <input
              type="text"
              placeholder='Find your dream job...'
              className='h-12 w-full border-none bg-transparent px-3 text-slate-700 outline-none placeholder:text-slate-400'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
            />
            <Button onClick={searchJobHandler} className='h-12 rounded-2xl bg-[#6A38C2] px-6 text-white transition-transform hover:-translate-y-0.5 hover:bg-[#5b30a6]'>
              <Search className='mr-2 h-5 w-5' />
              Search jobs
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='relative flex items-center justify-center'
        >
          <div className='absolute inset-6 rounded-[2.5rem] border border-dashed border-[#6A38C2]/20 bg-white/30' />
          <div className='relative w-full max-w-md rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_30px_80px_rgba(106,56,194,0.12)] backdrop-blur'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-[#6A38C2]'>Today’s momentum</p>
                <h2 className='mt-1 text-2xl font-black text-slate-900'>Live roles hiring now</h2>
              </div>
              <div className='rounded-2xl bg-[#ede9fe] p-3 text-[#6A38C2]'>
                <Briefcase className='h-6 w-6' />
              </div>
            </div>

            <div className='mt-6 space-y-4'>
              {liveJobs.length > 0 ? (
                liveJobs.map((job, index) => (
                  <motion.button
                    key={job._id}
                    type='button'
                    onClick={() => navigate(`/description/${job._id}`)}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className={`w-full rounded-2xl px-4 py-4 text-left shadow-sm transition-colors ${index === 0 ? 'bg-[#fdf3ff]' : index === 1 ? 'bg-[#fff7ee]' : 'bg-[#eef7ff]'}`}
                  >
                    <p className='font-semibold text-slate-900'>{job?.title || 'Untitled role'}</p>
                    <p className='mt-1 text-sm text-slate-500'>
                      {job?.company?.name || 'Company'} · {job?.location || 'Location not set'}
                    </p>
                    <p className='mt-2 text-xs font-medium text-[#6A38C2]'>
                      {job?.jobType || 'Full Time'} · {job?.salary || 'Salary not disclosed'}
                    </p>
                  </motion.button>
                ))
              ) : (
                <div className='rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500'>
                  Loading live opportunities...
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
