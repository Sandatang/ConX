import { Alert, Avatar, Divider, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { DynamicText } from "../components/Testimonials/AllTestimonial"
import * as ReportApi from "../network/report_api"
import ModalViewReport from "../components/BugReport/ModalViewReport"

const BugReport = () => {
    const [reports, setReports] = useState(null)
    const [reportToView, setReportToView] = useState(null)
    const [view, setView] = useState(false)

    useEffect(() => {
        const viewAllBugReports = async () => {
            try {
                const response = await ReportApi.viewAllReport();
                setReports(response)
            } catch (error) {
                console.error(error)
            }
        }
        viewAllBugReports()
    }, [])

    const removeReport = async (id) => {
        try {
            const response = await ReportApi.deleteReport(id)
            if(response.status === "Success"){
                return
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Stack className="m-16">
            <Typography variant="h5" className="!text-slate-600">Bug(s) Reported</Typography>
            <Divider />
            <Stack className="!flex-row px-8 py-4">
                {
                    reports && reports.length > 0 ?
                        reports.map((t, index) => (
                            <Stack className="w-[300px] relative p-2 border-[1px] rounded-md shadow-md" key={index}>
                                <Stack>
                                    <Stack className="!flex-row gap-2">
                                        <Avatar />
                                        <Stack>
                                            <Typography variant='h6' className="!text-slate-800 !capitalize">{t.fullName}</Typography>

                                        </Stack>
                                    </Stack>
                                    <Stack className="my-4 line-clamp-2">
                                        <DynamicText text={t.content} maxHeight={100} />
                                    </Stack>
                                </Stack>

                                <Stack className="absolute top-0 right-0 gap-2 pr-4 pt-2">
                                    <button
                                        className="!text-slate-500 !text-sm hover:!text-slate-900"
                                        onClick={() => {
                                            setReportToView(t)
                                            setView(true)
                                        }}
                                    >view</button>
                                    <button
                                        className="!text-slate-500 !text-sm hover:!text-slate-900"
                                        onClick={() => removeReport(t.id)}
                                    >solved</button>
                                </Stack>
                            </Stack>
                        )) : (
                            <Alert severity="info">No data yet.</Alert>
                        )
                }
            </Stack>
            {view && <ModalViewReport onClose={() => setView(false)} report={reportToView} />}
        </Stack>
    )
}

export default BugReport