import { Create } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalTestimonyOrReport from '../components/Testimonials/ModalTestimonyOrReport';
import * as TestimonyApi from "../network/testimony_api";
import { NavLink } from 'react-router-dom';


const Testimonial = () => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [report, setReport] = useState(false);
    const [testimonies, setTestimonies] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const getAllTestimonys = async () => {
            try {
                const response = await TestimonyApi.getAllTestimony();
                if (isMounted) {
                    setTestimonies(response);

                    if (response && response.length > 0) {
                        const timer = setInterval(() => {
                            setIndex(prevIndex => (prevIndex + 1) % response.length);
                        }, 2000);

                        return () => clearInterval(timer);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        getAllTestimonys();

        return () => {
            isMounted = false;
        };
    }, []);
    const testimonial = testimonies !== null ? testimonies[index] : { fullName: "", content: "", created: "" };

    return (

        <Stack className="w-full h-screen overflow-y-auto no-scrollbar justify-center pt-14 md:pt-10 px-2 md:px-16 ">
            <Stack className=' items-center '>
                <Typography variant='h3' className='md:!text-center !text-2xl'>{"Women's Experiences"}</Typography>
                <Typography variant='h3' className='md:!text-center !text-2xl'> and <span className='!text-pinkish'>Feedback</span></Typography>
                <Typography variant='body2' className='md:!text-center md:w-3/4 !text-slate-600'>
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
            <Stack className='!flex-col-reverse md:!flex-row md:gap-4 md:pb-10'>

                <Card
                    style={{
                        transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)`,
                        zIndex: testimonies && testimonies.length - index
                    }}
                    className={` md:w-1/2 px-4 h-[17rem] md:!h-64  items-center !shadow-2xl relative justify-center mt-2 rounded-md border-[1px] border-pinkish !shadow-pinkish`} >
                    <Typography className='absolute top-6 -left-4 -rotate-45 z-50 !font-bold bg-yellow-200 py-1 px-2 rounded-tr-md text-xs'>
                        Testimonials
                    </Typography>


                    <CardHeader
                        title={
                            testimonial ? (
                                <div className='!flex flex-row justify-end items-center gap-2 '>
                                    <div className='!flex flex-col justify-end items-center gap-2 capitalize'>

                                        {testimonial.fullName}
                                        <Typography variant='body2'>
                                            {new Date(testimonial.created).toDateString().split(" ").splice(1).join(" ")}
                                        </Typography>

                                    </div>
                                </div>
                            ) : (
                                <div className='!flex flex-row justify-end items-center gap-2 '>
                                    <div className='!flex flex-col justify-end items-center gap-2 capitalize'>

                                        <Typography variant='body1'>
                                            List of our Testimonials
                                        </Typography>

                                    </div>
                                </div>
                            )
                        }
                    />


                    <CardContent>
                        <Typography variant="body1">{testimonial && testimonial.content}</Typography>
                    </CardContent>

                    <Button component={NavLink} to={"../testimonial/view"} className='!absolute bottom-0 right-0 !text-slate-600'>See all</Button>
                </Card >

                <div className='border-[1px] md:h-full' />
                <Stack className='md:w-1/2 md:py-16 px-2 md:px-14 gap-2' >
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
