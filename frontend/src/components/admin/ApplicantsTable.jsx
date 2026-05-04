import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux';

const shortListingStatus = ['Shortlist', 'Hold', 'Reject'];

const ApplicantsTable = () => {
    const { applications = [] } = useSelector(store => store.application || {});
    return (
        <div>
            <Table>
                <TableCaption>A list of applicants for this job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications && applications.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname || '—'}</TableCell>
                                <TableCell>{item?.applicant?.email || '—'}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber || '—'}</TableCell>
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
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortListingStatus.map((status, index) => {
                                                    return (
                                                        <div key={index} className='flex w-fit item-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
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