import { useEffect, useRef, useState } from "react"
import { usersGet, usersPatch } from "../../Services/userApi"
import  avatar  from "../../assets/very_big_Luffy.jpg"
import { toast } from "react-toastify"
import { IoWalletOutline } from "react-icons/io5"
import  addDp  from "../../assets/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg"
import coverPic from "../../assets/images.jpeg"
import Button from "../CustomComponent/Button"
import { FiEdit } from "react-icons/fi"
import OrderList from "../OrderList"
import { AiOutlineArrowRight } from "react-icons/ai"
import WalletHistory from "../WalletHistery"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateUserData } from "../../store/slice/user"


// const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  
  
    const [userData,setUserData] = useState({})
    const [updateUser,setupdateUser] = useState(false)
    const [loading,setLoading] = useState('')
    const [orderList,setOrderList] = useState([])
  
  // const [remainter,setRemainter] = useState(false)
  const img = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const reduxUserData = useSelector((state) => state.user.userData)
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        place:'',
        file: null,
    });

    let imageSrc = formData.file ? URL.createObjectURL(formData.file) : (userData?.image || avatar );

    const getUserData =async ()=>{
        setUserData(reduxUserData)
        !reduxUserData?setLoading('getingUserData'):''
        await usersGet('/profile')
        .then((res)=>{
            res ? setUserData(res.userData) : null
            setLoading('')
            res.userData? dispatch(updateUserData({userData: {...res.userData,walletHistory: null}})):null

        }).catch((error)=>{
            console.log(error);
        })
    }

    const updateOpen = ()=>{
        setupdateUser(true);
        setFormData({
            name: userData?.name,
            email: userData?.email,
            place: userData?.place
        });
    }

    const updateCancel = ()=>{
        setupdateUser(false);
        setFormData({
            name: '',
            email:'',
            place:'',
            file: null,
        });
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setFormData(prevFormData => ({
            ...prevFormData,
            file
        }));
    };

    const handleChange = (event) => {
        console.log(userData);
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit=async(event)=>{
        event.preventDefault()
        const error = await errorHandle()
        if(!error){
            setLoading('updateUser')
            const img =true;
            console.log(formData);
            await usersPatch('/editProfile',formData,img).then((res)=>{
                res.userData? setUserData((prev)=>({...prev,...res.userData})):''
                res.userData? dispatch(updateUserData({userData:{...userData,...res.userData}})):null
                setLoading('')
                updateCancel()
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    const errorHandle = () => {
        const { name, email,file,place } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(name !== userData.name || email !== userData.email||place != userData.place||file){
            if(name.trim().length < 2){
                toast.error('Enter a valid name')
                return true
            }else if(!emailRegex.test(email)){
                toast.error('Enter a valid email address')
                return true
            }else return false

        }else{
            toast.info("Did't change anything")
            return true
        }
    }

    const keralaDistricts = [
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
        

    useEffect(() => {
        getUserData()
    }, []);
  return (
    <div className="w-full">
        <div className="bg-white border border-gray-100 rounded-lg shadow mb-4 pb-8">
            <div className="absolute right-12 mt-4 rounded">
                <button  className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20" title="Settings">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                </button>
                <div  className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl hidden">
                    <div className="py-2 border-b">
                        <p className="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                        <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Share Profile</span>
                        </button>
                        <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Block User</span>
                        </button>
                        <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-sm text-gray-700">More Info</span>
                        </button>
                    </div>
                    <div className="py-2">
                        <p className="text-gray-400 text-xs px-6 uppercase mb-1">Feedback</p>
                        <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Report</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[18rem] ">
                {loading == 'getingUserData'?
                <div className="w-full bg-gray-200 animate-pulse h-full object-cover rounded-tl-lg rounded-tr-lg"/>:
                <img src={coverPic} className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"/>
                }
            </div>
            <div className="flex text-lg flex-col space-y-1 items-center -mt-20">
                {loading ==='getingUserData'?
                <div className="w-40 h-40 bg-gray-200 animate-pulse p-2 mb-3 rounded-full object-cover shadow-lg"/>
                :
                <img src={imageSrc} className="w-40 h-40 p-2 mb-3 rounded-full object-cover shadow-lg"/>
                }
                <div className="flex items-center space-x-2 mt-2">
                    {loading !== 'getingUserData'?<p className="text-2xl capitalize">{userData.name}</p>:<p className="h-8 rounded-md w-72 bg-gray-200 animate-pulse"/>}
                    <span className="bg-blue-500 rounded-full p-1" title="Verified">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                </div>
                {loading !== 'getingUserData'?<>
                <p className="text-gray-700 font-serif">{userData.email}</p>
                <p className="text-gray-700 font-mono">+91 {userData.phone}</p>
                <p className="text-sm text-gray-500">{userData.place}</p></>:
                <><p className="h-8 rounded-md w-60 bg-gray-200 animate-pulse"/>
                <p className="h-8 rounded-md w-56 bg-gray-200 animate-pulse"/>
                <p className="h-8 rounded-md w-48 bg-gray-200 animate-pulse"/></>}
            </div>
            <div className="flex-1 flex-col flex md:flex-row items-center px-8 mt-2">
                <div className="flex items-center space-x-4 mt-2">
                    <Button className="flex items-center text-lg font-mono text-gray-900  rounded space-x-2 transition duration-100"
                      handelEvent={() => {
                        const targetDiv = document.getElementById('transationHistory');
                        if (targetDiv)targetDiv.scrollIntoView({ behavior: 'smooth' })}} content={<>
                        <IoWalletOutline className="text-2xl text-blue-600"/><span className="mx-4">:</span>{loading !== 'getingUserData'?<span>₹ {userData.wallet}.00</span>:
                        <div className="h-5 w-5 border-2 rounded-full bg-white border-t-transparent animate-spin border-gray-900"></div>}</>}
                    />
                </div>
                <div className="flex md:ml-auto items-center mt-2">
                  <Button className=" flex items-center text-lg font-serif text-gray-900  rounded mx-4 space-x-2 transition duration-100"
                        handelEvent={()=>updateOpen()} content={<>
                          <FiEdit className="text-2xl text-blue-600"/><span>Edit Profile</span></>}
                      />
                </div>
            </div>

        </div>
        <div className="">
          <OrderList role='user' path='/profile' orderList={orderList} setOrderList={setOrderList}/>
            {orderList&&orderList.length&&orderList.length == 5 &&
                <div  className="flex items-center justify-center p-4 w-full">
                    <Button  className={'text-center my-8 animate-bounce text-blue-800 text-[1rem]'} handelEvent={()=>navigate('/orders')} content={<p className='flex items-center '>See More<span><AiOutlineArrowRight className='text-blue-600 mx-2'/></span></p>}/>
                </div>
            }
        <div className="mb-10">
          <WalletHistory role='user' walletHistory={userData?.walletHistory}/>
        </div>
      </div>
         {updateUser ?
            <div className="fixed inset-0 z-10 overflow-y-auto bg-slate-200">
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl -bg-gray-900 sm:my-8 sm:w-full sm:p-6">

                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <h1 className="text-center text-xl mb-4 font-medium">Update Profile</h1>
                            <div className="rounded-full shadow-slate-500 mb-4 flex items-center justify-center flex-col">
                                <img className="w-40 h-40 p-2 mb-3 rounded-full object-cover shadow-lg" src={imageSrc === avatar? addDp : imageSrc} onClick={()=>img.current.click()}  loading="lazy" alt="loading..."/>
                                <input type="file" className="hidden" name="file" ref={img} onChange={handleFileChange}/>
                            </div>
                            <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                <input
                                    type="text" minLength={3}
                                    id="name" name="name" onChange={handleChange} value={formData?.name} placeholder={formData?.name}
                                    className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md -bg-gray-900 -text-gray-300 -border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 -focus:border-blue-300 focus:outline-none focus:ring"
                                />
                            </div>
                            <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                <input
                                    id="email" name="email" type="email" onChange={handleChange} value={formData.email} placeholder={formData.email}
                                    className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md -bg-gray-900 -text-gray-300 -border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 -focus:border-blue-300 focus:outline-none focus:ring"
                                />
                            </div>
                            <div className="flex items-center justify-between w-full mt-5 gap-x-2 ">
                                <select
                                    id="Place"
                                    name="Place"
                                    autoComplete="Place"
                                    className="block w-56 text-center rounded-md  border-2 py-2 text-gray-900 shadow-sm  sm:max-w-xs sm:text-sm sm:leading-6"
                                    value={formData.place}
                                    onChange={(e) =>
                                        setFormData({ ...formData, place: e.target.value })
                                    }
                                >
                                    <option value="" disabled hidden>
                                        {formData.place ? formData.place : "Select a place"}
                                    </option>
                                    {keralaDistricts.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select> 
                            </div>
                            <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                <button
                                    onClick={updateCancel}
                                    className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium text-black  border border-gray-300 hover:bg-slate-100 tracking-wide capitalize transition-colors duration-300 transform rounded-md  focus:outline-none"
                                >Cancel</button>
                                <Button type="submit" className={`px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                                    content={
                                        <div className="flex items-center justify-center">{loading === 'updateUser' ? (
                                        <><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"> Processing... </p></>
                                        ) : (<p>Confirm</p>)}</div>}/>
                            </div>
                        </form>
                    </div>

                </div>
            </div> : <></>
         } 

    </div>  
  )
}

export default Profile
