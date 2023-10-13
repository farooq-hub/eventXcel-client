import Sidebar from "../../Components/Provider/Sidebar";
import Profile from "../../Components/Provider/Profile";


function ProfilePage() {
    return (
        <div className='bg-gray-100 h-screen'>
            <Sidebar />
     
            <div className="flex md:ml-64 lg:ml-64">
              <Profile/>
            </div>
        </div>
    )
  }
  
  export default ProfilePage