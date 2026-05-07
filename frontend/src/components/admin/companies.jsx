import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './companiesTable'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));

    }, [input, dispatch]);
    return (
        <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(248,103,2,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf7_0%,_#ffffff_45%,_#f8fafc_100%)]'>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className='w-fit bg-white shadow-sm border-gray-200 '
                        placeholder='Filter by name'
                        onChange={(e) => setInput(e.target.value)}

                    />
                    <Button className='bg-black text-white hover:bg-black/80' onClick={() => navigate('/admin/companies/create')}>
                        New Company
                    </Button>
                </div>
                <div className='rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60'>
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default companies