import Sidebar from '../../Components/User/Sidebar'
import Payment from '../../Components/User/Payment'

function PyamentPage() {
  return (
    <div className='bg-gray-100 h-screen'>
    <Sidebar />
   
    <div className="flex md:ml-64 lg:ml-64">
      <Payment/>
    </div>
</div>
  )
}

export default PyamentPage