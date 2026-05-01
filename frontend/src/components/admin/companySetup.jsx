import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { ArrowLeft, Loader, Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'

const companySetup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { singleCompany } = useSelector((store) => store.company);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: "null"
    });


    const changeEventHandler = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput((prev) => ({ ...prev, file }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file !== "null") {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            } else {
                toast.error(res?.data?.message || 'Failed to update company');
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            let errorMessage = 'Failed to update company';
            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error?.message) {
                errorMessage = error.message;
            } else if (error?.code === 'ERR_NETWORK') {
                errorMessage = 'Network error: Backend server not responding. Please check if the server is running.';
            }
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch company data if not in store
        if (!singleCompany && params.id) {
            const fetchCompany = async () => {
                try {
                    const res = await axios.get(`${COMPANY_API_END_POINT}/get/${params.id}`, {
                        withCredentials: true
                    });
                    if (res?.data?.success) {
                        dispatch(setSingleCompany(res.data.company));
                    }
                } catch (error) {
                    console.log(error);
                    let errorMsg = 'Failed to load company';
                    if (error?.code === 'ERR_NETWORK') {
                        errorMsg = 'Network error: Backend server not responding.';
                    } else if (error?.response?.data?.message) {
                        errorMsg = error.response.data.message;
                    }
                    toast.error(errorMsg);
                }
            };
            fetchCompany();
        }
    }, [params.id, dispatch, singleCompany]);

    useEffect(() => {
        // Populate form when singleCompany is loaded
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: "null"
            });
        }
    }, [singleCompany]);

    return (
        <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-10 sm:py-14'>
                <form onSubmit={submitHandler} className='rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60 backdrop-blur sm:p-8'>
                    <div className='flex items-center gap-4 border-b border-slate-200 pb-6'>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={() => navigate("/admin/companies")}
                            className="flex items-center gap-2 text-slate-600 font-semibold"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <div>
                            <h1 className='text-2xl font-bold tracking-tight text-slate-900'>Company Setup</h1>
                            <p className='mt-1 text-sm text-slate-500'>Add the details recruiters will see on your company profile.</p>
                        </div>
                    </div>

                    <div className='mt-8 grid gap-6 sm:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label className='text-sm font-medium text-slate-700'>Company Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter company name"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-sm font-medium text-slate-700'>Website</Label>
                            <Input
                                type="text"
                                placeholder="https://yourcompany.com"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='space-y-2 sm:col-span-2'>
                            <Label className='text-sm font-medium text-slate-700'>Description</Label>
                            <textarea
                                placeholder="Tell people what your company does..."
                                name="description"
                                rows={5}
                                value={input.description}
                                onChange={changeEventHandler}
                                className='flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-sm font-medium text-slate-700'>Location</Label>
                            <Input
                                type="text"
                                placeholder="City, Country"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-sm font-medium text-slate-700'>Logo</Label>
                            <Input
                                type="file"
                                accept='image/*'
                                className='cursor-pointer'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>

                    <div className='mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end'>
                        <Button type="button" variant='outline' onClick={() => navigate('/admin/companies')}>
                            Cancel
                        </Button>
                        {
                            loading? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800"> Update Company</Button>
                        }
                    </div>
                </form>
            </div>

        </div>
    )
}

export default companySetup