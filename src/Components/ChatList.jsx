import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { providerGet } from '../Services/providerApi';
import { usersGet } from '../Services/userApi';
import Button from './CustomComponent/Button';
import { AiFillMessage, AiOutlineClose, AiOutlineMessage } from 'react-icons/ai';
import Modal from './CustomComponent/Modal';
import avatar from '../assets/very_big_Luffy.jpg';





const ChatList = ({role,userData,selectedChat,setSelectedChat,chatList,setChatList}) => {

    const [receiverList,setReceiverList] = useState([])
    const [loading,setLoading] = useState('')
    const [noMore,setNoMore] = useState(true)
    const [modal,setModal] = useState('')

    const navigate = useNavigate()



    const getChatList =async () =>{
        setLoading('getingChatList')
        const result = role == 'user' ?await usersGet(`/chat?role=${role}`):role == 'provider' ?await providerGet(`/chat?role=${role}`):navigate(-1)
        if(result.chatList){
            console.log(result);
            setChatList(result.chatList)
            setLoading('')
        }
    } 

    const getReceiverList =async () =>{
        setModal('receiverList')
        if(!receiverList?.length){
            setLoading('getingReceiverLists')
            const result = role == 'user' ?await usersGet(`/chat/receiver?role=${'provider'}&skip=${receiverList?.length}`):role == 'provider' ?
            await providerGet(`/chat/receiver?role=${role}&skip=${receiverList?.length}`):''
            console.log(result,receiverList);
            if(result?.noMore||result?.receiverList?.length%10!=0) setNoMore(false)
            if(result.receiverList&&!result.noMore){
                setReceiverList((prev)=>[...prev,...result.receiverList])
                setLoading('')
            }
        }
    } 


    useEffect(()=>{
        getChatList()
    },[])

  return (
        <div className="relative h-full  bg-white shadow-lg rounded-lg">
            <div className="pt-6 pb-4 px-5 border-b border-gray-200">
                <div className="flex justify-start w-full items-center mb-3">
                    <div className="">
                            <h2 className="text-2xl capitalize leading-snug font-semibold">{userData.name?userData.name:'My name'}</h2>
                    </div>
                    <div className="ms-auto">
                        <button className="text-gray-400 hover:text-gray-500 rounded-full focus:ring-0 outline-none focus:outline-none">
                            <span className="sr-only">Settings</span>
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                <path d="m15.621 7.015-1.8-.451A5.992 5.992 0 0 0 13.13 4.9l.956-1.593a.5.5 0 0 0-.075-.611l-.711-.707a.5.5 0 0 0-.611-.075L11.1 2.87a5.99 5.99 0 0 0-1.664-.69L8.985.379A.5.5 0 0 0 8.5 0h-1a.5.5 0 0 0-.485.379l-.451 1.8A5.992 5.992 0 0 0 4.9 2.87l-1.593-.956a.5.5 0 0 0-.611.075l-.707.711a.5.5 0 0 0-.075.611L2.87 4.9a5.99 5.99 0 0 0-.69 1.664l-1.8.451A.5.5 0 0 0 0 7.5v1a.5.5 0 0 0 .379.485l1.8.451c.145.586.378 1.147.691 1.664l-.956 1.593a.5.5 0 0 0 .075.611l.707.707a.5.5 0 0 0 .611.075L4.9 13.13a5.99 5.99 0 0 0 1.664.69l.451 1.8A.5.5 0 0 0 7.5 16h1a.5.5 0 0 0 .485-.379l.451-1.8a5.99 5.99 0 0 0 1.664-.69l1.593.956a.5.5 0 0 0 .611-.075l.707-.707a.5.5 0 0 0 .075-.611L13.13 11.1a5.99 5.99 0 0 0 .69-1.664l1.8-.451A.5.5 0 0 0 16 8.5v-1a.5.5 0 0 0-.379-.485ZM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 text-sm italic">Entract with providers....</p>
            </div>
            <div className="py-3 px-5">
                <div className="">
                    {loading !=='getingChatList'? 
                        (chatList.length ? chatList.map((val)=>
                        <Button  key={val+100000} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50" 
                        content={
                            <div className="flex items-center">
                                <img className="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg" width="32" height="32" alt="Marie Zulfikar" />
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">Marie Zulfikar</h4>
                                    <div className="text-[13px]">The video chat ended · 2hrs</div>
                                </div>
                            </div>}
                        />
                        ):<div className="w-full h-16"><p className="text-red-600 text-center text-sm italic my-2">No chats yet start a chat</p>
                            <div className="flex flex-col items-center my-4 space-y-2">
                                <p className="text-gray-600 text-center text-sm italic">{role == 'user' ?'Send messages to a provider' :'Send messages to a provider'}</p>
                                <Button className={'py-2 bg-gray-400 hover:bg-gray-700 duration-300 px-2 rounded-md text-white'} handelEvent={getReceiverList}
                                content={<p className='flex items-center'><span className='mr-2'><AiOutlineMessage/></span>Chat with</p>}/>
                            </div>
                        </div>)
                        :[1,2,3,4,5].map((val) => <div key={val+1999} className="w-full p-4 border-b flex justify-start items-center ">
                            <div className="bg-gray-200 animate-pulse rounded-full w-12 h-10"/><div className="flex mx-2 flex-col space-y-1 w-full">
                                <div className="bg-gray-200 animate-pulse w-3/4 rounded-md h-5"/><div className="h-3 w-2/4 bg-gray-200 animate-pulse"></div></div>
                        </div>)
                        
                    }
                </div>
            </div>
            { modal == 'receiverList'? <Modal closeModal={()=>setModal('')} 
                modalHeader={
                    <div className="flex lg:w-[32rem] p-5 border-b rounded-t">
                        <h3 className="text-xl font-medium text-center text-gray-900 justify-center flex-grow">
                            New message
                        </h3>
                        <Button type="button" className="text-gray-800 text-lg" content={<AiOutlineClose />} handelEvent={()=>setModal('')} />
                    </div>}
                modalBody={
                    <div className="p-5">
                        {/* <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Servies Available At :</p> */}
                        <ul className="my-4 space-y-3">
                        {receiverList.length && receiverList.map((val,i) => 
                            <li key={val._id+i} className="flex items-center p-3 text-base font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow" 
                            onClick={()=>setSelectedChat(val)}>
                                <img className='h-12 p-0.5 bg-slate-400 w-12 rounded-full' src={role=='user'&&val?.image?val?.image:role=='provider'&&val?.profilPic?val?.profilPic:avatar} />
                                <p className="flex-1 ml-3 whitespace-nowrap"><span className='capitalize'>{val.name}</span> <br /><span className='text-xs font-normal italic'>{val?.email}</span></p>
                                <span className="text-lg font-medium text-gray-900 "><AiOutlineMessage/></span>
                            </li>
                         )}

                        </ul>
                    </div>}
                modalFooter={
                    <div className="flex justify-center items-center p-4  border-t border-gray-200 rounded-b">
                        <Button  handelEvent={()=>setModal('')} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 " content={'Close'}/>
                    </div>
                }
            /> : ''
            }
            <button className="absolute bottom-5 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
                <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                    <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
                </svg>
                <span>New Chat</span>
            </button>
        </div>      
  )
}

ChatList.propTypes = {
    role:PropTypes.string,
    userData:PropTypes.object,
    selectedChat:PropTypes.object,
    setSelectedChat:PropTypes.func,
    chatList:PropTypes.object,
    setChatList:PropTypes.func
};

export default ChatList