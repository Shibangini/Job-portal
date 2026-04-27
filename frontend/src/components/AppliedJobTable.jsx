import React from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody } from './ui/table'
import { Badge } from './ui/badge'
import { TableCell } from './ui/table'

const AppliedJobTable = () => {
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
                    [1,2].map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>01/01/2023</TableCell>
                            <TableCell>Software Engineer</TableCell>
                            <TableCell>ABC Corp</TableCell>
                            <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable