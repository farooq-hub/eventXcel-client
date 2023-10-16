import  { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { usersGet } from '../Services/userApi';
import { providerGet } from '../Services/providerApi';
import { adminGet } from '../Services/adminApi';
import { AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


const OrderList = ({role,path,title,orderList,setOrderList}) => {


  const [noMore,setNoMore] = useState(false)
  const [filter,setFilter] =useState('all')
  const [loading,setLoading] =useState('getingOrders')
  const navigate = useNavigate()  


  const getOrderData =async () => {
    if(!noMore){
      setLoading('getingOrders')
      let result
      if(role =='user')result = await usersGet(`/orders?skip=${orderList.length}&filter=${filter}&path=${path}&role=${role}`)
      else if(role =='provider')result = await providerGet(`/orders?skip=${orderList.length}&filter=${filter}&path=${path}&role=${role}`)
      else if(role =='admin')result = await adminGet(`/orders?skip=${orderList.length}&filter=${filter}&path=${path}&role=${role}`);
        console.log(result,result.orderList);
        if(result.orderList)setOrderList(result.orderList)
        if(result?.orderList?.length%10 != 0||path=='/profile')setNoMore(true)
        setLoading('')
    }
  }

  useEffect(()=>{
    if(path=='/dashboard'){
      setTimeout(()=>{
          getOrderData()
      },3000)
    }else getOrderData()
  },[])

  return (
    <section className="container px-4 mx-auto ">
      <div className=" bg-gray-200 shadow-sm p-4">
        <h1 className="text-xl font-serif text-center text-gray-800 capitalize lg:text-2xl">{title?title:'ORDERS'}</h1>
      </div>
      <div className="flex flex-col mt-4">
        <div className="inline-block min-w-full  align-middle ">
            <div className="overflow-scroll  rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 -divide-gray-700 ">
                    <thead className="bg-gray-50 -bg-gray-800 ">
                        <tr className='text-gray-700 capitalize font-medium text-[.999rem] '>
                            <th  className='font-medium text-left pl-4 border-l'>#</th>
                            <th className='font-medium text-center py-4 px-4 border-l'>{role == 'provider' ? 'customer' : role == 'user' ? 'Provider' : 'provider'}</th>
                            {role == 'admin' ? <th className='font-medium text-center py-4 px-4 border-l'>customer</th> : ''}
                            <th className='font-medium text-center py-4 px-4 border-l'>Order At</th>
                            <th className='font-medium text-center py-4 px-4 border-l'>Amount</th>
                            <th className='font-medium text-center py-4 px-4 border-l'>status</th>
                            <th className='font-medium text-center py-4 px-4 border-l'>action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                        {loading !=='getingOrders'?(orderList?.length&&orderList?.length > 0?
                        orderList.map((order)=>(
                            <tr className='hover:bg-gray-200 text-gray-600' key={order._id}>
                                <td className=' border-b   py-1 text-sm  capitalize md:break-all whitespace-normal text-left pl-4'># {order._id}</td>
                                <td className=' border-b   px-2 py-2.5 text-sm  capitalize md:break-all whitespace-normal text-center'>
                                {role == 'provider' ? order?.name : role == 'user' ? order?.providerId?.name : order?.providerId?.name}</td>
                                {role == 'admin' ?<td className=' border-b   px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center'>{order?.name}</td>:''}
                                <td className=' border-b   px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center'>
                                {(() => new Date(order.orderCreatedAt).toLocaleDateString("en-US", {year: "numeric",month: "short",day: "numeric"}))()}</td>
                                <td className=' border-b   px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center'>₹ {order.grandTotal}.00</td>
                                <td className={`${order.status == 'Confirmed'?'text-blue-800':(order.status =='Completed'?'text-green-800':'text-red-600')}  border-b px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center`}>{order.status}</td>
                                <td className='   border-b px-4 py-3.5 '><AiOutlineEye className='text-center mx-auto text-lg'
                                    onClick={()=>{role == 'provider' ? navigate(`/provider/order?id=${order._id}`) 
                                    : role == 'user' ?  navigate(`/order?id=${order._id}`) 
                                    : role == 'admin' ? navigate(`/admin/order?id=${order._id}`):''}}
                                    /></td>
                            </tr>)):
                            <tr className='hover:bg-gray-200 '>
                                <td colSpan={7} className='text-red-600 px-4 py-3.5 text-[.98rem]  capitalize break-all whitespace-normal text-center'><p className='my-2'>No orders yet...!!!</p></td>
                            </tr>
                        ):
                        [1,2,3,4,5].map((val)=>(
                        <tr className='animate-pulse' key={val+19999}>
                            <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8 '></p></td>
                            <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8 w-16 mx-auto'></p></td>
                            <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8  mx-auto'></p></td>
                            {role == 'admin' ?<td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8  mx-auto'></p></td>:""}
                            <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8  mx-auto'></p></td>
                            <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8 w-20 mx-auto'></p></td>
                            <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  flex space-x-1 justify-center'><p className=' bg-gray-200 h-8 w-16'></p><p className=' bg-gray-200 h-8 w-16'></p></td>
                        </tr>))
                        }
                    </tbody>
                </table>

            </div>
        </div>
      </div>

    </section>
  )
}

OrderList.propTypes = {
  role: PropTypes.string.isRequired, // Define the expected type and mark it as required
  path:PropTypes.string,
  title:PropTypes.string,
  orderList:PropTypes.any,
  setOrderList:PropTypes.any
};

export default OrderList