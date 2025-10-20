import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Frontend Development",
    "Backend Development",
    "Data Science",
    "Graphic Design",
    "Full Stack Development",
];

const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-20'>
                <CarouselContent>
                    {category.map((cat, index) => (
                            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 py-4 flex items-center'>
                                <Button variant='outline' className='rounded-full w-full py-2 text-center'>{cat}</Button>
                            </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel