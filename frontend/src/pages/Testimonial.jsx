import { Create } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalTestimonyOrReport from '../components/Testimonials/ModalTestimonyOrReport';
import * as TestimonyApi from "../network/testimony_api";


const Testimonial = () => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [report, setReport] = useState(false);
    const [testimonies, setTestimonies] = useState(null);

    useEffect(() => {

        const getAllTestimonys = async () => {
            try {
                const response = await TestimonyApi.getAllTestimony();
                setTestimonies(response)
                console.log(response)
            } catch (error) {
                console.error(error)

            }
        }
        getAllTestimonys()
        const timer = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % testimonies.length);
        }, 2000);

        return () => clearTimeout(timer);

    }, [index]);
    const testimonial = testimonies !== null ? testimonies[index] : { fullName: "", content: "", created: "" };

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
                <Stack>
                    <Typography variant='body1' className='!text-slate-700'>
                        <Button onClick={() => {
                            setOpen(true);
                            setReport(false)
                        }}
                            className='!bg-pinkish !text-white' component={"span"}>
                            Write your testimony
                            <Create />
                        </Button>
                    </Typography>
                    <Typography
                        onClick={() => {
                            setOpen(true);
                            setReport(true)
                        }}
                        component={"button"} variant='body2' className='!text-center !text-slate-400 hover:!text-red-500 cursor-pointer'>
                        or report a bug
                    </Typography>
                </Stack>
            </Stack>
            <Stack className='!flex-row gap-4 pb-10'>


                <Card
                    style={{
                        transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)`,
                        zIndex: testimonies && testimonies.length - index
                    }}
                    className={` w-1/2 px-4 !h-64  items-center !shadow-2xl relative justify-center mt-2 rounded-md border-[1px] border-pinkish !shadow-pinkish`} >
                    <Typography className='absolute top-6 -left-4 -rotate-45 z-50 !font-bold bg-yellow-200 py-1 px-2 rounded-tr-md text-xs'>
                        Testimonials
                    </Typography>


                    <CardHeader
                        title={
                            <div className='!flex flex-row justify-end items-center gap-2 '>
                                <div className='!flex flex-col justify-end items-center gap-2 capitalize'>

                                    {testimonial.fullName}
                                    <Typography variant='body2'>
                                        {new Date(testimonial.created).toDateString().split(" ").splice(1).join(" ")}
                                    </Typography>

                                </div>
                            </div>
                        }
                    />


                    <CardContent>
                        <Typography variant="body1">{testimonial.content}</Typography>
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

            {open && <ModalTestimonyOrReport report={report} onClose={() => setOpen(false)} />}

        </Stack >

    );
};

export default Testimonial;
