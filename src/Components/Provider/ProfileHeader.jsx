import  { useState } from 'react'
import PropTypes from 'prop-types';
import coverPic from "../../assets/pexels-sandra-filipe-7087668.jpg"
import  avatar  from "../../assets/very_big_Luffy.jpg"
import Button from '../CustomComponent/Button';
import { SlLocationPin } from 'react-icons/sl';
import Modal from '../CustomComponent/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { TbCurrentLocation } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const ProfileHeader = ({providerData,userId,updateOpen,role}) => {
    const [placesModal,setPlacesModal] = useState(false)
    const navigate = useNavigate();


  return (
    <div  className="bg-white w-full mb-2 cursor-pointer shadow-md rounded-lg text-gray-900 p-3">
            <div className="rounded-t-lg h-48 overflow-hidden">
                <img className="object-cover w-full" src={providerData.coverPic ? providerData.coverPic : coverPic } alt='Mountain'/>
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img className="object-cover object-center h-32" src={providerData.profilePic ? providerData.profilePic : avatar } alt='loading..'/>
            </div>
            <div className="flex-row items-center text-center mt-2">
                <h2 className="font-semibold mb-4 uppercase text-2xl">{providerData.name}</h2>
                <p className="text-center text-gray-500 px-12 ">&quot;{providerData.description?providerData.description:''}&quot;</p>
                <p className="text-center text-gray-700 text-[1.05rem] font-mono  my-2">+91 {providerData.phone}</p>
                <p className="text-center text-gray-700 text-[1.05rem] font-normal mt-2">{providerData.email}</p>
                <p className="text-gray-700 text-[1.05rem] font-normal mt-2 flex justify-center items-center gap-1"><TbCurrentLocation className='text-blue-500'/>{providerData?.location}</p>
                <p className="text-center text-gray-700 text-[1.05rem] font-normal my-4"><span>
                    <Button className={"text-gray-900 bg-white hover:bg-gray-100 border cursor-pointer  border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"} type={'button'}
                        handelEvent={()=>{setPlacesModal(true)}} content={<p className='flex items-center'><SlLocationPin className='mr-'/>&nbsp;&nbsp;
                            Locations </p>} /></span></p> 
            </div>

            <div className="p-4 mt-1 flex items-center justify-center gap-4">
                {role == 'provider' ? 
                    <Button className={" block  rounded-md cursor-pointer hover:bg-gray-700 bg-gray-600 text-sm hover:shadow-lg font-semibold text-slate-100 hover:text-white px-6 py-2"} type={'button'} handelEvent={updateOpen} content={'Update Profile'} />
                :role == 'user' ?<>
                <Button className={"rounded-sm cursor-pointer hover:bg-gray-700 bg-gray-600 text-sm font-semibold text-slate-100 hover:text-white px-6 py-2"} type={'button'} handelEvent={updateOpen} content={'Message'} />
                <Button className={"rounded-sm cursor-pointer hover:bg-gray-800 bg-gray-900 text-sm font-semibold text-slate-100 hover:text-white px-6 py-2"} type={'button'}
                 handelEvent={userId?()=>navigate(`/providers/checkout?id=${providerData._id}`,{state:{services:providerData.services,id:providerData._id,places:providerData.places}}):
                 ()=>{navigate('/login');toast.warn('You need to login first') }} content={'Book Now'} />
                </>:''
                }
            </div>
            {placesModal&&<Modal closeModal={()=>setPlacesModal(false)}
                modalHeader={
                    <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Available
                        </h3>
                        <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" content={<AiOutlineClose/>
                    } handelEvent={()=>setPlacesModal(false)}/>
                    </div>}
                modalBody={
                    <div className="p-5">
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Servies Available At :</p>
                        <ul className="my-4 space-y-3">
                        {providerData.places && providerData.places.map((val,i) => 
                            <li key={i+1931} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                                <TbCurrentLocation/>
                                <span className="flex-1 ml-3 whitespace-nowrap">{val}</span>
                                {/* <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded ">Popular</span> */}
                            </li>
                         )}

                        </ul>
                    </div>}
                modalFooter={
                    <div className="flex justify-center items-center p-4  border-t border-gray-200 rounded-b">
                        <Button  handelEvent={()=>setPlacesModal(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 " content={'Close'}/>
                    </div>
                }
            />}

        </div>
  )
}

ProfileHeader.propTypes = {
    role: PropTypes.any, // Define the expected type and mark it as required
    updateOpen:PropTypes.func,
    providerData:PropTypes.object,
    userId:PropTypes.any
};
export default ProfileHeader