import { useEffect, useState } from "react";
import  avatar  from "../assets/very_big_Luffy.jpg"
import PropTypes from 'prop-types'; 
import { IoMdClose } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart, AiOutlineSend,AiOutlineWarning } from "react-icons/ai";
import { FiBookmark, FiSend } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { TbMessageCircle2 } from "react-icons/tb";
import ImageSlider from "./ImageSlider";
import { providerGet, providerPatch, providerPost } from "../Services/providerApi";
import Spinner from "./Spinner";
import Comment from "./Comment";
import { adminGet } from "../Services/adminApi";
import { usersGet, usersPatch, usersPost } from "../Services/userApi";
import Button from "./CustomComponent/Button";
import Modal from "./CustomComponent/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const SinglePost = ({post,setPostsData,setSelectedPost,setIOpenPost,user,role})=> {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [postData, setPostData] = useState(post);
    const [commentsList, setCommentsList] = useState([]);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [waiting, setWaiting] = useState(false);
    const [modal,setModal] = useState('')
    const navigate = useNavigate();

    const getComments =async () => {
        try {
            const respons =  role === 'admin'? await adminGet(`/comment?postId=${post._id}`):role === 'provider'?await providerGet(`/comment?postId=${post._id}`):await usersGet(`/comment?postId=${post._id}`)
            respons ? setCommentsList(respons.comments) : ''
            setLoading(false)
            console.log(respons);
        } catch (error) {
            console.log(error);
        }
    }

    const postCommentProvider =async () => {
            setWaiting(true)
            await providerPost(`/comment?postId=${postData._id}`,{comment})
            .then((res)=>{
                setComment('')
                console.log(res);
                let newComment = res.newComment
                if(newComment && role == 'provider'){
                    newComment.provider =  []
                    newComment.provider[0] =  user
                    newComment.user = []
                }else{
                    newComment.user = []
                    newComment.user[0] =  user
                    newComment.provider = []
                }  
                newComment ? setCommentsList((prev)=>[...prev,newComment]):''
                setWaiting(false)
    
            }).catch((err)=>console.log(err))
            console.log(comment);
        

    }

    const postCommentUser =async () => {
        if(user){
            setWaiting(true)
            await usersPost(`/comment?postId=${postData._id}`,{comment})
            .then((res)=>{
                setComment('')
                console.log(res);
                let newComment = res.newComment
                if(newComment && role == 'provider'){
                    newComment.provider =  []
                    newComment.provider[0] =  user
                    newComment.user = []
                }else{
                    newComment.user = []
                    newComment.user[0] =  user
                    newComment.provider = []
                }  
                newComment ? setCommentsList((prev)=>[...prev,newComment]):''
                setWaiting(false)
    
            }).catch((err)=>console.log(err))
            console.log(comment);
        }else{
            toast.warn('Login first')
            navigate('/login')
        
        }

    }

    const postReportUser =async () => {
        if(user){
        if(!postData.reports.includes(user._id)){
            setPostData((prev) => ({
                ...prev,
                reports: [...prev.likes,user._id], 
            }));
            setModal('')
            await usersPatch(`/post/report?postId=${postData._id}`).then((res)=>{
                console.log(res);
                res && res.report == false ?setPostData((prev) => ({
                    ...prev,
                    reports: prev.reports.filter((reports) => reports !== user._id),
                })) : ''
            }).catch((err)=>{
                console.log(err);
            })
        }
    }else{
        toast.warn('Login first')
        navigate('/login')
    
    }
    }
    
    const likePostProvider =async () => {

        if(!postData.likes.includes(user._id)){
            setPostData((prev) => ({
                ...prev,
                likes: [...prev.likes,user._id], 
            }));
            await providerPatch(`/post/like?postId=${postData._id}&toggle=true`).then((res)=>{
                console.log(res);
                res && res.like == false ?setPostData((prev) => ({
                    ...prev,
                    likes: prev.likes.filter((likeId) => likeId !== user._id),
                })) : ''
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            setPostData((prev) => ({
                ...prev, 
                likes: prev.likes.filter((likeId) => likeId !== user._id), 
            }));
            await providerPatch(`/post/like?id=${user._id}&postId=${postData._id}&toggle=false`).then((res)=>{
                res && res.unlike == false ?setPostData((prev) => ({
                    ...prev, 
                    likes: [...prev.likes,user._id], 
                })) : ''
            }).catch((err)=>{
                console.log(err);
            })
        }
        
    }

    const likePostUser =async () => {
        if(user){
        if(!postData.likes.includes(user._id)){
            setPostData((prev) => ({
                ...prev,
                likes: [...prev.likes,user._id], 
            }));
            await usersPatch(`/post?postId=${postData._id}&toggle=true`).then((res)=>{
                console.log(res);
                res && res.like == false ?setPostData((prev) => ({
                    ...prev,
                    likes: prev.likes.filter((likeId) => likeId !== user._id),
                })) : ''
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            setPostData((prev) => ({
                ...prev, 
                likes: prev.likes.filter((likeId) => likeId !== user._id), 
            }));
            await usersPatch(`/post?postId=${postData._id}&toggle=false`).then((res)=>{
                res && res.unlike == false ?setPostData((prev) => ({
                    ...prev, 
                    likes: [...prev.likes,user._id], 
                })) : ''
            }).catch((err)=>{
                console.log(err);
            })
        }
    }else{
            toast.warn('Login first')
            navigate('/login')
        
        }
        
    }

    const closeModal = ()=>{
        setSelectedPost ? setSelectedPost({}):'';
        setIOpenPost(false);
        setPostsData ? 
            setPostsData((prev) =>
                prev.map((data) => {
                    data._id === postData._id?console.log(data._id === postData._id,postData,data):''
                    if (data._id === postData._id){
                        return postData;
                    }    
                    else return data
                })):''
    }


    useEffect(()=>{
        getComments()
    },[])

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 max-h-screen">
            <div className="modal-overlay fixed inset-0 bg-black opacity-50" onClick={closeModal}> 
                <div className="flex justify-end">
                    <button className="lg:mt-4 lg:mr-4 text-4xl text-white opacity-100 " onClick={closeModal}><IoMdClose/></button>
                </div>
            </div>

            <div className="modal-container bg-white  lg:mx-auto  rounded-lg shadow-lg z-50 mx-10 lg:my-0 mt-5 mb-4  md:mx-16 max-h-screen overflow-y-scroll lg:overflow-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-h-550px] xl:max-h-[850px] w-full h-full  overflow-hidden lg:w-[900px]  xl:w-[1200px]">
                    <div className="lg:hidden items-center px-4 py-3 flex">
                        <img className="h-8 w-8 object-cover rounded-full" src={postData.providerId.profilePic ? postData.providerId.profilePic : avatar}/>
                        <div className="ml-3 ">
                            <span className="text-sm font-semibold antialiased block leading-tight">{postData.providerId.name}</span>
                            <span className="text-gray-600 text-xs block">{postData.providerId.location ? postData.providerId.location : 'Kerala'}</span>
                        </div>
                        {role =='user'&&user? 
                            <button className="ms-auto " onClick={()=>setModal('report')}><BsThreeDots/></button>
                        :''}
                    </div>
                    <div className="col-span-1 flex items-center bg-black">
                        <ImageSlider images={postData.postImages} height={'max-h-full'} manageIndex={setCurrentImageIndex} currentIndex={currentImageIndex} object={'object-contain'}/>
                    </div>
                    <div className="col-span-1 h-full flex flex-col">
                        <div className="lg:flex items-center px-4 py-3 hidden ">
                            <img className="h-8 w-8 object-cover rounded-full" src={postData.providerId.profilePic ?postData.providerId.profilePic : avatar}/>
                            <div className="ml-3 ">
                                <span className="text-sm font-semibold antialiased block leading-tight">{postData.providerId.name}</span>
                                <span className="text-gray-600 text-xs block">{postData.providerId.location ? postData.providerId.location : 'Kerala'}</span>
                            </div>
                            {role =='user'? 
                            <button className="ms-auto " onClick={()=>setModal('report')}><BsThreeDots/></button>
                        :''}
                        </div><hr/>

                        <div className=" max-h-64 lg:max-h-[20rem] overflow-y-scroll">
                            <div className=''>
                                <div className="grid grid-cols-6 h-auto ">
                                    <div className="h-10 t overflow-hidden p-[.2rem] bg-gray-200 w-10 mx-2 my-2 rounded-full col-span-1">
                                        <img className="rounded-full object-cover h-8" src={postData.providerId.profilePic ? postData.providerId.profilePic : avatar} alt="" />
                                    </div>
                                    <div className="col-span-5 mr-2 my-3 ">
                                        <div className="">                    
                                            <div className="flex items-center">
                                                <p className="text-sm"><span className="mr-2 text-slate-900 font-semibold">{postData.providerId.name}.</span>{postData.caption}</p>
                                            </div>
                                        </div>               
                                    </div>
                                </div>
                                {postData.tagline ?
                                    <div className="grid grid-cols-6 h-auto">
                                        <div className="h-10 t overflow-hidden p-[.2rem] bg-gray-200 w-10 mx-2 my-1 rounded-full col-span-1">
                                            <img className="rounded-full object-fill h-8" src={postData.providerId.profilePic ? postData.providerId.profilePic : avatar} alt="" />
                                        </div>
                                        <div className="col-span-5 mr-2 my-3 ">
                                            <div className="">                    
                                                <div className="flex items-center">
                                                    <p className="text-sm text-blue-600"><span className="mr-2 text-slate-900 font-semibold">{postData.providerId.name}.</span>{postData.tagline}</p>
                                                </div>
                                            </div>               
                                        </div> 
                                    </div>
                                :''}
                                <hr />
                                {
                                   loading ? <Spinner className={'my-4 h-12 w-12'}/> :
                                   commentsList.length == 0 ? 
                                    <div className="text-center my-6">
                                        <p className="text-gray-500">No comments ...</p>
                                    </div>
                                   :commentsList.map((comment)=><Comment key={comment._id} comment={comment} userId={user?user._id:''} role={role} isBanned={postData.isBanned} setCommentsList={setCommentsList}/>)
                                }
                            </div>
                        </div>
                        <div className=" w-full my-auto bg-white">
                            <div className="flex mx-2 my-3">
                            <div className="group flex cursor-pointer relative">
                                {role!='admin'&&user&&
                                    postData.likes.includes(user._id) ? 
                                        <><AiFillHeart className="text-red-600 text-3xl mx-2 " onClick={role != 'admin'&& role == 'provider' ? likePostProvider:role =='user' ? likePostUser:''} />
                                        <span className="group-hover:opacity-100 transition-opacity bg-gray-100 px-1  text-sm text-gray-900  absolute left-1/2 
                                        -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Unlike</span></>
                                        :<> <AiOutlineHeart className="text-black text-3xl mx-2 "  onClick={role != 'admin'&& role == 'provider' ? likePostProvider:role =='user' ? likePostUser:''}/> 
                                        <span className="group-hover:opacity-100 transition-opacity bg-gray-100 px-1  text-sm text-gray-900  absolute left-1/2 
                                        -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Like</span></>
                                }
                            </div>
                            <div className="group flex cursor-pointer relative">
                                <TbMessageCircle2 className="text-black  text-3xl  mx-2 " />
                                <span className="group-hover:opacity-100 transition-opacity bg-gray-100 px-1  text-sm text-gray-900  absolute left-1/2 
                                -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Comment</span>
                            </div>                
                            <div className="group flex cursor-pointer relative">
                                <FiSend className="text-black text-3xl mx-2 " />
                                <span className="group-hover:opacity-100 transition-opacity bg-gray-100 px-1  text-sm text-gray-900  absolute left-1/2 
                                -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Share </span>
                            </div>
                            <div className="group flex cursor-pointer relative ms-auto">
                                <FiBookmark className="text-black text-3xl mx-3 " />
                                <span className="group-hover:opacity-100 transition-opacity bg-gray-100 px-1  text-sm text-gray-900  absolute left-1/2 
                                -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Save</span>
                            </div>

                            </div>
                            <div className="mx-2" >
                                <p className="text-black text-[1.03rem] mx-2 leading-4">{postData.likes.length} likes</p>
                                <p className="text-gray-500 text-[.8rem] mx-2 ">{new Date(postData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                            </div>                
                            <div className="mx-4 mt-2 mb-1 flex items-center ">
                                <div className="w-full pr-3">
                                    <textarea className="w-full resize-none outline-none appearance-none max-h-[76px] " name="comment"  placeholder="Add a comment..." value={comment} onChange={(e)=>setComment(e.target.value.trim())} autoComplete="off" autoCorrect="off" />
                                </div>
                                {
                                    comment.trim() && role!='admin' ?
                                        <div className="ml-auto flex items-center">
                                            {
                                                waiting ? <Spinner className={'h-6 w-6'} /> : user?
                                                <Button className="focus:outline-none border-none bg-transparent text-blue-600" handelEvent={role === 'user' ? postCommentUser:role==='provider' ?postCommentProvider:''}
                                                content={<AiOutlineSend className="text-lg"/>}/>:''
                                            }
                                        </div>
                                    :''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {modal ==='report' || modal ==='confirm'?<Modal modalBody={
                    <div className="">
                        <ul className="">
                            <li className="flex items-center p-3 text-base font-bold text-gray-900 focus:bg-gray-400 hover:text-black transition duration-300 rounded-lg bg-gray-50 hover:bg-gray-200 group hover:shadow">
                                <Button content={!postData.reports.includes(user._id)?'Report':"Reported"} handelEvent={!postData.reports.includes(user._id)?()=>setModal('confirm'):''} className={'text-red-600 flex-1 ml-3 whitespace-nowrap'} />
                            </li>
                            <li className="flex items-center p-3 text-base font-bold text-gray-900 hover:text-black transition duration-300 rounded-lg bg-gray-50 hover:bg-gray-200 group hover:shadow">
                                <Button content={'Close'} className={'text-center flex-1 ml-3 whitespace-nowrap'} handelEvent={()=>setModal('')}/>
                            </li>
                        </ul>
                    </div>
                }/>:''}
             { modal ==='confirm'?<Modal modalHeader={
                <div className="flex items-center justify-center ">
                    <Button content={<AiOutlineWarning className="text-3xl text-gray-500 m-4"/>}/>
                </div>
             }
             modalBody={
                <div ><p className="text-xl font-bold text-center my-2">Are you sure !!!</p></div>
             }
             modalFooter={
                <div className="flex items-center justify-center gap-4 my-4">
                    <Button  type="button" className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    content={"Yes, I'm sure"}
                    handelEvent={role === 'user'?postReportUser:""}/>
                    <Button type="button" className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
                    content={'No, cancel'} handelEvent={()=>setModal('report')}/>
                </div>}
             />:''}
            </div>
            </div>
        </>
    );

}
SinglePost.propTypes = {
    post: PropTypes.object,
    setIOpenPost: PropTypes.func, 
    setSelectedPost: PropTypes.func, 
    user: PropTypes.object,
    setPostsData : PropTypes.func,
    role : PropTypes.string
};



export default SinglePost