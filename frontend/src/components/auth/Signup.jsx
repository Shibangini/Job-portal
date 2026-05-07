import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input";
import { RadioGroup } from '@/components/ui/radio-group';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const USER_API_END_POINT = "http://localhost:8000/api/v1/user";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const dispatch = useDispatch();
    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // Prevent stale global loading state from keeping auth button disabled.
        dispatch(setLoading(false));
    }, [dispatch]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/register`, formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            try {
                toast.error(msg);
            } catch (e) {
                alert(msg);
            }
        } finally {
            dispatch(setLoading(false));
        }

    };

    useEffect(() => {
            if(user){
                navigate('/');
            }
        }, [user, navigate]);

    return (
        <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(248,103,2,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf7_0%,_#ffffff_45%,_#f8fafc_100%)]'>
            <Navbar />
            <div className='mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4 py-10'>
                <form onSubmit={submitHandler} className='w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:p-8'>
                    <h1 className='mb-1 text-2xl font-bold text-slate-900'>Create your account</h1>
                    <p className='mb-6 text-sm text-slate-500'>Start applying to jobs and track your applications.</p>
                    <div className='my-2'>
                        <Label className='text-slate-700'>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className='mt-1 h-11'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='text-slate-700'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className='mt-1 h-11'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='text-slate-700'>Phone number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"
                            className='mt-1 h-11'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='text-slate-700'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className='mt-1 h-11'
                        />
                    </div>
                    <div className='mt-5 rounded-lg border border-slate-200 p-3'>
                        <label className='mb-2 block text-sm font-medium text-slate-700'>Profile Picture</label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            placeholder='Upload your profile picture'
                            className='cursor-pointer max-w-xl flex-1'
                        />
                    </div>
                    <div className='mt-5'>
                        <p className='mb-2 text-sm font-medium text-slate-700'>Choose your role</p>
                        <RadioGroup className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                            <label htmlFor="r1" className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${input.role === 'student' ? 'border-violet-300 bg-violet-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer h-4 w-4 border border-black'
                                    id="r1"
                                />
                                <Label htmlFor="r1" className="font-semibold">Job Seeker</Label>
                            </label>
                            <label htmlFor="r2" className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${input.role === 'recruiter' ? 'border-violet-300 bg-violet-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer h-4 w-4 border border-black'
                                    id="r2"
                                />
                                <Label htmlFor="r2" className="font-semibold">Recruiter</Label>
                            </label>
                        </RadioGroup>
                    </div>
                    {loading ? (
                        <Button className="mt-6 w-full rounded-md bg-black py-2 text-white transition-colors hover:bg-[#272628]" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="mt-6 w-full rounded-md bg-black py-2 text-white transition-colors hover:bg-[#272628]">Sign Up</Button>
                    )}
                    <span className='mt-4 block text-sm text-slate-600'>Already have an account? <Link to="/login" className='font-semibold text-violet-700 hover:text-violet-900'>Login</Link></span>
                </form>
            </div >
        </div>

    )
}

export default Signup