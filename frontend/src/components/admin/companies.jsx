import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './companiesTable'

const companies = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input 
                className='w-fit'
                placeholder='Filter by name'
                />
                <Button className='bg-black text-white hover:bg-black/80' onClick={() => navigate('/admin/companies/create')}>
                    New Company
                </Button>
            </div>
            <CompaniesTable/>
        </div>
    </div>
  )
}

export default companies