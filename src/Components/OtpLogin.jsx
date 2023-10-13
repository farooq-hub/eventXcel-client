import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../api/firebace.config";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdPhoneIphone} from 'react-icons/md';
import { userLogin } from '../store/slice/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import PropTypes from 'prop-types';
import OtpInput from 'otp-input-react'
import { usersPost } from "../Services/userApi";
import { providerPost } from "../Services/providerApi";




function OtpLogin({role}) {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [send,setSend] = useState(false)
    const [error, setError] = useState('')
    const [otp, setOtp] = useState()
    const [formData, setFormData] = useState({
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }))
    };

    const errorHandle = () => {
        const {phone} = formData
        const pattern = /^[6789]\d{9}$/;
        if(phone.trim().length ==0){
            setError('Fill all the fields')
            return false
        }else if (!pattern.test(phone)){
            setError('Enter a valid phone number')
            return false
        }else{
            setError('')
            return true
        }
    }

    const sendOtp = async (e) => {
        try {
            e.preventDefault();
            const formValid = errorHandle();
            if (formValid) {
                await onCaptchaVerify();
                const appVerifier = window.recaptchaVerifier
                const phoneNo = "+91" + formData.phone;  
                signInWithPhoneNumber(auth, phoneNo, appVerifier)
                  .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    toast.success("Otp sent succesfully");
                    setSend(true);
                  })
                  .catch((error) => {
                    console.log(error);
                    // const recaptchaContainer = document.getElementById('recaptcha-container');
                    // if (recaptchaContainer) {
                    //     recaptchaContainer.innerHTML = ''; // Clear the recaptcha-container
                    //     const newRecaptchaContainer = document.createElement('div');
                    //     newRecaptchaContainer.id = 'recaptcha-container';
                    //     recaptchaContainer.parentNode.replaceChild(newRecaptchaContainer, recaptchaContainer);
                    // }
                    toast.error(error)
    
                  }); 
            } else {
                toast.error(error)
            }                
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
     }

    function onCaptchaVerify() {
        try{
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "recaptcha-container",
                    {
                    size: "invisible",
                    callback: () => {
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
            toast.error(err)
            alert(err)
            // window.location.reload()
            const recaptchaContainer = document.getElementById('recaptcha-container');
            if (recaptchaContainer) {
                recaptchaContainer.innerHTML = ''; // Clear the recaptcha-container
                const newRecaptchaContainer = document.createElement('div');
                newRecaptchaContainer.id = 'recaptcha-container';
                recaptchaContainer.parentNode.replaceChild(newRecaptchaContainer, recaptchaContainer);
            }
        }
    }

    const verifyOtp = ()=>{
        if (otp) {
            window.confirmationResult
                .confirm(otp)
                .then(async () => {
                    handleSubmit();
                })
                .catch((err) => {
                    setError("Enter a valid otp"+ err);
                });
        } else {
            setError("Enter otp");
        }
    }

    const handleSubmit=async () => {

    const response =await role == 'user' ? usersPost('/otpLogin',formData) : providerPost('/otpLogin',formData)
    response.then((res)=>{
        const name = res?.name;
        const token = res?.token;
        const side = res?.role;    
        toast.success(res.msg)
        if (side === 'user') {
            dispatch(userLogin({ name, token, side}));
            navigate('/')
        } else if (side === 'provider') {
            // dispatch(adminLogin({ name, token, role}));
            // navigate('/admin')
        }
    }).catch(()=>{
        toast.error('otp login failed,Try again')
        // window.location.reload()
        setSend(false)
    })
    }

    
  return (
    <div className='relative w-full  h-screen  bg-slate-100'>
        <div id='recaptcha-container'></div>
        <div className='flex justify-center items-center h-full '>
            <form action="" className='max-w-[400px] mx-auto w-full  p-8  rounded-lg m-8' onSubmit={sendOtp}>
                <h1 className=" text-center font-bold text-5xl pb-4 pt-2 text-gray-950 font-serif">Sign In</h1>
                <p className="text-center text-sm font-normal text-gray-600 pb-10 ">Welcome Back...</p>
                {
                    !send ?
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <MdPhoneIphone className='h-5 w-5 text-gray-400'/>
                            <input className="pl-2 outline-none border-none h-8 bg-slate-100" type="tel" name="phone"  placeholder="Mobile Number" onChange={handleChange}/>
                        </div>:
                        <div className="border-2 w-80 h-16 mb-4">
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
                }
                <p className='text-center text-sm text-red-600'>{error}</p>
                <div className='flex justify-end mb-2'>
                {
                    role !== 'user' ?
                        <p className='font-semibold text-gray-500 hover:underline'> <Link className="lo-sign" to="/provider/login">Login with password.</Link></p>
                    :   <p className='font-semibold text-gray-500 hover:underline'> <Link className="lo-sign" to="/login">Login with password.</Link></p>
                }
                </div>
                <div  className='flex justify-center'>
                    {
                        send ?
                            <button className='border-none rounded-full my-3 w-44 h-12 transition duration-300 text-white font-bold bg-black hover:bg-gray-400' type="button" onClick={verifyOtp}>Login</button>
                        :   <button className='border-none rounded-full my-3 w-44 h-12 transition duration-300 text-white font-bold bg-black hover:bg-gray-400' type="submit">Send OTP</button>                    
                    }
                </div>
                <div className="flex justify-center">
                    <p>Don&rsquo;t you have account..?</p>
                    {
                        role !== 'user' ?
                            <p className='font-semibold text-blue-800 hover:underline'> <Link className="lo-sign" to="/provider/register">&nbsp;Sign Up</Link></p>
                        :   <p className='font-semibold text-blue-800 hover:underline'> <Link className="lo-sign" to="/register">&nbsp;Sign Up</Link></p>
                    }        
                </div>
            </form>
        </div>
    </div>
  );
}

OtpLogin.propTypes = {
    role: PropTypes.string.isRequired, // Define the expected type and mark it as required
  };


export default OtpLogin