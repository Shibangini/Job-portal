import React from 'react'

const filterData = [
    {
        Filtertype: 'Location',
        array: ["Bengaluru", "Mumbai", "Delhi (NCR)", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"]
    },
    {
        Filtertype: 'Industry',
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Product Manager", "UI/UX Designer", "DevOps Engineer", "Mobile App Developer"]
    },
    {
        Filtertype: 'Salary Range',
        array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15-20 LPA", "20-25 LPA", "25+ LPA"]
    },
]


const FilterCard = () => {
    return (
        <div className='w-full bg-white p-3 rounded-md '>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <div className="space-y-6">
                {
                    filterData.map((data, groupIndex) => (
                        <div key={groupIndex}>
                            <h1 className="font-bold text-lg">{data.Filtertype}</h1>
                            <div className="mt-2 space-y-2">
                                {data.array.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name={`filter-${groupIndex}`}
                                            id={`rg-${groupIndex}-${itemIndex}`}
                                            value={item}
                                            className="h-4 w-4 text-indigo-600 cursor-pointer"
                                        />
                                        <label htmlFor={`rg-${groupIndex}-${itemIndex}`} className="cursor-pointer">{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard