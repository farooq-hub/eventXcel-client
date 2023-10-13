import OrderList from '../../Components/OrderList'
import Sidebar from '../../Components/Admin/Sidebar'
import { useState } from 'react'

const OrderPage = () => {

    const [orderList,setOrderList] = useState([])

  return (
    <div className='bg-gray-100 h-screen'>
    <Sidebar />

    <div className="flex md:ml-64 lg:ml-64">
      <OrderList role='admin' orderList={orderList} setOrderList={setOrderList}/>
    </div>
  </div>
  )
}

export default OrderPage