import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import React from 'react'
import logo from '@/assets/logo.png'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut, ChevronDown, Bookmark } from "lucide-react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const { savedJobs = [] } = useSelector((store) => store.job || {});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navClassName = ({ isActive }) =>
        `rounded-md px-3 py-1.5 transition ${isActive ? 'bg-[#ffe3e3] text-red-600 font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`;

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success("Logged out successfully");
            }

        } catch (error) {
            console.log(error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-2xl overflow-hidden bg-white shadow-sm'>
                            <img src={logo} alt="JobFlow logo" className="h-10 w-10 object-contain" />
                        </div>
                        <div className='leading-tight'>
                            <h1 className='text-2xl font- Space Grotesk font-black italic tracking-tight text-slate-900'>Job<span className='text-red-600'>Verse</span></h1>
                            <p className='text-[11px] font-medium uppercase tracking-[0.24em] text-slate-400'>DISCOVER OPPORTUNITIES. BUILD FUTURES </p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user?.role === 'recruiter' ? (
                                <>
                                    <li><NavLink to="/recruiter/dashboard" className={navClassName}>Dashboard</NavLink></li>
                                    <li><NavLink to="/admin/companies" className={navClassName}>Companies</NavLink></li>
                                    <li><NavLink to="/admin/jobs" className={navClassName}>Jobs</NavLink></li>
                                </>
                            ) : (
                                <>
                                    <li><NavLink to="/" className={navClassName}>Home</NavLink></li>
                                    <li><NavLink to="/jobs" className={navClassName}>Jobs</NavLink></li>
                                    <li><NavLink to="/browse" className={navClassName}>Browse</NavLink></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'>
                                    <Button variant="outline" className='hover:bg-slate-100'>Login</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button className='bg-[#6A38C2] hover:bg-[#5b30a6] text-white'>Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button"
                                        className='flex items-center gap-2 rounded-full border border-slate-200 bg-white px-1.5 py-1 shadow-sm transition hover:border-slate-300 hover:shadow'
                                    >
                                        <Avatar className='h-9 w-9 cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" />
                                        </Avatar>
                                        <ChevronDown className='h-4 w-4 text-slate-600' />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent align='end' sideOffset={10} className='w-72 rounded-xl border-slate-200 bg-white p-0 shadow-xl'>
                                    <div className='border-b border-slate-100 px-4 py-3'>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className='h-11 w-11'>
                                                <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" />
                                            </Avatar>
                                            <div className='min-w-0'>
                                                <h4 className='truncate text-sm font-semibold text-slate-900'>{user?.fullname}</h4>
                                                <p className='truncate text-xs text-slate-500'>{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-2'>
                                        {
                                            user && user.role === 'student' && (
                                                <>
                                                    <Link
                                                        to="/profile"
                                                        className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900'
                                                    >
                                                        <User2 className='h-4 w-4' />
                                                        <span>View Profile</span>
                                                    </Link>
                                                    <Link
                                                        to="/saved-jobs"
                                                        className='flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900'
                                                    >
                                                        <span className='flex items-center gap-2'>
                                                            <Bookmark className='h-4 w-4' />
                                                            <span>Saved Jobs</span>
                                                        </span>
                                                        <span className='rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700'>
                                                            {Array.isArray(savedJobs) ? savedJobs.length : 0}
                                                        </span>
                                                    </Link>
                                                </>
                                            )
                                        }
                                        <button
                                            type='button'
                                            onClick={logoutHandler}
                                            className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50'
                                        >
                                            <LogOut className='h-4 w-4' />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>

        </div>

    )
}

export default Navbar
