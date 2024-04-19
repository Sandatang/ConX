/* eslint-disable react/prop-types */
import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"

const Navigation = (props) => {
    return (
        <Button
            component={NavLink}
            to={props.link}
            variant="text"
            sx={{
                '&.active': {
                    background: '#EB80D9',
                    color: '#fff',
                },
                color: 'rgb(71 85 105)',
            }}
        className={` !w-full !font-semibold px-2 py-1 !tracking-tighter !justify-start gap-6 hover:!text-mainColor -700`}
        >
            {props.icon}
            <span className="!capitalize !text-[1em] tracking-wide">{props.title}</span>
        </Button>
    )
}

export default Navigation