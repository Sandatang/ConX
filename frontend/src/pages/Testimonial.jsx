import { Approval } from '@mui/icons-material';
import { Avatar, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';


const defaultTestimonials = [
    {
        name: 'John Doe',
        position: 'CEO',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        avatarSrc: 'https://via.placeholder.com/150',
    },
    {
        name: 'Jane Smith',
        position: 'Designer',
        comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        avatarSrc: 'https://via.placeholder.com/150',
    },
    {
        name: 'Alice Johnson',
        position: 'Developer',
        comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        avatarSrc: 'https://via.placeholder.com/150',
    },
];

const Testimonial = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % defaultTestimonials.length);
        }, 2000);

        return () => clearTimeout(timer);
    }, [index]);

    const { name, position, comment, avatarSrc } = defaultTestimonials[index];
    return (

        <Stack className="w-full h-screen overflow-y-auto no-scrollbar justify-center pt-8 px-16 ">
            <Stack className=' items-center '>
                <Typography variant='h3' className='!text-center'>{"Women's Experiences"}</Typography>
                <Typography variant='h3' className='!text-center'> and <span className='!text-pinkish'>Feedback</span></Typography>
                <Typography variant='body2' className='!text-center w-3/4 !text-slate-600'>
                    Discover empowering stories and experiences shared by remarkable women from diverse backgrounds. Our testimonials page celebrates the strength, resilience, and achievements of women, inspiring others to break barriers, pursue their dreams, and create positive change in their communities and beyond.
                </Typography>
            </Stack>
            <Stack className='!flex-row justify-end py-10 items-center'>
                <Typography variant='body1' className='!text-slate-700'>
                    Add your testimony
                    <Button component={"span"}><Approval /></Button>
                </Typography>
            </Stack>
            <Stack className='!flex-row gap-4 pb-10'>


                <Card
                    style={{
                        transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)`,
                        zIndex: defaultTestimonials.length - index
                    }}
                    className={` w-1/2 px-4 !h-64  items-center shadow-xl relative justify-center mt-2 rounded-md`} variant='outlined'>
                    <Typography className='absolute top-6 -left-4 -rotate-45 z-50 !font-bold bg-yellow-200 py-1 px-2 rounded-tr-md text-xs'>
                        Testimonials
                    </Typography>


                    <CardHeader
                        title={
                            <div className='!flex flex-row justify-end items-center gap-2 '>
                                <div className='!flex flex-col justify-end items-center gap-2'>

                                    <Avatar src={avatarSrc} className='!h-16 !w-16' alt={"asdasdas"} />
                                    {name}
                                    <Typography variant='body2'>

                                        {position}
                                    </Typography>

                                </div>
                            </div>
                        }
                    />


                    <CardContent>
                        <Typography variant="body1">{comment}</Typography>
                    </CardContent>
                </Card >

                <div className='border-[1px] h-full' />
                <Stack className='w-1/2 py-16 px-14 gap-2' >
                    <Typography variant='h5'>
                        Strengthening online reputation support success
                    </Typography>
                    <Typography variant='body2' className='!text-slate-600'>
                        Online reputation is the key to success. A strong oneline
                        reputation opens up more opportunities.
                    </Typography>
                </Stack>

            </Stack>

        </Stack >

    );
};

export default Testimonial;
