import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'
import { setFilterIndustry, setFilterLocation, setFilterSalary } from '@/redux/jobSlice'


const Jobs = () => {
    useGetAllJobs();
    const { jobs = [], searchedQuery = "", selectedFilters = {} } = useSelector((store) => store.job || {})
    const dispatch = useDispatch();

    const [filterJobs, setFilterJobs] = useState(jobs);

    const matchesAnyTerm = (sourceText, filterText) => {
        if (!sourceText || !filterText) return false;

        const normalizedSource = sourceText.toLowerCase();
        const terms = filterText
            .toLowerCase()
            .split(/\s+/)
            .map(term => term.trim())
            .filter(Boolean);

        return terms.some(term => normalizedSource.includes(term));
    };

    useEffect(() => {
        let filtered = jobs;

        // Filter by search query (title/description)
        if (searchedQuery) {
            filtered = filtered.filter(j =>
                matchesAnyTerm(`${j.title || ""} ${j.description || ""}`, searchedQuery)
            );
        }

        // Filter by location
        if (selectedFilters.location) {
            filtered = filtered.filter(j => j.location && j.location.toLowerCase().includes(selectedFilters.location.toLowerCase()));
        }

        // Filter by industry/role (matches job title)
        if (selectedFilters.industry) {
            filtered = filtered.filter(j =>
                matchesAnyTerm(`${j.title || ""} ${j.description || ""}`, selectedFilters.industry)
            );
        }

        // Filter by salary range
        if (selectedFilters.salary) {
            filtered = filtered.filter(j => {
                if (!j.salary) return false;
                
                // Extract numeric value from salary (handles "5", "5 LPA", "5-10", etc.)
                const salaryStr = j.salary.toString().trim();
                const salaryMatch = salaryStr.match(/^\d+/);
                if (!salaryMatch) return false;
                
                const salary = parseFloat(salaryMatch[0]);
                const range = selectedFilters.salary;
                
                if (range === "0-3 LPA") return salary >= 0 && salary <= 3;
                if (range === "3-6 LPA") return salary > 3 && salary <= 6;
                if (range === "6-10 LPA") return salary > 6 && salary <= 10;
                if (range === "10-15 LPA") return salary > 10 && salary <= 15;
                if (range === "15-20 LPA") return salary > 15 && salary <= 20;
                if (range === "20-25 LPA") return salary > 20 && salary <= 25;
                if (range === "25+ LPA") return salary > 25;
                return true;
            });
        }

        setFilterJobs(filtered);
    }, [jobs, searchedQuery, selectedFilters]);

    const activeFilterChips = [
        selectedFilters.location ? { key: 'location', label: selectedFilters.location } : null,
        selectedFilters.industry ? { key: 'industry', label: selectedFilters.industry } : null,
        selectedFilters.salary ? { key: 'salary', label: selectedFilters.salary } : null,
    ].filter(Boolean);

    const removeFilterChip = (filterKey) => {
        if (filterKey === 'location') dispatch(setFilterLocation(""));
        if (filterKey === 'industry') dispatch(setFilterIndustry(""));
        if (filterKey === 'salary') dispatch(setFilterSalary(""));
    };

    return (
        <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(248,103,2,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf7_0%,_#ffffff_45%,_#f8fafc_100%)]'>
            <Navbar />

            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    {/* sidebar / filters - reduce width */}
                    <aside className='w-1/6 md:w-1/5 sticky top-4 h-fit'>
                        <FilterCard />
                    </aside>

                    {/* job list */}
                    <main className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {activeFilterChips.length > 0 && (
                            <div className='mb-4 flex flex-wrap items-center gap-2'>
                                {activeFilterChips.map((chip) => (
                                    <button
                                        type='button'
                                        key={chip.key}
                                        onClick={() => removeFilterChip(chip.key)}
                                        className='rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 hover:bg-violet-100'
                                    >
                                        {chip.label} x
                                    </button>
                                ))}
                            </div>
                        )}
                        {filterJobs.length === 0 ? (
                            <div className='rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600'>
                                Job not found for selected filters.
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                {filterJobs.map((job) => (
                                    <motion.div 
                                    initial = {{ opacity: 0, x: 100}}
                                    animate = {{ opacity: 1, x: 0}}
                                    exit = {{ opacity: 0, x: -100}}
                                    transition = {{ duration: 0.5 }}
                                    key={job?._id} className='p-4'>
                                        <Job job={job} />
                                    </motion.div>
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