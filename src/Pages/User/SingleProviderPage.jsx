import Sidebar from '../../Components/User/Sidebar'
import SingleProvider from '../../Components/User/SingleProvider'

const SingleProviderPage = () => {
  return (
    <div className='bg-gray-100 h-screen'>
        <Sidebar />
   
        <div className="md:ml-64 lg:ml-64">
            <SingleProvider/>
        </div>
    </div>

  )
}

export default SingleProviderPage