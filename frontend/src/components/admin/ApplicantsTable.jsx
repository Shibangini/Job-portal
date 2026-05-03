import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal } from 'lucide-react'

const shortListingStatus = ['Shortlist', 'Hold', 'Reject'];

const ApplicantsTable = () => {
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
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact Number</TableCell>
                        <TableCell><a href='resume_link' target="_blank" rel="noopener noreferrer">View Resume</a></TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell className="float-right cursor-pointer">
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
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable