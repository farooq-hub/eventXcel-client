import Sidebar from "../../Components/Admin/Sidebar";
import ProviderList from "../../Components/Admin/ProviderList";

const ProviderPage = () => {
    return (
        <div className='bg-gray-100 h-full min-h-screen min-w-screen font-sans overflow-hidden'>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">
                <ProviderList />
            </div>
        </div>
    )
}

export default ProviderPage;