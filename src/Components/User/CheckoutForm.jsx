import { useState } from "react";
import PropTypes from 'prop-types';
import PaymentDetails from "./PaymentDetails";
import Button from "../CustomComponent/Button";
import { toast } from "react-toastify";
import Modal from "../CustomComponent/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { SiRazorpay } from "react-icons/si";
import { BsStripe } from "react-icons/bs";
import { usersPost } from "../../Services/userApi";
import OptionDetails from "../OptionDetails";


const CheckoutForm = ({provider,setCheckout,selectedOption,setSelectedOption,orderDetails,setOrderDetails}) => {
    
    const [error,setError] = useState('')
    const [modal,setModal] = useState('')
    const [placeOrder,setPlaceOrder] = useState(false)
    

    const handleSubmit =async () => {
      const error = await errorHandle()
      if(error){
        const option = []
        selectedOption&&selectedOption?.map((opt)=>{
          option.push({
            optionId:opt._id,
            count:opt.count,
            totalAmount:opt.totalAmount
          })
        })
        setOrderDetails(prevDetails => ({
          ...prevDetails,
          option: option,
          grandTotal:option.reduce((accumulator, option) => {return accumulator + option.totalAmount}, 0)
      }));
        setModal('payment')
      }
    }

    const paymentHandel =async (method) => {
        if(method == 'strip'){
            await usersPost(`/payment?method=${'strip'}`,orderDetails).then((res)=>{
              window.location.href = res.url
            })
        }    
    }


    const errorHandle = () => {
        const { name, mobile, date,address, email } = orderDetails;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const MobRegex = /^[6789]\d{9}$/;
        const zipRegex = /^6\d{5}$/;
        if(!name || name.trim().length == 0||!mobile|| !date||
        date.trim().length == 0 ||!email|| email.trim().length == 0 ||!address.landmark||
        address.landmark.trim().length == 0||!address.city||address.city.trim().length == 0
        ||!address.zip||address.zip.trim().length == 0||!address.district||address.district.trim().length == 0){
            setError('Fill all the fields')
            toast.warn('Fill all the fields')
            return false
        }else if(name.trim().length < 2){
          setError('Enter a valid name')
          return false
        }else if (!MobRegex.test(mobile)){
          setError('Enter a valid mobile number')
          return false
        }else if(!emailRegex.test(email)){
          setError('Enter a valid email address')
          return false
        }else if(!zipRegex.test(address.zip)){
          setError('Check zip cord')
          return false
        }else{
          setError('')
          return true
        }
    }

  return (
    <>
    <p className="text-2xl font-serif text-center mt-2">Payment Details</p>
    <p className="text-gray-500 mt-1 text-center text-[.85rem]">Complete your order by providing your payment details.</p>
<div className="grid sm:px-10 w-full lg:grid-cols-2  bg-white">
    <PaymentDetails error={error} provider={provider} orderDetails={orderDetails} setCheckout={setCheckout} setOrderDetails={setOrderDetails}/>
  <div className="flex items-center w-full h-full justify-center">
    <div className="w-full mt-8 md:mt-12">
        <div className="">
            <div className="max-h-56 xl:max-h-96 px-4 py-6 sm:px-8 lg:px-0 xl:px-8 sm:py-10 border-b overflow-y-scroll">
               <OptionDetails setCheckout={setCheckout} options={selectedOption} setSelectedOption={setSelectedOption} role={'checkout'}/>
            </div>

          <div className="mt-6 space-y-3 text-center border p-4">
      <p className="text-gray-600 text-center text-sm italic border-b p-4">This order will place after giving amount need and you can cansel order befor 7 day form today  
      we will refend the amount to your wallet.</p>

            <div className="flex items-center justify-center space-x-4">
              <p className="text-gray-800 text-lg font-bold">Grand Total  :</p>
              <p className="text-lg font-medium text-gray-900">₹ {selectedOption.length?`${selectedOption.reduce((accumulator, option) => {return accumulator + option.totalAmount}, 0)}.00`:0.00}</p>
            </div>
          <div className=" text-center ">
            <Button type="button"  handelEvent={placeOrder?handleSubmit:null}
            className={`w-2/6 items-center justify-center ${!placeOrder ?'cursor-not-allowed bg-gray-400':'cursor-pointer bg-black hover:bg-gray-800'} rounded-md  px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out  `}
            content={'Place Order'}
            />
            
          </div>
          <div className="mt-4">
            <input
              type="checkbox"
              id="termsCheckbox"
              onChange={(event)=>setPlaceOrder(event.target.checked)}
              className="form-checkbox  text-indigo-600 transition duration-150 ease-in-out"
            />
            <label htmlFor="termsCheckbox" className="ml-2 text-gray-700 text-sm">
              I agree to the <span className="text-indigo-600 hover:underline">Terms and Conditions</span>
            </label>
          </div>
          </div>


    </div>
      </div>
    </div>
    {modal == 'payment' ? <Modal closeModal={()=>setModal('')}
      modalHeader={
        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl capitalize mx-auto font-medium text-gray-900 dark:text-white">
            payment options
            </h3>
            <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" content={<AiOutlineClose/>
        } handelEvent={()=>setModal('')}/>
        </div>}
        modalBody={
          <div className="p-5">
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Click one of paymant metoad to place order</p>
              <ul className="my-4 space-y-3">
              <li>
                  <p onClick={()=>paymentHandel('strip')} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-600">
                       <BsStripe className="bg-white text-blue-600"/>
                      <span className="flex-1 ml-3 whitespace-nowrap">Strip</span>
                  </p>
                    </li>
                <li>
                    <p className="flex items-center cursor-not-allowed p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-600">
                        <SiRazorpay className="text-sky-400 line-through"/>
                        <span className="flex-1 ml-3 line-through whitespace-nowrap">Razorpay</span>
                        <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded">Not avileble</span>
                    </p>
                </li>
              </ul>
          </div>}
        modalFooter={
            <div className="flex justify-center items-center p-4  border-t border-gray-200 rounded-b">
                <Button  handelEvent={()=>setModal('')} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 " content={'Close'}/>
            </div>
        }
    /> :''}
</div>
</>
  )
}

CheckoutForm.propTypes = { // Define the expected type and mark it as required
    setCheckout:PropTypes.func,
    selectedOption:PropTypes.array,
    setSelectedOption:PropTypes.func,
    orderDetails:PropTypes.object,
    setOrderDetails:PropTypes.func,
    provider:PropTypes.object,
    
};


export default CheckoutForm