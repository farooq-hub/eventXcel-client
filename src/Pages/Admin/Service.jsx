import Sidebar from "../../Components/Admin/Sidebar";
import ServiceList from "../../Components/Admin/ServiceList";

const Service = () => {

    return(
        <div className='bg-gray-100 min-h-screen min-w-screen font-sans overflow-hidden'>
            <Sidebar />
            <div className="flex md:ml-64 lg:ml-64 ">
                <ServiceList/>
            </div>
        </div>
    )

}

export default Service;