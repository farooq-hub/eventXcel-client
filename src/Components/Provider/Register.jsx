import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MdPhoneIphone,MdLockOutline ,MdPerson} from 'react-icons/md';
import { FiAtSign} from 'react-icons/fi';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../api/firebace.config";
import OtpInput from 'otp-input-react'
import axiosInstance from '../../api/axios';
import Select from 'react-select';
import { toast } from 'react-toastify';

const Register = ()=> {

    const [click,setClick] = useState(true)
    const [error, setError] = useState('');
    const [otp, setOtp] = useState();
    const [serviceList, setServiceList] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        services: [],
        places: [],
      });
    const navigate = useNavigate();
    const handleChange = (e) => {
    let { name, value } = e.target;
    value = value.trim()
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
    };

    const getServiceList = async () => {
        try {
            const response = await axiosInstance.get('/provider/serviceList');
            setServiceList(response.data.serviceList)
        } catch (error) {
            toast.error(error.response.data.errMsg);
        }
    }

    const options = serviceList.map((service) => ({
        label: service.serviceName,
        value: service._id,
    }));  

    const keralaDistricts = [
        "All Kerala",
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
    ];

    const keralaDistrictsOptions = keralaDistricts.map((district) => ({
        value: district,
        label: district,
    }));


    function onCaptchaVerify() {
        try{
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "recaptcha-container",
                    {
                    size: "invisible",
                    callback: () => {
                        toast.success("Otp sent succesfully");
                    },
                    "expired-callback": () => {
                        toast.error("TimeOut");
                    }
                    },
                    auth
                )
                }
        }
        catch(err){
            alert('oncaptcha err',err)
        }
        }
          
    const sendOtp =async (e) => {
        e.preventDefault();
        const err =  errorHandle();
        if(err){
            await onCaptchaVerify();     
            const appVerifier = window.recaptchaVerifier
            const phoneNo = "+91" + formData.phone;
            signInWithPhoneNumber(auth, phoneNo, appVerifier)
              .then((confirmationResult) => {
                  window.confirmationResult = confirmationResult;
                  console.log('lkkkkkkkkkkkkkkkkkkkk')
                setClick(false);
              })
              .catch((error) => {
                console.log(error);
                toast.error(error);
              });
        }else(
            // generateError(error)
            console.log('hi',error)
        )
    }


    const verifyOtp = ()=>{
      console.log(otp);
        if (otp) {
        window.confirmationResult
            .confirm(otp)
            .then(async () => {
            handleSubmit();
            })
            .catch(() => {
              setError("Enter a valid otp");
            });
        } else {
        setError("Enter otp ");
        }
    }

    const errorHandle = () => {
        const { name, phone, password, email, services, places } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const pattern = /^[6789]\d{9}$/;
        if(name.trim().length == 0 || phone.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0){
            setError('Fill all the fields')
            return false
        }else if(name.trim().length < 2){
            setError('Enter a valid name')
            return false
        }else if (!pattern.test(phone)){
          setError('Enter a valid phone number')
          return false
        }else if(!emailRegex.test(email)){
            setError('Enter a valid email address')
            return false
        }else if(services.length < 1){
            setError('Please select at least one service')
            return false
        }else if(places.length < 1){
            setError('Please select at least one service area')
            return false
        }else if(password.trim().length < 4){
            setError('Password must have at least 4 characters long')
            return false
        }else{
            setError('')
            return true
        }
    }

    const handleSubmit = async () => {
        try {
          const response = await axiosInstance.post(`/provider/register`, formData);
          console.log(response);
          if (response.status === 200) {
            toast.success(response.data.msg)
            navigate("/provider/login?signup=success");
          }
        } catch (error) {
          if (error.response?.status === 400) { 
            toast.error(error.response.data.errMsg);
          } else {
            toast.error("Something went wrong");
          }
        }
    };

    useEffect(() => {
        getServiceList();
    }, [])

  return (
    <div className='relative w-full h-full sm:h-screen  '>
        <div id='recaptcha-container'></div>
        <div className='flex justify-center  h-full '>
            { click ? (
                <form className='max-w-[410px] mx-auto w-full  p-8  rounded-lg m-8' onSubmit={sendOtp}>
                    {/* <h1 className='text-center text-5xl text-red-950 font-serif border shadow-slate-600'>LOGO</h1> */}
                    <h1 className=" text-center font-bold text-5xl pb-3 pt-2 text-gray-950 font-serif">Sign Up</h1>

                    <p className="text-center text-sm font-normal text-gray-600 pb-16 ">To Make A Acount...</p>

                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <MdPerson className='h-5 w-5 text-gray-400'/>
                        <input className="pl-2 outline-none border-none h-8" type="text" name="name"  placeholder="Your Company Name (3)" value={formData.name} onChange={ handleChange} />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <MdPhoneIphone className='h-5 w-5 text-gray-400'/>
                        <input className="pl-2 outline-none border-none h-8 " type="tel" name="phone"  placeholder="Mobile Number(10)" value={formData.phone} onChange={handleChange}/>
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <FiAtSign className='h-5 w-5 text-gray-400'/>
                        <input className="pl-2 outline-none border-none h-8 " type="email" name="email"  placeholder="Email Address" value={formData.email} onChange={ handleChange}/>
                    </div>
                    <div className="relative mt-4">
                        <Select className="placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block
                             border-2 rounded-2xl"
                            name="services"
                            placeholder='Selects Your Services...'
                            options={options}
                            isMulti
                            value={formData.services.map((service) =>
                                options.find((option) => option.value === service)
                            )}
                            onChange={(selectedOptions) => {
                                const selectedServices = selectedOptions.map((option) => option.value);
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    services: selectedServices,
                                }));
                            }}
                            />
                    </div>
                    <div className="relative mt-4">
                        <Select className="placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block
                             border-2 rounded-2xl"
                            name="services"
                            placeholder='Selects Your Service Area...'
                            options={keralaDistrictsOptions}
                            isMulti
                            value={formData.places.map((place) => ({
                                value: place,
                                label: place,
                            }))}
                            onChange={(selectedOptions) => {
                                const selectedDistrict = selectedOptions.map((option) => option.value);
                                if (selectedDistrict.includes('All Kerala')) {
                                    if (selectedDistrict.length > 1) {
                                        toast.warn('Already Selected All Kerala');
                                    }
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        places: ['All Kerala']
                                    }))
                                } else {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        places: selectedDistrict.filter((place) => place !== "All Kerala"),
                                    }));
                                }
                            }}
                            />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2 mt-4">
                        <MdLockOutline className='h-5 w-5 text-gray-400'/>
                        <input className="pl-2 outline-none border-none h-8 " type="password" name="password"  placeholder="Password (4)" value={formData.password} onChange={ handleChange}/>
                    </div>
                    <p className='text-center text-sm text-red-600'>{error}</p>
                    <div className='flex justify-center'>
                        <button type='submit' className='border-none rounded-full my-5 w-44 h-12 transition duration-300 text-white font-bold bg-black py-2 hover:bg-gray-400' >Continue </button>
                    </div>
                    <div className="flex justify-center">
                    <p>All ready have account..?</p>
                        <p className='font-semibold text-blue-800 hover:underline'><Link className="lo-sign" to="/provider/login">&nbsp;Sign In</Link></p>
                    </div>
                </form>
                ):            
                <div action="" className='max-w-[410px] mx-auto w-full  p-8  rounded-lg m-8' >
                    {/* <h1 className='text-center text-5xl text-red-950 font-serif border shadow-slate-600'>LOGO</h1> */}
                    <h1 className=" text-center font-bold text-5xl pb-3 pt-2 text-gray-950 font-serif">Sign Up</h1>
                    <p className="text-center text-sm font-normal text-gray-600 pb-16 ">To Make A Acount...</p>
                    <div className="border-2 w-80 h-16 bg-slate-100">
                        <OtpInput
                            className='m-3'
                            OTPLength={6}
                            value={otp}
                            onChange={setOtp}
                            otpType='number'
                            disabled={false}
                            autoFocus
                        />
                    </div>
                    <p className='text-center text-sm text-red-600'>{error}</p>
                    <div className='flex justify-center'>
                        <button onClick={verifyOtp} className='border-none rounded-full my-5 w-44 h-12 transition duration-300 text-white font-bold bg-black py-2 hover:bg-gray-400' >Register</button>
                    </div>
                    <div className="flex justify-center">
                    <p>All ready have account..?</p>
                        <p className='font-semibold text-blue-800 hover:underline'> <Link className="lo-sign" to="/login">&nbsp;Sign In</Link></p>
                    </div>

                </div> 
            }
        </div>
    </div>
  )
}


export default Register