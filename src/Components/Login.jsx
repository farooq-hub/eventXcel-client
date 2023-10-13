import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdPhoneIphone,MdLockOutline} from 'react-icons/md';
import { userLogin } from '../store/slice/user';
import { adminLogin } from '../store/slice/admin'
import { providerLogin } from '../store/slice/provider';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { adminPost } from '../Services/adminApi';
import { usersPost } from '../Services/userApi';
import { providerPost } from '../Services/providerApi';
import Button from './CustomComponent/Button';



const Login = ({role}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });

     
    const errorHandle = () => {
        const {  phone, password } = formData;
        const pattern = /^[6789]\d{9}$/;
        if(phone.trim().length == 0 || password.trim().length == 0){
            setError('Fill all the fields')
            return false
        }
        else if (!pattern.test(phone)){
            setError('Enter a valid phone number')
            return false
        }else if(password.trim().length < 4){
            setError('Password must have at least 4 characters long')
            return false
        }else{
            setError('')
            return true
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }))
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        const formValid = errorHandle();
        e.preventDefault();
        if (formValid) {
            try {
                setLoading('userLogin')
                const response = await role == 'admin' ? adminPost('/login',formData) : role == 'user' ? usersPost('/login',formData):providerPost('/login',formData)
                response.then((response)=>{
                        setLoading('')
                        const token = response?.token;
                        const role = response?.role;
                        const providerData = response?.providerData;
                        const userData = response?.userData;
                        const adminData = response?.adminData;

                        if (role === 'user') {
                            dispatch(userLogin({ userData, token, role}));
                            navigate('/')

                        } else if (role === 'admin') {
                            console.log(role);
                            dispatch(adminLogin({adminData, token, role}));
                            navigate('/admin')
                        } else if (role === 'provider') {
                            dispatch(providerLogin({ token, role, providerData }));
                            navigate('/provider/home')
                        }
                }).catch((error)=>{
                    setLoading('')
                    console.log(error);
                })
            } catch (error) {
                toast.error('Something went wrong')
            }
        }else {
            toast.error('Something  wrong')
        }
    }
  
    
  return (
    <div className='relative w-full  h-screen  bg-slate-100'>
        <div className='flex justify-center items-center h-full '>
            <form action="" className='max-w-[400px] mx-auto w-full  p-8  rounded-lg m-8' onSubmit={handleSubmit}>
                {/* <h1 className='text-center text-5xl text-red-950 font-serif border shadow-slate-600'>LOGO</h1> */}
                {/* <h1 className="  font-bold text-2xl  text-red-950 font-serif">LOGO</h1> */}
                <h1 className=" text-center font-bold text-5xl pb-4 pt-2 text-gray-950 font-serif">Sign In</h1>

                <p className="text-center text-sm font-normal text-gray-600 pb-20 ">Welcome Back...</p>

                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-8">
                    <MdPhoneIphone className='h-5 w-5 text-gray-400'/>
                    <input className="pl-2 outline-none border-none h-8 bg-slate-100" type="tel" name="phone"  placeholder="Mobile Number" onChange={handleChange}/>
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <MdLockOutline className='h-5 w-5 text-gray-400'/>
                    <input className="pl-2 outline-none border-none h-8 bg-slate-100" type="password" name="password"  placeholder="Password" onChange={handleChange}/>
                </div>
                <p className='text-center text-sm text-red-600'>{error}</p>
                {
                    role !== 'admin' ?
                        <div className='flex justify-between mb-4'>
                                {role == 'user' ?
                                    <p className='font-semibold text-gray-500 hover:underline'> <Link className="lo-sign" to="/otpLogin">Login with OTP</Link></p>:
                                    <p className='font-semibold text-gray-500 hover:underline'> <Link className="lo-sign" to="/provider/otpLogin">Login with OTP</Link></p>
                                }
                                {role == 'user' ?
                                    <p className='font-semibold text-gray-500 hover:underline'> <Link className="lo-sign" to="/forgetPassword">Forgot password?</Link></p>:
                                    <p className='font-semibold text-gray-500 hover:underline'> <Link className="lo-sign" to="/provider/forgetPassword">Forgot password?</Link></p>
                                }
                        </div>    
                        : null
                }
                <div  className={`${role=='admin'?'flex justify-center mt-6' :'flex justify-center'}`}>
                    <Button type="submit" className={`border-none rounded-full my-5 w-44 h-12 transition duration-300 text-white font-bold bg-black py-2 hover:bg-gray-400`}
                        content={
                            <div className="flex items-center justify-center">{loading === 'userLogin' ? (
                            <><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"> Processing... </p></>
                            ) : (<p>Login</p>)}</div>}/>
                </div>
                {
                    role !== 'admin' ?
                        <div className="flex justify-center">
                        <p>Don&rsquo;t you have account..?</p>
                            {role == 'user' ? 
                                <p className='font-semibold text-blue-800 hover:underline'> <Link className="lo-sign" to="/register">&nbsp;Sign Up</Link></p> :
                                <p className='font-semibold text-blue-800 hover:underline'> <Link className="lo-sign" to="/provider/register">&nbsp;Sign Up</Link></p>   
                            }
                        </div>
                        : null
                }        
            </form>
        </div>
    </div>
  );
}

Login.propTypes = {
    role: PropTypes.string.isRequired, // Define the expected type and mark it as required
};

export default Login