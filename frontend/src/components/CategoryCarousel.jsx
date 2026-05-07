import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Development",
    "Backend Development",
    "Data Science",
    "Graphic Design",
    "Full Stack Development",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className='mx-auto max-w-7xl px-4 md:px-6'>
            <div className='rounded-[2rem] border border-slate-200 bg-white/85 px-4 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur md:px-8'>
                <div className='mb-6 flex flex-col gap-2 text-center'>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-[#6A38C2]'>Explore categories</p>
                    <h2 className='text-2xl font-black text-slate-900 md:text-3xl'>Browse jobs by skill</h2>
                    <p className='text-sm text-slate-500'>Quickly jump into the roles that match your background.</p>
                </div>

            <Carousel className='w-full max-w-4xl mx-auto'>
                <CarouselContent>
                    {category.map((cat, index) => (
                            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 py-4 flex items-center'>
                                <Button variant='outline' className='rounded-full w-full py-6 text-center border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-[#6A38C2] hover:text-[#6A38C2] hover:shadow-md' onClick={() => searchJobHandler(cat)}>
                                    {cat}
                                </Button>
                            </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel