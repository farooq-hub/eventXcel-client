import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usersGet, usersPatch } from '../Services/userApi';
import { providerGet } from '../Services/providerApi';
import { adminGet } from '../Services/adminApi';
import OptionDetails from './OptionDetails';
import { BsStripe } from 'react-icons/bs';
import Button from './CustomComponent/Button';
import Modal from './CustomComponent/Modal';
import { AiOutlineWarning } from 'react-icons/ai';
import { RiFeedbackLine } from 'react-icons/ri';
import OrderReview from './User/OrderReview';

const SingleOrder = ({role}) => {

    const [orderData,setOrderData] = useState({})
    const [cancellations,setCancelation] = useState(true)
    const [loading,setLoading] =useState('')
    const [modal,setModal] =useState('')
    const location = useLocation();
    const navigate = useNavigate()


    const getOrderData =async () =>{
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        console.log(id);
        if(id&&id!='null'){
            setLoading('getingOrderData')
            let result
            if(role =='user')result = await usersGet(`/order/${id}`)
            else if(role =='provider')result = await providerGet(`/order/${id}`)
            else if(role =='admin')result = await adminGet(`/order/${id}`);
                console.log(result);
                if(result?.orderData?.status == 'Completed'&&
                        !result?.orderData?.providerId?.feedback.some(feedbackEntry => feedbackEntry.userId === result?.orderData?.customerId)){
                    
                    console.log('ADSGHDAUXGAKJDHADJKHADJH',result?.orderData?.providerId?.feedback);
                    setModal('reviewModal')}
                if(result?.orderData)setOrderData(result.orderData)
                else role =='user'?navigate('/orders'):role =='provider'?navigate('/provider/orders'):role =='admin'?navigate('/admin/orders'):""
                isCanclation(result?.orderData?.orderCreatedAt,result?.orderData?.status)
                setLoading('')
        }else{
            role =='user'?navigate('/orders'):role =='provider'?navigate('/provider/orders'):role =='admin'?navigate('/admin/orders'):""
        }
    }

    const isCanclation = (date,status) =>{
        if(date){
            const orderCreatedAt =new Date(date)
            const sevenDaysAfterOrderCreated = new Date(orderCreatedAt);
            sevenDaysAfterOrderCreated.setDate(orderCreatedAt.getDate() + 7);
            const currentDate = new Date();
            if(currentDate > sevenDaysAfterOrderCreated||status == 'Cancelled') setCancelation(false)
        }
    }

    const cancelTheOrder =async () => {
        setLoading('cancelOrder')
        cancellations && await usersPatch(`/orders?id=${orderData._id}`).then((res)=>{
            if(res.status)setOrderData((pre)=>({
                ...pre,
                status:'Cancelled',
                orderCancelledAt:res?.date
            }))
            setLoading('')
            setModal('')
            setCancelation(false)
        })
    } 

    useEffect(()=>{
        getOrderData()
    },[])
  return (
    <div className='px-2 w-full'>
        <div className="grid bg-white grid-cols-1 lg:grid-cols-7">
            <div className="md:col-span-3 grid grid-rows-2 ">
                <div className="sm:p-2">
                    <div className=" bg-gray-100 rounded-sm p-3 ">
                        <h1 className="text-lg font-serif text-center text-gray-800 capitalize lg:text-xl">CUSTOMER DETAILS</h1>
                    </div>
                    <div className='flex flex-col text-black text-[.95rem] md:text-[1rem] font-medium items-center my-4 justify-center space-y-4 '>
                        {loading !== 'getingOrderData' ? 
                            <>
                                <div className='w-full flex justify-center'>
                                    <div className='sm:w-1/2 space-y-5 text-end'>
                                        <p  className='mx-1 md:mx-7'>Name</p>
                                        <p  className='mx-1 md:mx-7'>Email</p>
                                        <p  className='mx-1 md:mx-7'>Mobile</p>
                                        <p  className='mx-1 md:mx-7'>Event Date</p>
                                        <p  className='mx-1 md:mx-7'>Address</p>
                                    </div>
                                    <div className='space-y-5'><p>:</p><p>:</p>
                                        <p>:</p><p>:</p><p>:</p>
                                    </div>
                                    <div className='sm:w-1/2  space-y-5 font-normal text-start text-gray-600'>
                                        <p className='mx-1 md:mx-7'>{orderData?.name}</p>
                                        <p className='mx-1 md:mx-7'>{orderData?.email}</p>
                                        <p className='mx-1 md:mx-7'>{orderData?.mobile}</p>
                                        <p className='mx-1 md:mx-7'>{orderData?.eventDate?.split('T')[0]}</p>
                                        <div className='mx-1 md:mx-7 flex'>
                                            <div className='space-y-2 text-start text-black'>
                                                <p className='mr-2'>Landmark</p>
                                                <p className='mr-2'>City</p>
                                                <p className='mr-2'>District</p>
                                                <p className='mr-2'>Zip</p>
                                            </div>
                                            <div className='space-y-2'><p>:</p><p>:</p><p>:</p><p>:</p></div>
                                            <div className='space-y-2 font-normal text-start text-gray-600'>
                                                <p className='ml-2'>{orderData?.address?.landmark}</p>
                                                <p className='ml-2'>{orderData?.address?.city}</p>
                                                <p className='ml-2'>{orderData?.address?.district}</p>
                                                <p className='ml-2'>{orderData?.address?.zip}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :[1,2,3,4].map((val)=>(
                            <div key={val+199999} className='flex space-x-5'><p className='w-44 h-8 bg-gray-300 animate-pulse'/>
                                <p className='w-44 h-8 bg-gray-300 animate-pulse'/><p className='w-4'/>
                            </div>
                            ))
                        }
                    </div>

                </div>
                <div className="sm:p-2 border-b">
                    <div className=" bg-gray-100 rounded-sm p-3 ">
                        <h1 className="text-lg font-serif text-center text-gray-800 lg:text-xl">PROVIDER DETAILS</h1>
                    </div>

                    <div className='flex flex-col items-center my-4 justify-center space-y-4 text-black text-[.95rem] md:text-[1rem] font-medium'>
                        {loading !== 'getingOrderData' ? 
                            <>
                                <div className='w-full flex justify-center'>
                                    <div className='sm:w-1/2 space-y-5 text-end'>
                                        <p  className='mx-1 md:mx-7'>Name</p>
                                        <p  className='mx-1 md:mx-7'>Email</p>
                                        <p  className='mx-1 md:mx-7'>Mobile</p>
                                        <p  className='mx-1 md:mx-7'>Location</p>
                                    </div>
                                    <div className='space-y-5'><p>:</p><p>:</p>
                                        <p>:</p><p>:</p>
                                    </div>
                                    <div className='sm:w-1/2  space-y-5 font-normal text-start text-gray-600'>
                                        <p className='mx-1 md:mx-7'>{orderData?.providerId?.name}</p>
                                        <p className='mx-1 md:mx-7'>{orderData?.providerId?.email}</p>
                                        <p className='mx-1 md:mx-7'>{orderData?.providerId?.phone}</p>
                                        <p className='mx-1 md:mx-7'>{orderData?.providerId?.location}</p>
                                    </div>
                                </div>
                            </>
                            :[1,2,3,4].map((val)=>(
                            <div key={val+199999} className='flex space-x-5'><p className='w-44 h-8 bg-gray-300 animate-pulse'></p>
                                <p className='w-44 h-8 bg-gray-300 animate-pulse'></p><p className='w-4'></p>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="md:col-span-4 grid grid-rows-2 ">
                <div className='w-full sm:p-2'>
                    <div className=" bg-gray-100 rounded-sm p-3 ">
                        <h1 className="text-lg font-serif text-center text-gray-800 capitalize lg:text-xl">OPTIONS DETAILS</h1>
                    </div>
                    <div className="max-h-56 xl:max-h-72 px-4 py-6 border-b overflow-y-scroll">
                        {loading !='getingOrderData' && orderData?.options? 
                            <OptionDetails options={orderData.options} role={'order'}/>
                        :[1,2].map((val)=><div key={val+199999999} className='animate-pulse my-2 w-full h-20 bg-gray-200'/>)}
                    </div>
                </div>
                <div className='w-full border-b sm:p-2'>
                    <div className=" bg-gray-100 rounded-sm p-3 ">
                        <h1 className="text-lg font-serif text-center text-gray-800 capitalize lg:text-xl">PAYMENT DETAILS</h1>
                    </div>
                    <div className='flex flex-col items-center my-4 justify-center space-y-4 text-black text-[.95rem] md:text-[1rem] font-medium'>
                        {loading !== 'getingOrderData' ? 
                            <>
                                <div className='w-full  flex justify-center'>
                                    <div className='sm:w-1/2 space-y-5 text-end'>
                                        <p  className='mx-1 md:mx-7'>Payment type</p>
                                        <p  className='mx-1 md:mx-7'>Paid price</p>
                                        <p  className='mx-1 md:mx-7'>Paymented at</p>
                                        <p  className='mx-1 md:mx-7'>Grand total</p>
                                    </div>
                                    <div className='space-y-5'><p>:</p><p>:</p>
                                        <p>:</p><p>:</p>
                                    </div>
                                    <div className='sm:w-1/2 h-full space-y-5 font-normal text-start text-gray-600'>
                                        <p className='mx-1 md:mx-7 flex items-center space-x-2'>{orderData?.paymentType == 'strip'?<><BsStripe className="bg-white  text-sm text-blue-600"/><span>Strip</span></>:''}</p>
                                        <p className='mx-1 md:mx-7'>₹ {orderData?.grandTotal}.00</p>
                                        <p className='mx-1 md:mx-7'>{orderData?.orderCreatedAt?.split('T')[0]}</p>
                                        <p className='mx-1 md:mx-7'>₹ {orderData?.grandTotal}.00</p>
                                    </div>
                                </div>
                            </>
                            :[1,2,3,4].map((val)=>(
                            <div key={val+199999} className='flex space-x-5'><p className='w-44 h-8 bg-gray-300 animate-pulse'></p>
                                <p className='w-44 h-8 bg-gray-300 animate-pulse'></p><p className='w-4'></p>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        {loading !== 'getingOrderData' && orderData.status !== 'Completed' ?
            <div className="bg-white">
                <div className='flex justify-center'>
                    <p className='capitalize font-serif my-2'>Order status<span className='ml-4'> : </span>
                    <span className={`${orderData.status == 'Confirmed'?'text-blue-700':orderData.status === 'Completed'?'text-green-700':orderData.status === 'Cancelled'?'text-red-600':''} ml-4`}>
                        {orderData.status}  
                    </span></p>
                </div>  
                <p className={`${!cancellations && orderData.status !== 'Cancelled'?'text-blue-600 underline':'text-gray-600'} text-sm text-center italic`}>
                    {orderData?.orderCreatedAt&&cancellations?
                    <>The cancel the order up to <span className='text-red-600'>
                    {(() => {
                        const minDate = new Date(orderData?.orderCreatedAt);
                        minDate.setDate(minDate.getDate() + 7);
                        return minDate.toISOString().split('T')[0]})()
                    }
                    </span>
                . After this deadline,<br /> cancellations won&#39;t be possible. Once you cancel the order, The total amount will initiate a refund to your wallet</>
                :!cancellations &&orderData.status !== 'Cancelled'?'Cancellations time is expaired':!cancellations &&orderData.status == 'Cancelled'?
                <>This Order have been <span className='text-red-600'>Cancelled</span> At <span className='text-blue-500'>{orderData?.orderCancelledAt.split('T')[0]}</span>
                <br />Refund amount : ₹ {orderData.grandTotal}.00</>:""}
                </p>
                <div className='flex justify-center'>
                    {cancellations && orderData.status === 'Confirmed' && role =='user'?
                    <Button className={'text-center text-white text-[.899] bg-red-500 capitalize hover:bg-red-700 px-2 py-2 rounded-md my-2'}
                    content={'Cancel order'} handelEvent={()=>setModal('cancelOrder')}/>:""}
                </div>
            </div>
        :loading !== 'getingOrderData'&&
            <div className="bg-white mb-4">
                <div className='flex justify-center mx-2'>
                    <p className='capitalize text-lg font-serif mt-2 mb-1'>Order Successfully <span className='text-green-600'> {orderData.status}  
                    </span></p>
                </div>
                {
                    role == 'user'?<>
                    <div className='flex justify-center mx-4 text-gray-600 font-normal tex-sm'>
                        <p className='capitalize italic text-center'>We hope you had a wonderful event and that it was a resounding success. 
                            Your satisfaction is our priority, and we&#39;re  delighted to have been a part of <br/> your special day.
                            If you have any future events in mind or require our services again, don&#39;t hesitate to reach out.<br/> We look forward to assisting you in the future.
                            Wishing you all the best in your future endeavors, and <br/> thank you for allowing us to be a part of your event!
                        </p>
                    </div> 
                    <div className='flex justify-center mx-4 text-gray-600 font-normal tex-sm'>{orderData?.providerId?.feedback.length&&
                        orderData?.providerId?.feedback.some(feedbackEntry => feedbackEntry.userId === orderData.customerId)?null:
                        <Button className={'flex font-serif hover:underline items-center '} handelEvent={()=>setModal('reviewModal')}
                        content={<>We&#39;d love to hear about your <span className='text-blue-600'>&nbsp;experience and any feedback&nbsp;</span> 
                        you may have.<span className='text-blue-600 mx-2 text-lg'><RiFeedbackLine/></span></>}/>
                    }
                    </div> 
                    </>
                :''}
            </div>}

            { modal ==='reviewModal'?<OrderReview setOrderData={setOrderData} setModal={setModal} role={'addFeedback'} providerId={orderData?.providerId?._id}/>:''}
        
        { modal ==='cancelOrder'?
            <Modal closeModal={()=>setModal('')}modalHeader={
                    <div className="flex items-center justify-center border-b"><Button content={<AiOutlineWarning className="text-7xl text-red-600 m-4"/>}/>
                    </div>}
                modalBody={<div className='border-b'><p className="text-lg text-center my-6 mx-4">Are you absolutely certain you wish to <br />
                cancel your order ? This action cannot be<span className='text-red-500'> undone </span>.!!!</p></div>}
                modalFooter={
                    <div className="flex items-center justify-center gap-4 my-4">
                        <Button type="button" className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
                        content={'No, cancel'} handelEvent={()=>setModal('')}/>
                        <Button type="submit" handelEvent={cancelTheOrder} className={`text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 duration-[500ms,800ms]`}content={
                            <div className="flex items-center justify-center">{loading === 'cancelOrder' ? (
                            <><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"> Processing... </p></>
                        ) : (<p>Yes, I&apos;m sure</p>)}</div>}/>
                </div>}/>:''}
    </div>
  )
}

SingleOrder.propTypes = {
    role: PropTypes.string.isRequired, // Define the expected type and mark it as required
    path:PropTypes.string,
};


export default SingleOrder