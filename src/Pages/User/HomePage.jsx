import { useEffect, useState } from "react";
import Home from "../../Components/User/Home";
import Sidebar from "../../Components/User/Sidebar";
import Button from "../../Components/CustomComponent/Button";
import { SlArrowUp } from "react-icons/sl";

const HomePage = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 100) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        };
        window.addEventListener('scroll', handleScroll)
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    return (

        <div className='max-w-screen'>

            <Sidebar/>
            {showButton && (
                <div className="fixed z-50 h-12 w-12 text-center rounded-full bg-slate-200 duration-300 hover:bg-slate-300 right-2 bottom-2 animate-bounce" >
                    <Button className=" text-lg font-mono text-gray-900 h-full rounded space-x-2 transition duration-100"
                    handelEvent={scrollToTop} content={<>
                        <SlArrowUp className="text-xl text-black"/></>}/>
                </div>)}
            <div className='flex md:ml-64 lg:ml-64 bg-white'>
                <Home/>
            </div>
        </div>

    );
};
export default HomePage