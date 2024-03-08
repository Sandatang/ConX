/* eslint-disable react/prop-types */
// import React from 'react'
import { useState } from "react";
import logoImg from "../assets/logo.png"
import SmallDeviceDrawer from "./Drawer";
import Logout from "./Logout";

export const Header = () => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [userName, setUserName] = useState("Maria Ty");

    // Function to handle the logout action
    const handleLogout = () => {
        setProfileOpen(!isProfileOpen); // Close the profile dropdown
        // Add logout logic here
    };

    return (
        //  max-w-screen-2xl
        <nav className="w-full top-0 shadow-xl pb-2 z-50 antialiased text-slate-900 dark:text-slate-800 bg-white">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className=" absolute md:hidden inset-y-0 left-0 flex items-center ">
                        <SmallDeviceDrawer />
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center md:justify-start">
                        <div className="flex flex-col flex-shrink-0 items-center md:items-start">
                            <img
                                className="h-[8rem] w-auto mt-6"
                                src={logoImg}
                                alt="Campus Core logo"
                            />
                            {/* <span className=" hidden sm:block   text-[8px] font-semibold ">
                                Connecting and Empowering Female Communities
                            </span> */}
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        <div className="relative ml-3">
                            <Logout />
                        </div>
                    </div>
                </div>
            </div>


            {isProfileOpen && (
                <div
                    onClick={handleLogout}
                    className=" absolute top-0 right-0 border mr-20 bg-slate-700 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none inset-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                    id="profile-dropdown"
                >
                    <div className="py-1" role="none">
                        <button
                            className="block px-4 py-2 text-sm text-white"
                            onClick={handleLogout}
                        >
                            <Logout/>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};