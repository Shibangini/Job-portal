import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className='w-1/2 border border-gray-200 p-4 rounded-md shadow-lg my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone number</Label>
                        <Input
                            type="text"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className='flex items-center gap-8 mt-6 w-full'>
                        <label className='whitespace-nowrap'>Profile Picture</label>
                        <input
                            accept="image/*"
                            type="file"
                            placeholder='Upload your profile picture'
                            className='cursor-pointer max-w-xl flex-1'
                        />
                    </div>
                    <div className='flex items-center justify-betweeen'>
                        <RadioGroup className='flex justify-center items-center gap-8 my-5 w-full bg-[#ff0000]  text-white rounded py-2 transition-colors' >
                            <div className="flex justify-center items-center gap-3">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className='cursor-pointer'
                                />
                                    <Label htmlFor="r1" className="font-bold">Job Seeker</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className='cursor-pointer'
                                />
                                    <Label htmlFor="r2" className="font-bold">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <button type="submit" className="w-full my-4 bg-black text-white rounded py-2 hover:bg-[#272628] transition-colors">SignUp</button>
                    <span className='text-sm'>Already have an account? <Link to ="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div >
        </div>

    )
}

export default Signup