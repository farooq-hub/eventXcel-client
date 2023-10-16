import { useState } from "react";
import { useSelector } from "react-redux";
import useSize from '../../utils/useWidthSize'
import NavItem from "../NavItem";
import { FaHome } from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi'
import {  GrPowerShutdown } from 'react-icons/gr'
import { HiOutlineUserGroup } from 'react-icons/hi'
import {AiOutlineUser} from 'react-icons/ai'
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../CustomComponent/Button";
import { IoWalletOutline } from "react-icons/io5";



const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()
    const widthSize = useSize();
    const navigate = useNavigate()
    const {token,userData:{wallet}} = useSelector(state => state.user)
    const toggleSidebar = () => {
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

   
    return (

        <div className={` z-50 relative bg-white`}>
            <div
                className={`fixed  inset-y-0 left-0 z-50 w-64 bg-white text-black  border-r h-screen border-black-100 shadow transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
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
                <div className="flex-row">

                    <div className="mt-5 ml-5">
                        <h1 className="font-sans font-black text-slate-900 text-3xl italic">Event<span className=" font-mono text-5xl text-red-950 leading-none">X</span>cel</h1>
                        <p className="text-sm font-semibold pb-6">Lets make..</p>
                    </div>
                    <NavItem icon={<FaHome/>} active={location.pathname == '/'?true:false} name={"HOME"} path={'/'} />
                    <NavItem icon={<HiOutlineUserGroup/>}  active={location.pathname.startsWith('/providers')} name={"PROVIDERS"} path={'/providers'} />
                    {/* <NavItem icon={faComment} name={'CHAT'} path={'/chat'} /> */}
                    {/* <NavItem icon={faUser} name={"PROFILE"} path={'/profile'} /> */}
                    {/* <NavItem icon={faCircleInfo} name={'MORE'} path={'/more'} /> */}
                    {/* <NavItem icon={faHandshakeAngle} name={'HELP'} path={'/help'} /> */}
                    {token ?
                        <NavItem icon={<AiOutlineUser/>} active={location.pathname == '/profile'||location.pathname == '/orders'||location.pathname == '/order'?true:false} name={'PROFILE'} path={'/profile'} />
                        : 
                        <></>
                    }
                    {token ?
                        <NavItem icon={<GrPowerShutdown/>} name={'LOGOUT'} path={'/login'} />
                        : 
                        <NavItem icon={<FiLogIn/>} name={'LOGIN'} path={'/login'} />
                    }
                    {token ?
                        <div className="absolute z-50  bottom-3 left-3 flex ">
                            <Button className="text-lg font-mono flex items-center hover:underline text-gray-900 rounded space-x-2 transition duration-100"
                                handelEvent={() => navigate('/profile#transationHistory')} content={<>
                                <IoWalletOutline className="text-2xl text-blue-600"/><span className="mx-4">:</span>{wallet?<span>₹ {wallet}.00</span>:wallet==0?<span>₹ 0.00</span>:
                                <div className="h-5 w-5 border-2 rounded-full bg-white border-t-transparent animate-spin border-gray-900"></div>}</>}/>
                        </div>       
                        : 
                        <></>
                    }
                </div>
            </div>


            <div className={`flex flex-col flex-grow`}>

                <div className="border-r  border-black-100 shadow transition-transform duration-300 ease-in-out transform">
                    <div className="flex items-center justify-between px-4 py-3 bg-white">
                        <div >

                            <button
                                onClick={toggleSidebar}
                                className="block text-gray-500 hover:text-black  focus:outline-none md:hidden"
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
                        </div>
                       
                        <div>

                        </div>
                    </div>
                </div>
                
            </div>


            {isOpen && (
                <div
                    className="fixed md:hidden inset-0 bg-black opacity-50 cursor-pointer"
                    onClick={closeSidebar}
                />
            )}
        </div>
    );

};

export default Sidebar;