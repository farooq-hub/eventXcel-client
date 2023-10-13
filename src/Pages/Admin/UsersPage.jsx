import Sidebar from "../../Components/Admin/Sidebar";
import UserList from "../../Components/Admin/UserList";

const UsersPage = () => {
    return(
        <div className='bg-gray-100 h-full min-h-screen min-w-screen font-sans overflow-hidden'>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">
                <UserList />
            </div>
 -       </div>
    )
}

export default UsersPage;