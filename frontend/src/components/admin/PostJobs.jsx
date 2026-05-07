import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { JOB_API_END_POINT } from '@/utils/constant'


const companyArray = [];


const PostJobs = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector((store) => store.company);
    const changeEventHandler = (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    };

    const selectChangeHandler = (e) => {
        setInput({
            ...input,
            companyId: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Frontend validation
        if (!input.title || !input.description || !input.requirements || !input.salary || !input.location || !input.jobType || !input.experience || !input.position || !input.companyId) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            console.log('Submitting job with data:', input);
            
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            
            console.log('Response:', res);
            
            if (res?.data?.success) {
                toast.success(res.data.message || 'Job posted successfully');
                navigate('/admin/jobs');
            } else {
                toast.error(res?.data?.message || 'Failed to post job');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            const errorMsg = error?.response?.data?.message || error?.message || 'Failed to post job. Please try again later.';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Job Title</Label>
                            <Input
                                type='text'
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type='text'
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type='text'
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                placeholder="e.g., 12 LPA"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type='text'
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type='text'
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                placeholder="e.g., 5-7 years"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Number of Positions</Label>
                            <Input
                                type='number'
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div>
                                    <Label>Select Company</Label>
                                    <select
                                        name="companyId"
                                        value={input.companyId}
                                        onChange={selectChangeHandler}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    >
                                        <option value="">Choose a company</option>
                                        {companies.map((company) => (
                                            <option key={company._id} value={company._id}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800"> Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-sm text-red-600 font-bold text-center my-3'>*Please create a company profile before posting a job.</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJobs