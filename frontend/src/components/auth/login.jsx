import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input";
import { RadioGroup} from '@/components/ui/radio-group';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "sonner";
import { LogIn } from 'lucide-react';

const USER_API_END_POINT = "http://localhost:8000/api/v1/user";


const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/login`, input,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                navigate('/');
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
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 p-4 rounded-md shadow-lg my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    {errorMsg && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3 text-center">
                            {errorMsg}
                        </div>
                    )}
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className='flex items-center justify-betweeen'>
                        <RadioGroup className='flex justify-center items-center gap-8 my-5 w-full bg-[#ff0000]  text-white rounded py-2 transition-colors' >
                            <div className="flex justify-center items-center gap-3">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer h-4 w-4 border border-black'
                                    id="r1"
                                />
                                    <Label htmlFor="r1" className="font-bold">Job Seeker</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer h-4 w-4 border border-black'
                                    id="r2"
                                />
                                    <Label htmlFor="r2" className="font-bold">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <button type="submit" className="w-full my-4 bg-black text-white rounded py-2 hover:bg-[#272628] transition-colors">Login</button>
                    <span className='text-sm'>Don't have an account? <Link to ="/signup" className='text-blue-600'>Sign Up</Link></span>
                </form>
            </div >
        </div>
    );
}

export default Login