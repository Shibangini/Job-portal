import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input";
import { RadioGroup } from '@/components/ui/radio-group';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";


const USER_API_END_POINT = "http://localhost:8000/api/v1/user";


const Login = () => {
    const navigate = useNavigate();
    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [errorMsg, setErrorMsg] = useState("");


    useEffect(() => {
        // Prevent stale global loading state from keeping auth button disabled.
        dispatch(setLoading(false));
    }, [dispatch]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_API_END_POINT}/login`, input,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate(res.data.user?.role === 'recruiter' ? '/recruiter/dashboard' : '/');
                toast.success(res.data.message);
            } else {
                setErrorMsg(res.data.message || "Login failed");
                toast.error(res.data.message || "Login failed");
            }
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            setErrorMsg(msg);
            try {
                toast.error(msg);
            } catch (e) {
                alert(msg);
            } finally {
                dispatch(setLoading(false));
            }
        } finally {
            dispatch(setLoading(false));
        }
    };
    useEffect(() => {
        if(user){
            navigate(user?.role === 'recruiter' ? '/recruiter/dashboard' : '/');
        }
    }, [user, navigate]);


    return (
        <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(248,103,2,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf7_0%,_#ffffff_45%,_#f8fafc_100%)]'>
            <Navbar />
            <div className='mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4 py-10'>
                <form onSubmit={submitHandler} className='w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:p-8'>
                    <h1 className='mb-1 text-2xl font-bold text-slate-900'>Welcome back</h1>
                    <p className='mb-6 text-sm text-slate-500'>Login to continue your job search.</p>
                    {errorMsg && (
                        <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-center text-sm text-red-700">
                            {errorMsg}
                        </div>
                    )}
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
                    <div className='mt-5'>
                        <p className='mb-2 text-sm font-medium text-slate-700'>Login as</p>
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
                    <div>
                        {
                            loading ? (
                                <Button className="mt-6 w-full rounded-md bg-black py-2 text-white transition-colors hover:bg-[#272628]" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" /> Please wait
                                </Button>
                            ) : (
                                <Button type="submit" className="mt-6 w-full rounded-md bg-black py-2 text-white transition-colors hover:bg-[#272628]">Login</Button>
                            )}
                    </div>

                    <span className='mt-4 block text-sm text-slate-600'>Don't have an account? <Link to="/signup" className='font-semibold text-violet-700 hover:text-violet-900'>Sign Up</Link></span>
                </form>
            </div >
        </div>
    );
}

export default Login