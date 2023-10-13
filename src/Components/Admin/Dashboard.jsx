import DashboardCards from "../DashboardCards"
import { MdWorkHistory } from "react-icons/md"
import TransactionChart from "../TransactionChart"
import OrderChart from "../OrderChart"
import { useNavigate } from "react-router-dom"
import OrderList from "../OrderList"
import Button from "../CustomComponent/Button"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useEffect, useState } from "react"


const Dashboard = () => {
  const [orderList,setOrderList] = useState([])

  const navigate = useNavigate()
//   const updateAdminData=()=>{
    
//   }

  useEffect(()=>{

  },[])

  return (
    <>
        <div className="w-full grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-md ">
                <DashboardCards icon={<MdWorkHistory className="text-gray-300"/>}/>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-md ">
                <DashboardCards icon={<MdWorkHistory className="text-gray-300"/>}/>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-md ">
                <DashboardCards icon={<MdWorkHistory className="text-gray-300"/>}/>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-md ">
                <DashboardCards icon={<MdWorkHistory className="text-gray-300"/>}/>
            </div>
        </div> 
                <div className="w-full grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-md ">
                <DashboardCards icon={<MdWorkHistory className="text-gray-300"/>}/>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-md ">
                <DashboardCards icon={<MdWorkHistory className="text-gray-300"/>}/>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-md ">
                <DashboardCards icon={<MdWorkHistory className="text-gray-300"/>}/>
            </div>
 
        </div> 
        <div>
            <OrderChart/>
        </div>
        <div>
            <TransactionChart/>
        </div>
        <div className="">
          <OrderList role='admin' path='/dashboard' title='latest Salse' orderList={orderList} setOrderList={setOrderList}/>
          {orderList&&orderList.length&&orderList.length == 5&&
            <div  className="flex items-center justify-center p-4 w-full">
            <Button  className={'text-center my-8 animate-bounce text-blue-800 text-[1rem]'} handelEvent={()=>navigate('/admin/orders')} content={<p className='flex items-center '>See More<span><AiOutlineArrowRight className='text-blue-600 mx-2'/></span></p>}/>
          </div>}
          {/* <div className="mb-10">
            <WalletHistory role='user' walletHistory={userData?.walletHistory}/>
          </div> */}
        </div>

    </>
  )
}

export default Dashboard