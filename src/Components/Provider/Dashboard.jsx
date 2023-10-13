import DashboardCards from "../DashboardCards"
import { MdWorkHistory } from "react-icons/md"
import TransactionChart from "../TransactionChart"
import OrderChart from "../orderChart"
import Button from "../CustomComponent/Button"
import OrderList from "../OrderList"
import { useNavigate } from "react-router-dom"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Transation from "./Transation"


const Dashboard = () => {

  const provider = useSelector((state) => state.provider.providerData);

  const navigate = useNavigate()
  
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
        <div>
            <OrderChart/>
        </div>
        <div>
            <TransactionChart/>
        </div>
        <div className="">
          <OrderList role='provider' path='/dashboard' title='latest Salse'/>
            <div  className="flex items-center justify-center p-4 w-full">
            <Button  className={'text-center my-8 animate-bounce text-blue-800 text-[1rem]'} handelEvent={()=>navigate('/provider/orders')} content={<p className='flex items-center '>See More<span><AiOutlineArrowRight className='text-blue-600 mx-2'/></span></p>}/>

            </div>
            <Transation/>
        </div>

    </>
  )
}

export default Dashboard