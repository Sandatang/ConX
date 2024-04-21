/* eslint-disable react/prop-types */
import { Breadcrumbs } from "@mui/material"
import { Link } from "react-router-dom"

const BreadCrumb = (props) => {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb" className="!text-white">
                {
                    props.data.map((dt) => (
                        <div key={dt.name}>
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                to={dt.url}
                                className={`${props.classes} capitalize hover:underline underline-offset-1`}
                            >
                                {/* <Home sx={{ mr: 0.5 }} fontSize="inherit" /> */}
                                {dt.name}
                            </Link>
                            <span className={`${props.classes} pl-4`}>/</span>
                        </div>
                    ))

                }
            </Breadcrumbs>
        </div>
    )
}

export default BreadCrumb