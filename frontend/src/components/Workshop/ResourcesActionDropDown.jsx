/* eslint-disable react/prop-types */
import { MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ResourceModalDeletionMssg from "./ResourceModalDeletionMssg";

const ResourcesActionDropDown = (props) => {
    const [isDelete, setIsDelete] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className="absolute top-3 right-0">
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="!absolute top-[-1em] right-0 hover:!bg-transparent"
            >
                <MoreHoriz className="!text-pinkish"/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

            >
                <MenuItem className="!font-sm !text-slate-600" onClick={() => {
                    handleClose()
                    props.setUpdatePost()
                    props.setPostToUpdate()
                }}>Edit</MenuItem>
                <MenuItem
                    onClick={() => setIsDelete(true)}
                    className="!font-sm !text-slate-600" >Delete</MenuItem>
            </Menu>

            <ResourceModalDeletionMssg open={isDelete} postToDelete={props.toDelete} close={() => {
                handleClose()
                setIsDelete(false)
            }} />
        </div>
    )
}

export default ResourcesActionDropDown