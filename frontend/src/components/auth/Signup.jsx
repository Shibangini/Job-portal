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
    const { loading } = useSelector((store) => store.auth);
    const navigate = useNavigate();

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
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 p-4 rounded-md shadow-lg my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                        />
                    </div>
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
                        <Label>Phone number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"
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
                    <div className='flex items-center gap-8 mt-6 w-full'>
                        <label className='whitespace-nowrap'>Profile Picture</label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            placeholder='Upload your profile picture'
                            className='cursor-pointer max-w-xl flex-1'
                        />
                    </div>
                    <div className='flex items-center justify-betweeen'>
                        <RadioGroup className='flex justify-center items-center gap-8 my-5 w-full'>
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
                    {loading ? (
                        <Button className="w-full my-4 bg-black text-white rounded py-2 hover:bg-[#272628] transition-colors flex items-center justify-center" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-black text-white rounded py-2 hover:bg-[#272628] transition-colors">SignUp</Button>
                    )}
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div >
        </div>

    )
}

export default Signup