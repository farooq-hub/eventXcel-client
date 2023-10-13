import  avatar  from "../assets/very_big_Luffy.jpg"
import  back  from "../assets/pexels-wendy-wei-1387174.jpg"
import PropTypes from 'prop-types';
import { useState } from "react";
import ImageSlider from "./ImageSlider";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import { usersPatch, usersPost } from "../Services/userApi";
import { providerPatch, providerPost } from "../Services/providerApi";
import Spinner from "./Spinner";
import Button from "./CustomComponent/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


    
const OnePost = ({post,handleEvent,user,role}) => {
    const [postData, setPostData] = useState(post);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [comment, setComment] = useState('');
    const [postedComment, setPostedComment] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();

    
    
    const postCommentUser =async () => {

    if(user._id){
        setLoading('comment')
        await usersPost(`/comment?postId=${postData._id}`,{comment})
        .then((res)=>{
            setComment('')
            console.log(res);
            res.newComment && !postedComment ? setPostedComment(res.newComment.content):''
            setLoading('')
        }).catch((err)=>console.log(err))
    }else{
        toast.warn('Login first')
        navigate('/login')
    }
        console.log(comment);
    }

    const postCommentProvider =async () => {

        setLoading('comment')
        await providerPost(`/comment?postId=${postData._id}`,{comment})
        .then((res)=>{
            setComment('')
            console.log(res);
            res.newComment && !postedComment ? setPostedComment(res.newComment.content):''
            setLoading('')

        }).catch((err)=>console.log(err))
        console.log(comment);

    }

    const likePostUser =async () => {
        console.log(user,'||||||||||||||||',role);
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
    const likePostProvider =async () => {
        console.log(user);
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
            await providerPatch(`/post/like?postId=${postData._id}&toggle=false`).then((res)=>{
                res && res.unlike == false ?setPostData((prev) => ({
                    ...prev, 
                    likes: [...prev.likes,user._id], 
                })) : ''
            }).catch((err)=>{
                console.log(err);
            })
        }
        
    }


    return (
            <div className="bg-white pt-4 w-full">
                <div className="mx-auto border-b-2 max-w-xl rounded-md">
                    <div className="bg-white  rounded-md">
                        <div className="flex items-center px-4 py-3">
                        <img className="h-8 w-8 rounded-full" src={postData.providerId.profilePic?postData.providerId.profilePic:avatar}/>
                        <div className="ml-3 ">
                            <span className="text-sm font-semibold antialiased block leading-tight">{postData.providerId.name}</span>
                            <span className="text-gray-600 text-xs block">{postData.providerId.location}</span>
                        </div>
                        </div>
                        <ImageSlider images={postData.postImages} height={'rounded-md'} manageIndex={setCurrentImageIndex} currentIndex={currentImageIndex} />
                        {/* <img src={back} className="rounded-md"/> */}
                        <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                        <div className="flex items-center gap-5 cursor-pointer">
                            {
                                user&&postData.likes.includes(user._id) ? 
                                    <AiFillHeart className="text-red-600  text-3xl" onClick={role === 'user' ? likePostUser:role==='provider' ?likePostProvider:''}/>
                                    :<AiOutlineHeart className="text-black text-3xl" onClick={role === 'user' ? likePostUser:role=='provider' ?likePostProvider:''}/>
                            }
                            <AiOutlineMessage className="text-black text-3xl" onClick={handleEvent}/>
                            {/* <svg   fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg> */}
                            <svg   fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                        </div>
                        <div className="flex">
                            <svg  fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                        </div>
                        </div>
                        <div className=" font-semibold text-md mx-5 mt-2 mb-1">{postData.likes.length} likes</div>
                        <div className=" mx-5 mb-2"><p className="font-semibold text-md">{postData.providerId.name}.<span className="ml-2 font-normal">{postData.caption}</span></p></div>
                        <div className=" text-md mx-5 text-gray-600 mb-1 hover:underline" onClick={handleEvent}>View all  comments</div>
                        {postedComment?
                            <div className=" mx-5 mb-2"><p className="font-semibold text-md">{user.name}.<span className="ml-2 font-normal">{postedComment}</span></p></div>
                        :""}
                        <div className="mb-1 mx-5 flex items-center">
                                <div className="w-full">
                                    <textarea className="w-full resize-none outline-none appearance-none max-h-[76px]" name="comment"  placeholder="Add a comment..." value={comment} onChange={(e)=>setComment(e.target.value.trim())} autoComplete="off" autoCorrect="off" />
                                </div>
                                {
                                    comment.trim()  ?
                                        <div className="ml-auto flex items-center">
                                            {
                                                loading ? <Spinner className={'h-6 w-6'} /> :
                                                <Button className="focus:outline-none border-none bg-transparent text-blue-600" handelEvent={role === 'user' ? postCommentUser:role==='provider' ?postCommentProvider:''}
                                                content={<AiOutlineSend className="text-lg"/>}/>
                                            }
                                        </div>
                                    :''
                                }
                            </div>
                    </div>
                </div>
            </div>
    )
}

OnePost.propTypes = {
    post: PropTypes.object,
    handleEvent: PropTypes.func,
    user: PropTypes.any,
    role: PropTypes.string
}

export default OnePost