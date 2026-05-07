import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { updateApplicationStatus } from '@/redux/applicationSlice';

const shortListingStatus = [
    { label: 'Accept', value: 'accepted' },
    { label: 'Hold', value: 'hold' },
    { label: 'Reject', value: 'rejected' }
];

const ApplicantsTable = () => {
    const dispatch = useDispatch();
    const { applications = [] } = useSelector(store => store.application || {});

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                dispatch(updateApplicationStatus({ applicationId: id, status }));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of applicants for this job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications && applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname || '—'}</TableCell>
                                <TableCell>{item?.applicant?.email || '—'}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber || '—'}</TableCell>
                                <TableCell>
                                    {/* Status badge */}
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        item?.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                                        item?.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                                        item?.status === 'hold' ? 'bg-amber-100 text-amber-700' :
                                        'bg-yellow-50 text-yellow-700'
                                    }`}>{item?.status || 'pending'}</span>
                                </TableCell>
                                <TableCell className="text-blue-600 cursor-pointer">
                                    {item?.applicant?.profile?.resume ? (
                                        <a 
                                            href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/application/resume/${item._id}`}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            View Resume
                                        </a>
                                    ) : '—'}
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    {
                                        // Only allow actions when status is pending or hold
                                        item?.status === 'pending' || item?.status === 'hold' ? (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-40 p-0" align="end">
                                                    <div className="bg-white rounded-md shadow-lg overflow-hidden">
                                                        {
                                                            shortListingStatus.map((statusObj, index) => {
                                                                // hide Pending option if current status already pending? keep it for explicit set
                                                                return (
                                                                    <button
                                                                        onClick={() => statusHandler(statusObj.value, item?._id)}
                                                                        key={index}
                                                                        className='w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors border-b last:border-b-0'
                                                                    >
                                                                        {statusObj.label}
                                                                    </button>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        ) : (
                                            <span className='text-sm text-slate-500'>No actions</span>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable