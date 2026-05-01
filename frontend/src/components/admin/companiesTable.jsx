import React, { useEffect, useState } from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../ui/table"
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, Edit2 } from 'lucide-react'
import { useSelector } from 'react-redux'

const companiesTable = () => {
    const { companies = [], searchCompanyByText = "" } = useSelector((store) => store.company) || {};
    const filteredCompanies = companies.filter((company) => {
        if (!searchCompanyByText) {
            return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    return (
        <Table>
            <TableCaption>A list of your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredCompanies.length <= 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No companies found
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredCompanies.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar className='h-8 w-8'>
                                    <AvatarImage src={company.logo || "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
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
                    ))
                )}
            </TableBody>
        </Table >
    )
}

export default companiesTable