/* eslint-disable react/prop-types */
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

const Navigation = (props) => {
    const location = useLocation()
    const currentLocation = location.pathname.split("/")[1];
    const addSlashLocation = "/" + currentLocation
    const [rootUrl, setRootUrl] = useState(addSlashLocation)

    useEffect(() => {
    }, [])
    return (
        <Button
            onClick={() => setRootUrl(props.link)}
            variant={`${rootUrl === props.link ? 'contained' : ''}`}
            className={`!w-full !font-semibold !tracking-tighte hover:!text-mainColor ${rootUrl === props.link ? 'text-white':'!text-slate-700'}`}
        >
            <NavLink to={props.link} className="flex justify-start gap-6 w-full">
                {props.icon}
                <span className="!capitalize !text-[1em]  tracking-wide">{props.title}</span>
            </NavLink>
        </Button>
    )
}

export default Navigation