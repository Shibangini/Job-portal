import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from "lucide-react";

const Navbar = () => {
    return (
        <div className='bg-white'>
            <div className='flex item-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>JOB <span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className='cursor-pointer' >
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className='w-80'>
                            <div>
                                <div className='flex gap-2 space-y-2'>
                                    <Avatar className='cursor-pointer' >
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>Shibangini MernStack</h4>
                                        <p className='text-sm text-muted-foreground'>This is my bio</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col my-2 text-grey-600'>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <User2 />
                                    <Button variant="link">View Profile</Button>
                                </div>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <LogOut />
                                    <Button variant="link">Logout</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            
        </div>

    )
}

export default Navbar
