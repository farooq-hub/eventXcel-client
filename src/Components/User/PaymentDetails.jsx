import { useEffect } from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '../CustomComponent/Button';
import { IoIosArrowBack } from 'react-icons/io';


const PaymentDetails = ({error,provider,orderDetails,setOrderDetails,setCheckout}) => {

    const userData = useSelector((state) => state.user.userData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrderDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleAddressChange = (event) => {
        
        console.log(orderDetails);
        const { name, value } = event.target;
        setOrderDetails(prevDetails => ({
            ...prevDetails,
            address:{
                ...prevDetails.address,
                [name]: value
            }
        }));
    };

    useEffect(()=>{
        setOrderDetails({
            customerId:userData?._id,
            providerId:provider?.id,
            name:userData?.name,
            email:userData?.email,
            mobile:userData?.phone,
            date:'',
            address:{
                zip:'',
                city:userData?.place,
                landmark:userData?.place,
                district:provider?.places[0]
            }
        })
    },[])
    

  return (
    <div className="flex w-full flex-col items-center  lg:mt-0">
<form className=" max-w-lg space-y-8 px-4 mt-8">
<div className="flex flex-wrap -mx-3 ">
    <div className="w-5/6 px-3 ">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Name
      </label>
      <input onChange={handleChange} name="name" defaultValue={userData?.name} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder="Jhon"/>
      {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 ">
    <div className="w-4/5 px-3 ">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Email
      </label>
      <input onChange={handleChange} name="email" defaultValue={userData?.email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="google@gmail.com"/>
      {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
    </div>
  </div>
  <div className="flex flex-wrap -mx-3  ">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Date of the event
      </label>
        <input onChange={handleChange}  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
        id="grid-date"
        name="date"
        min={(() => {
            const minDate = new Date();
            minDate.setDate(minDate.getDate() + 10);
            return minDate.toISOString().split('T')[0];})()}
        max={(new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}
        type="date" />
      <p className="text-gray-600 text-xs italic">Only after 7 days from today.</p>

    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Mobile
      </label>
      <input onChange={handleChange} name="mobile" defaultValue={userData?.phone} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
         id="grid-mobile" type="tel" placeholder="9999990000"/>
      <p className="text-gray-600 text-xs italic">Please enter a valid mobile number.</p>
    
    </div>
  </div>
  <div className="flex flex-wrap -mx-3">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >landmark</label>
      <input onChange={handleAddressChange} name="landmark" defaultValue={userData?.place} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Cyber parck"/>
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        City
      </label>
      <input onChange={handleAddressChange} name="city" defaultValue={userData.place} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="kochi"/>
    </div>

  </div>

    <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Zip
      </label>
      <input onChange={handleAddressChange}  name="zip" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="grid-zip" type="number" placeholder="60210" minLength={6} pattern="\d{6}"/>
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        district 
      </label>
      <div className="relative">
        <select name="district" defaultValue={orderDetails?.district} onChange={handleAddressChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            {provider.places&&provider.places.length
            ? provider.places.map((val, i) => (<option key={1200 + i} value={val}>{val}</option>)): ''
            }
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>
  <p className='text-center text-sm text-red-600'>{error}</p>

</form>
<div className='mt-8'>
    <Button content={<p className='flex items-center'><span className='mr-2 text-lg'><IoIosArrowBack/></span>Add more options</p>} handelEvent={()=>setCheckout(false)} type={'button'}
      className={'py-2.5 px-2  bg-slate-500 hover:bg-slate-700  duration-[500ms,800ms] text-[1.01rem] text-white rounded-md ml-6'}/>

</div>
  </div>
  )
}

PaymentDetails.propTypes = { // Define the expected type and mark it as required
    setCheckout:PropTypes.func,
    selectedOption:PropTypes.array,
    setOrderDetails:PropTypes.func,
    provider:PropTypes.object,
    orderDetails:PropTypes.object,
    error:PropTypes.string
};

export default PaymentDetails