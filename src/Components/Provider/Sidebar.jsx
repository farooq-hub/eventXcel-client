import { useState } from "react";
import { FaHome,FaIdCard } from 'react-icons/fa'
import { GrPowerShutdown } from 'react-icons/gr'
import {AiOutlineUser} from 'react-icons/ai'
import useWidthSize from "../../utils/useWidthSize";
import NavItem from '../NavItem'
import { useLocation, useNavigate } from "react-router-dom";
import { TbTableOptions } from "react-icons/tb";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { useSelector } from "react-redux";
import Button from "../CustomComponent/Button";
import { IoWalletOutline } from "react-icons/io5";

const Sidebar = () => {
   
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()
    const {providerData:{wallet}} = useSelector(state => state.provider)
    const navigate = useNavigate()

    const widthSize = useWidthSize();
    const toggleSidebar = () => {
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

   
    return (

        <div className="flex">
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-black  border-r  border-black-100 shadow transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <div className=" ">

                    {widthSize < 768 && (
                        <button
                            onClick={closeSidebar}
                            className="text-black hover:text-gray-500 focus:text-gray-500 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>
                <div >

                    <div className="mt-5 ml-5">
                        <h1 className="font-sans font-black text-slate-900 text-3xl ">ELITE</h1>
                        <p className="text-sm font-semibold pb-6">Lets make..</p>

                    </div>
                    <NavItem icon={<FaHome/>} active={location.pathname == '/provider'?true:false} name={"HOME"} path={'/provider'} />
                    {/* <NavItem icon={<FaIdCard/>} name={'CHAT'} path={'/provider/chat'} /> */}
                    {/* <NavItem icon={faServer} name={"SERVICES"} path={'/provider/services'} /> */}
                    <NavItem icon={<FaIdCard/>} active={location.pathname == '/provider/post'?true:false} name={'POSTS'} path={'/provider/post'} />
                    <NavItem icon={<TbTableOptions/>} name={"OPTION"} active={location.pathname == '/provider/option'?true:false} path={'/provider/option'} />
                    <NavItem icon={<HiMiniClipboardDocumentList/>}  active={location.pathname == '/provider/orders'?true:false} name={"ORDER"} path={'/provider/orders'} />
                    <NavItem icon={<AiOutlineUser/>} name={"PROFILE"} active={location.pathname == '/provider/profile'?true:false} path={'/provider/profile'} />
                    <NavItem icon={<GrPowerShutdown/>} name={"LOGOUT"} path={'/provider/login'} />
                    <div className="absolute z-50  bottom-3 left-3 flex ">
                        <Button className="text-lg font-mono flex items-center hover:underline text-gray-900 rounded space-x-2 transition duration-100"
                            handelEvent={() => navigate('/provider#transationHistory')} content={<>
                            <IoWalletOutline className="text-2xl text-blue-600"/><span className="mx-4">:</span>{wallet?<span>₹ {wallet}.00</span>:
                            <div className="h-5 w-5 border-2 rounded-full bg-white border-t-transparent animate-spin border-gray-900"></div>}</>}/>
                    </div>       


                </div>
            </div>


            <div className="flex flex-col flex-grow">
                <div className="border-r  border-black-100 shadow transition-transform duration-300 ease-in-out transform">
                    <div className="flex items-center justify-between px-4 md:px-0 md:py-0 py-3 bg-white">
                        <div className="flex w-full md:hidden">
                            <button
                                onClick={toggleSidebar}
                                className="block text-gray-500 hover:text-gray-600 focus:text-white focus:outline-none "
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                            <h1 className="text-2xl font-serif mx-auto">Elit</h1>
                        </div>
                       
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 cursor-pointer"
                    onClick={closeSidebar}
                />
            )}
        </div>
    );

};

export default Sidebar;