import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { RxCrossCircled } from 'react-icons/rx';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCheckCircle } from 'react-icons/ai';
import Button from '../CustomComponent/Button';



const Payment = () => {

    const[payment,setPayment] = useState(true)
    const location = useLocation(); 
    const navigate = useNavigate(); 

    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('status');
    const id = queryParams.get('id');

    useEffect(()=>{
        if(searchTerm == 'true'&&id) setPayment(true)
        else if(searchTerm == 'false') setPayment(false)
        // else navigate(-1)
    },[])

  return (
    <div className="bg-white flex items-center w-full h-full">
        
        <div className="mx-auto">
            {!payment ? <RxCrossCircled className='text-red-600  mx-auto my-6 text-9xl'/> :<AiOutlineCheckCircle className='text-green-600 text-9xl mx-auto my-6'/>}
            <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">{payment ?'Congratulations on Booking Your Event!':'Payment Failed '}</h3>
                <p className="text-gray-700 text-lg text-center italic mt-2 mx-4">{payment ?<>Thank you for choosing our services for your upcoming event. Your payment has been <br /> successfully processed, 
                and your booking is <span className='text-blue-500'>confirmed</span> .</>:
                <>We&#39;re sorry, but there was an issue processing your payment for the event booking. Your booking is currently on <span className='text-red-600'>Cancelled</span>. <br/>

                <span className='text-blue-600'>Please try again</span>. If you continue to experience payment issues, please ensure that your payment method is valid, <br /> or consider using an alternative payment method.
                
                If you have any questions or require assistance,<br /> please <span className='text-blue-600'>contact</span> our support team, and we&#39;ll be happy to assist you in resolving the payment issue.
                <br />
                We appreciate your interest in our services and hope to assist you in successfully <br /> booking your event soon.
                
                <span className='underline'>Thank you for your understanding.</span></>}</p>
                <p className="text-gray-700 text-center italic  mx-4">{payment ?<>We look forward to making your event a memorable experience.</>:''}</p>
                
                <p className='text-center text-xl font-medium my-2 underline'>{payment?'Important Information':''}</p>
                {payment?
                    <ul>
                        <li className='text-gray-900 italic text-[1.04rem]'>- Arrive at the event venue on <span className='text-blue-600'>time</span>.</li>
                        <li className='text-gray-900 italic text-[1.04rem]'>- If you need to make changes or have any inquiries, please contact us as <span className='text-blue-600'>soon as possible</span>.</li>
                        <li className='text-gray-900 italic text-[1.04rem]'>- If you have any questions or need further assistance, please don&#39;t hesitate to <span className='text-blue-600'>contact</span> our support team.</li>
                    </ul>:""}
                <p className="text-gray-700 text-center italic  mx-4 mt-4">{payment ?<>Thank you for choosing us, and we wish you a fantastic event!.</>:''}</p>
                <div className="py-8 text-center">
                    { payment ?
                        <p className='text-center text-lg font-[500] my-2 underline'>Booking Details: <span><Button className={'animate-bounce font-serif  text-blue-800 mx-4 text-[1rem]'} 
                        handelEvent={()=>navigate(`/order?id=${id}`)}
                        content={<p className='flex items-center '>See Details<span><AiOutlineArrowRight className='text-blue-600 mx-2'/></span></p>}/></span></p>
                    :''}
                    <Button className={'bg-gray-500 hover:bg-gray-700 py-2 px-3.5 rounded-md font-serif  text-white mx-4 text-[1rem]'} 
                    content={<p className='flex items-center '><span><AiOutlineArrowLeft className='text-white mr-2'/></span>Go back</p>} handelEvent={()=>navigate('/providers')}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment