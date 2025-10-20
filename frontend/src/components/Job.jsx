import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Job = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray 100 cursor-pointer hover:shadow-2xl transition-shadow'>
            <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" className="rounded full" size="icon"><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src="https://graphicsfamily.com/wp-content/uploads/edd/2021/12/Tech-Logo-scaled.jpg"></AvatarImage>
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>
                        India
                    </p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Description: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam a dolores ratione distinctio expedita minima eligendi ad iure voluptate eum perferendis, odio quod facere, alias rem ducimus vero. Porro, doloremque!</p>

            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant='ghost'>12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant='ghost'>Part Time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>24 LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline">Details</Button>
                <Button className='bg-[#7209b7] text-white'>Save for later</Button>
            </div>
        </div>
    )
}

export default Job