import { setFilterLocation, setFilterSalary, setFilterIndustry, clearFilters } from '@/redux/jobSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const filterData = [
    {
        Filtertype: 'Location',
        filterKey: 'location',
        array: ["Any Location", "Bengaluru", "Mumbai", "Delhi (NCR)", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"]
    },
    {
        Filtertype: 'Industry',
        filterKey: 'industry',
        array: ["Any Industry", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Product Manager", "UI/UX Designer", "DevOps Engineer", "Mobile App Developer"]
    },
    {
        Filtertype: 'Salary Range',
        filterKey: 'salary',
        array: ["Any Salary", "0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15-20 LPA", "20-25 LPA", "25+ LPA"]
    },
]


const FilterCard = () => {
    const dispatch = useDispatch();
    const { selectedFilters = {} } = useSelector(store => store.job || {});

    const handleFilterChange = (filterType, value) => {
        // Dispatch to Redux: if "Any" option, send empty string; otherwise send the value
        const reduxValue = value.toLowerCase().startsWith('any') ? "" : value;
        
        if (filterType === 'location') {
            dispatch(setFilterLocation(reduxValue));
        } else if (filterType === 'industry') {
            dispatch(setFilterIndustry(reduxValue));
        } else if (filterType === 'salary') {
            dispatch(setFilterSalary(reduxValue));
        }
    }

    const clearAllFilterHandler = () => {
        dispatch(clearFilters());
    };

    return (
        <div className='w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                <button
                    type='button'
                    onClick={clearAllFilterHandler}
                    className='text-xs font-semibold text-violet-700 hover:text-violet-900'
                >
                    Clear all
                </button>
            </div>
            <hr className='mt-3' />
            <div className="space-y-6">
                <div className="space-y-4 mt-4">
                    {
                        filterData.map((data, groupIndex) => (
                            <div key={groupIndex} className='rounded-lg border border-slate-100 p-3'>
                                <h1 className="font-semibold text-sm text-slate-800">{data.Filtertype}</h1>
                                <div className="mt-3 space-y-2">
                                    {data.array.map((item, itemIndex) => {
                                        const itemId = `rg-${groupIndex}-${itemIndex}`;
                                        // For "Any" options, check against empty string; otherwise check exact match
                                        const isChecked = item.toLowerCase().startsWith('any') 
                                            ? !selectedFilters[data.filterKey]
                                            : selectedFilters[data.filterKey] === item;
                                        
                                        return (
                                            <div key={itemIndex} className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name={`filter-${groupIndex}`}
                                                    id={itemId}
                                                    value={item}
                                                    checked={isChecked}
                                                    onChange={() => handleFilterChange(data.filterKey, item)}
                                                    className="h-4 w-4 text-indigo-600 cursor-pointer"
                                                />
                                                <label htmlFor={itemId} className="cursor-pointer text-sm text-slate-700">{item}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FilterCard