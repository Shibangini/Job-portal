import React, { useEffect, useState } from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../ui/table"
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, Edit2, Eye } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs = [], searchJobByText } = useSelector((store) => store.job) || {};
    const navigate = useNavigate();
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    console.log('Admin jobs from Redux:', allAdminJobs);
    console.log('Filter jobs:', filterJobs);

    useEffect(() => {
        const filteredJob = allAdminJobs.filter((job) => {

            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJob);
},[allAdminJobs, searchJobByText]);
    return (
        <Table>
            <TableCaption>A list of your recent posted jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filterJobs.length <= 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No companies found
                        </TableCell>
                    </TableRow>
                ) : (
                    filterJobs.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent side="right" align="center" sideOffset={6} className='w-32'>
                                        <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                        <div onClick = {() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer mt-2'>
                                            <Eye className='w-4'/>
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table >
    )
}

export default AdminJobsTable