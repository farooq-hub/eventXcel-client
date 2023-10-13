import {useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdPhoneIphone,MdLockOutline ,MdPerson, MdOutlineGppGood} from 'react-icons/md';
import { FiAtSign} from 'react-icons/fi';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../api/firebace.config";
import OtpInput from 'otp-input-react'
import axiosInstance from '../../api/axios';
import {  toast } from 'react-toastify';

const Register = ()=> {

    const [click,setClick] = useState(true)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search); 
    const referralCode = searchParams.get('referralCode');

    const [error, setError] = useState('');
    const [otp, setOtp] = useState();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        repassword:"",
        referralCode: ""
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

    const generateError = (err) => toast.error(err, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 


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
                  toast.success("Otp sent succesfully");
                  setClick(false);
              })
              .catch((error) => {
                  toast.error(error)
                  alert(error)
                  // window.location.reload()
                  const recaptchaContainer = document.getElementById('recaptcha-container');
                  if (recaptchaContainer) {
                      recaptchaContainer.innerHTML = ''; // Clear the recaptcha-container
                      const newRecaptchaContainer = document.createElement('div');
                      newRecaptchaContainer.id = 'recaptcha-container';
                      recaptchaContainer.parentNode.replaceChild(newRecaptchaContainer, recaptchaContainer);
                  }
              });
        }else(
            generateError(error)
            // console.log('hi',error)
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
          setError("Enter otp");
        }
    }

    const errorHandle = () => {
        const { name, phone, password,repassword, email } = formData;
        if(referralCode){
          console.log(referralCode);
          setFormData((prevFormData) => ({
            ...prevFormData,
            [referralCode]: referralCode,
          }));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const MobRegex = /^[6789]\d{9}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter, one number
        console.log('kjjj',MobRegex.test(phone),passwordRegex.test(password));
        if(name.trim().length == 0 || phone.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0 ||repassword.trim().length == 0){
            setError('Fill all the fields')
            return false
        }else if(name.trim().length < 2){
            setError('Enter a valid name')
            return false
        }
        // else if(phone.trim().length !== 10){
        //     setError('Enter a valid phone number')
        //     return false
        // }
        else if (!MobRegex.test(phone)){
          setError('Enter a valid phone number')
          return false
        }
        else if(!emailRegex.test(email)){
            setError('Enter a valid email address')
            return false
        }else if(!passwordRegex.test(password)){
          setError('Password must have  At least 8 characters, one letter, one number')
          return false
      }else if(repassword !== password){
          setError('Confirm password incurrect')
          return false
      }else{
            setError('')
            return true
        }
    }

    const handleSubmit = async () => {
        try {
          const response = await axiosInstance.post(`/signup`, formData);
          console.log(response);
          if (response.status === 200) {
            toast.success(response.data.msg)
            navigate("/login?signup=success");
          }
        } catch (error) {
          if (error.response?.status === 409) { 
            toast.error(error.response.data.errMsg);
          } else {
            toast.error("Something went wrong");
          }
        }
      };

  return (
      <div className='relative w-full h-full sm:h-screen  bg-slate-100'>
        <div id='recaptcha-container'></div>
        <div className='flex justify-center items-center h-full '>
            { click ? (
                <form action="" className='max-w-[410px] mx-auto w-full  p-8  rounded-lg m-8' onSubmit={sendOtp}>
                    {/* <h1 className='text-center text-5xl text-red-950 font-serif border shadow-slate-600'>LOGO</h1> */}
                    <h1 className=" text-center font-bold text-5xl pb-3 pt-2 text-gray-950 font-serif">Sign Up</h1>

                    <p className="text-center text-sm font-normal text-gray-600 pb-16 ">To Make A Acount...</p>

                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <MdPerson className='h-5 w-5 text-gray-400'/>
                        <input className="pl-2 outline-none border-none h-8 bg-slate-100" type="text" name="name"  placeholder="Your Name (3)" value={formData.name} onChange={ handleChange} />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <MdPhoneIphone className='h-5 w-5 text-gray-400'/>
                        <input className="pl-2 outline-none border-none h-8 bg-slate-100" type="tel" name="phone"  placeholder="Mobile Number(10)" value={formData.phone} onChange={handleChange}/>
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <FiAtSign className='h-5 w-5 text-gray-400'/>
                        <input className="pl-2 outline-none border-none h-8 bg-slate-100" type="email" name="email"  placeholder="Email Address" value={formData.email} onChange={ handleChange}/>
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <MdLockOutline className='h-5 w-5 text-gray-400'/>
                        <input className="pl-2 outline-none border-none h-8 bg-slate-100" type="password" name="password"  placeholder="Password (8)" value={formData.password} onChange={ handleChange}/>
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <MdOutlineGppGood className='h-5 w-5 text-gray-400'/>
                        <input className="pl-2 outline-none border-none h-8 bg-slate-100" type="password" name="repassword"  placeholder="Confirm Password " value={formData.repassword} onChange={ handleChange}/>
                    </div>
                    <p className='text-center text-sm text-red-600'>{error}</p>
                    <div className='flex justify-center'>
                        <button type='submit' className='border-none rounded-full my-5 w-44 h-12 transition duration-300 text-white font-bold bg-black py-2 hover:bg-gray-400' >Continue </button>
                    </div>
                    <div className="flex justify-center">
                    <p>All ready have account..?</p>
                        <p className='font-semibold text-blue-800 hover:underline'> <Link className="lo-sign" to="/login">&nbsp;Sign In</Link></p>
                    </div>
                </form>
                ):            
                <div action="" className='max-w-[410px] mx-auto w-full  p-8  rounded-lg m-8' >
                    {/* <h1 className='text-center text-5xl text-red-950 font-serif border shadow-slate-600'>LOGO</h1> */}
                    <h1 className=" text-center font-bold text-5xl pb-3 pt-2 text-gray-950 font-serif">Sign Up</h1>

                    <p className="text-center text-sm font-normal text-gray-600 pb-16 ">To Make A Acount...</p>

                    <div className="border-2 w-80 h-16">
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