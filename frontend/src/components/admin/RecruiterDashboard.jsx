import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../footer'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { Briefcase, Building2, Users, PlusCircle, ArrowRight, Layers3, SearchCheck } from 'lucide-react'

const RecruiterDashboard = () => {
    useGetAllCompanies();
    useGetAllAdminJobs();

    const { user } = useSelector((store) => store.auth || {});
    const { companies = [] } = useSelector((store) => store.company || {});
    const { allAdminJobs = [] } = useSelector((store) => store.job || {});

    const totalApplications = allAdminJobs.reduce((count, job) => count + (job?.applicants?.length || 0), 0);
    const activeJobs = allAdminJobs.length;
    const companyCount = companies.length;

    const quickActions = [
        { label: 'Create company', href: '/admin/companies/create', icon: Building2, description: 'Add a new employer profile.' },
        { label: 'Post a job', href: '/admin/jobs/create', icon: PlusCircle, description: 'Publish a new opening.' },
        { label: 'Review jobs', href: '/admin/jobs', icon: Briefcase, description: 'Manage every posted role.' },
        { label: 'Manage companies', href: '/admin/companies', icon: Layers3, description: 'Edit and organize companies.' },
    ];

    const stats = [
        { label: 'Companies', value: companyCount, icon: Building2 },
        { label: 'Live jobs', value: activeJobs, icon: Briefcase },
        { label: 'Applications', value: totalApplications, icon: Users },
    ];

    return (
        <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(248,103,2,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf7_0%,_#ffffff_45%,_#f8fafc_100%)]'>
            <Navbar />
            <div className='mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-14'>
                <section className='overflow-hidden rounded-[2rem] border border-orange-100 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur'>
                    <div className='grid gap-8 px-6 py-8 lg:grid-cols-[1.5fr,1fr] lg:px-10 lg:py-10'>
                        <div>
                            <p className='mb-3 inline-flex rounded-full bg-[#ffe3e3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-600 '>Recruiter dashboard</p>
                            <h1 className='max-w-2xl text-3xl font-black tracking-tight text-slate-900 md:text-5xl'>
                                Welcome back, {user?.fullname || 'recruiter'}.
                            </h1>
                            <p className='mt-4 max-w-2xl text-sm leading-6 text-slate-600 md:text-base'>
                                Simplify your hiring process from start to finish. 
                                Post jobs, manage companies, track applicants, and make faster, smarter decisions - all from a single, intuitive dashboard.
                            </p>
                            <div className='mt-6 flex flex-wrap gap-3'>
                                <Link to='/admin/jobs/create' className='inline-flex items-center gap-2 rounded-full bg- bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#bf0000]'>
                                    Post a job <ArrowRight className='h-4 w-4' />
                                </Link>
                                <Link to='/admin/companies/create' className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-350 hover:bg-slate-100'>
                                    Create company
                                </Link>
                            </div>
                        </div>
                        <div className='grid gap-3 sm:grid-cols-3 lg:grid-cols-1'>
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className='rounded-2xl border border-transparent bg-gradient-to-br from-white to-slate-50 px-4 py-4 transform-gpu transition-transform hover:-translate-y-3 hover:scale-105 shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_30px_70px_rgba(106,56,194,0.08)]'
                                >
                                    <div className='mb-3 inline-flex rounded-full bg-white p-2 text-[#6A38C2] shadow-sm'>
                                        <stat.icon className='h-5 w-5' />
                                    </div>
                                    <p className='text-2xl font-black text-slate-900'>{stat.value}</p>
                                    <p className='text-sm text-slate-500'>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className='mt-8 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]'>
                    <div className='rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60'>
                        <div className='mb-5 flex items-center justify-between gap-4'>
                            <div>
                                <h2 className='text-xl font-bold text-slate-900'>Quick actions</h2>
                                <p className='text-sm text-slate-500'>The most common recruiter tasks are one click away.</p>
                            </div>
                        </div>
                        <div className='grid gap-4 md:grid-cols-2'>
                            {quickActions.map((action) => (
                                <Link
                                    key={action.label}
                                    to={action.href}
                                    className='group rounded-2xl border border-slate-200 bg-slate-50 p-5 transform-gpu transition-transform hover:-translate-y-4 hover:scale-105 hover:rotate-1 hover:bg-[#fdf3ff] hover:shadow-[0_30px_60px_rgba(106,56,194,0.12)]'
                                >
                                    <div className='mb-4 inline-flex rounded-full bg-white p-3 text-[#6A38C2] shadow-sm transform-gpu transition-transform group-hover:-translate-y-1'>
                                        <action.icon className='h-5 w-5' />
                                    </div>
                                    <h3 className='text-base font-semibold text-slate-900'>{action.label}</h3>
                                    <p className='mt-1 text-sm text-slate-500'>{action.description}</p>
                                    <span className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600 transition group-hover:gap-2'>
                                        Open <ArrowRight className='h-4 w-4' />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60'>
                        <div className='flex items-center gap-3'>
                            <div className='rounded-2xl bg-[#ede9fe] p-3 text-red-600 shadow-sm'>
                                <SearchCheck className='h-6 w-6' />
                            </div>
                            <div>
                                <h2 className='text-xl font-bold text-slate-900'>Hiring flow</h2>
                                <p className='text-sm text-slate-500'>A compact path for day-to-day recruiting.</p>
                            </div>
                        </div>
                        <div className='mt-6 space-y-4'>
                            {[ 
                                'Create or update your company profile.',
                                'Post a role with the right location and salary.',
                                'Review applicants and change their status instantly.',
                            ].map((item, index) => (
                                <div key={item} className='flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 transform-gpu transition-transform hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(106,56,194,0.06)]'>
                                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-red-600 shadow-sm'>
                                        {index + 1}
                                    </div>
                                    <p className='text-sm leading-6 text-slate-600'>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default RecruiterDashboard