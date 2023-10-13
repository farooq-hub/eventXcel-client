import SingleOrder from '../../Components/SingleOrder'
import Sidebar from '../../Components/Admin/Sidebar'

const SingleOrderPage = () => {
  return (

    <div className='bg-gray-100 h-screen'>
        <Sidebar/>
    <div className="flex md:ml-64 lg:ml-64">
      <SingleOrder role='admin'/>
    </div>
  </div>
  
  )
}

export default SingleOrderPage