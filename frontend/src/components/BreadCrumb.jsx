/* eslint-disable react/prop-types */
import { Home } from "@mui/icons-material"
import { Breadcrumbs } from "@mui/material"
import { Link } from "react-router-dom"

const BreadCrumb = (props) => {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                {
                    props.data.map((dt) => (
                        <Link
                            key={dt.url }
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            to={dt.url}
                            className={`${props.classes}`}
                        >
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            {dt.name}
                        </Link>
                    ))

                }
            </Breadcrumbs>
        </div>
    )
}

export default BreadCrumb