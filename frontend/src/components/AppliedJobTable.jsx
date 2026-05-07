import React from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody } from './ui/table'
import { Badge } from './ui/badge'
import { TableCell } from './ui/table'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job) || {};

  return (
    <div>
        <Table>
            <TableCaption>List of applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6">You haven't applied for any job yet.</TableCell>
                        </TableRow>
                    ) : allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                            <TableCell>
                                {appliedJob?.createdAt ? (
                                    new Date(appliedJob.createdAt).toLocaleDateString()
                                ) : appliedJob?._id ? (
                                    // fallback: derive date from ObjectId timestamp
                                    new Date(parseInt(appliedJob._id.substring(0, 8), 16) * 1000).toLocaleDateString()
                                ) : '—'}
                            </TableCell>
                            <TableCell>{appliedJob?.job?.title || '—'}</TableCell>
                            <TableCell>{appliedJob?.job?.company?.name || '—'}</TableCell>
                            <TableCell className="text-right"><Badge className={appliedJob?.status === 'accepted' ? 'bg-green-100 text-green-800' : appliedJob?.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>{appliedJob?.status?.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable