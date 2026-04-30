import React from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../ui/table"
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, Edit2 } from 'lucide-react'

const companiesTable = () => {
    return (
        <Table>
            <TableCaption>A list of your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="tesxt-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Avatar className='h-8 w-8'>
                            <AvatarImage src="https://www.siegelgale.com/app/uploads/2021/10/SGCOM_Blog_211018.png" />
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>30-04-2026</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger>
                                <MoreHorizontal />
                            </PopoverTrigger>
                            <PopoverContent className='w-32'>
                                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                    <Edit2 className='w-4' />
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default companiesTable