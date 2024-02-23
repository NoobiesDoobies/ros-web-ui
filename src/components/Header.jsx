import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex bg-black text-white items-center p-4 border-y-2">
            <div className="absolute flex items-center ">
                <img src="/assets/logo_garudago-cropped.png" alt="GarudaGo Logo" className="h-10 w-10 mr-4" />
                <h1 className="font-bold font-sans">KRAI ITB</h1>
            </div>
            <div className="flex-1 flex gap-16 justify-center items-center">
                <NavLink to="/robot" className="p-2 hover:bg-yellow-200 hover:text-black">Robot</NavLink>
                <NavLink to="/motor" className="p-2 hover:bg-yellow-200 hover:text-black">Motor</NavLink>
                <NavLink to="/vision" className="p-2 hover:bg-yellow-200 hover:text-black">Vision</NavLink>
            </div>
        </div>
    );
};

export default Header;