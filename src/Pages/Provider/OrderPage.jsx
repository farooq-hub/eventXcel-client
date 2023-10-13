import OrderList from '../../Components/OrderList'
import Sidebar from '../../Components/Provider/Sidebar'

const OrderPage = () => {
  return (
    <div className='bg-gray-100 h-screen'>
    <Sidebar />

    <div className="flex md:ml-64 lg:ml-64">
      <OrderList role='provider'/>
    </div>
  </div>
  )
}

export default OrderPage