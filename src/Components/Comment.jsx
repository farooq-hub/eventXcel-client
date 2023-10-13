import {  useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from 'prop-types';
import  avatar  from "../assets/very_big_Luffy.jpg"
import { providerDelete, providerPatch } from '../Services/providerApi';
import { usersDelete, usersPatch } from '../Services/userApi';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const Comment = ({comment,userId,role,isBanned}) => {

    const [commentData,setCommentData] = useState(comment)
    const [removeComment,setRemoveComment] = useState(false)
    const navigate = useNavigate();

    const likeComment =async ()=>{
        if(userId){
        if(!isBanned&&role=='user' || role ==='provider'){
            let respons;
            if(role == 'provider') respons = await providerPatch(`/comment?commentId=${commentData._id}`,{like:true})
            else respons = await usersPatch(`/comment?commentId=${commentData._id}`,{like:true})
            console.log(respons);
            if(respons.like){
                setCommentData((prev) => ({
                    ...prev,
                    likes: [...prev.likes,userId], 
                }));
            }
        }    
    }else{
            toast.warn('Login first')
            navigate('/login')
        
    }}

    const unlikeComment = async () => {
        if(!isBanned&&role=='user' || role ==='provider'){
            console.log(userId);
            let respons;
            if(role == 'provider') respons = await providerPatch(`/comment?commentId=${commentData._id}`,{like:false})
            else respons = await usersPatch(`/comment?commentId=${commentData._id}`,{like:false})
            if(respons.unlike){
                setCommentData((prev) => ({
                    ...prev, // Copy the previous state
                    likes: prev.likes.filter((likeId) => likeId !== userId), // Remove the specified ID
                }))
            }
        }
    }
    
    const deleteComment =async () =>{
        if(!isBanned&&role!=='admin'){
            let respons;
            if(role == 'provider') respons = await providerDelete(`/comment?commentId=${commentData._id}`)
            else respons = await usersDelete(`/comment?commentId=${commentData._id}`)
            if(respons.delete){
                setRemoveComment(true)
            }
        }
    }

    return (
        <>{!removeComment? 
            <div className="grid grid-cols-6 h-auto ">
                <div className="h-10 overflow-hidden p-[.2rem] bg-gray-200 w-10 ml-2 md:mx-2 my-2 rounded-full col-span-1">
                    <img className="rounded-full object-cover h-8" src={commentData.provider.length !== 0 && commentData.provider[0].profilePic? commentData.provider[0].profilePic : commentData.user.length != 0 ? commentData.user[0].image : avatar} alt="" />
                </div>
                <div className="col-span-5 ml-2 mr-2 my-3 md:mr-2 ">
                    <div className="">                    
                        <div className="flex items-center">
                            <p className="text-sm pr-1 break-all whitespace-normal" ><span className="mr-2 text-slate-900 font-semibold">{commentData.user.length !=0 ?commentData.user[0].name:commentData.provider[0].name}.</span>{commentData.content}</p>
                            <div className="text-xs ms-auto my-auto cursor-pointer mx-2 transform transition-colors duration-200 text-slate-900">
                                {   userId&&
                                    commentData.likes.includes(userId) ?
                                    <AiFillHeart className="text-red-600"  onClick={unlikeComment}/>
                                    :<AiOutlineHeart className="text-gray-900" onClick={likeComment}/>
                                }
                            </div>
                        </div>
                        <div className="flex items-center mt-1 hover:text-red-700 text-white">
                            <p className="text-xs text-gray-500">{new Date(commentData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                            <p className="text-xs text-gray-500 ml-4">{commentData.likes.length} like</p>
                            {   userId&&
                                commentData.userId == userId ?
                                    <div className="text-xs cursor-pointer ml-4 transform transition-colors duration-200 ">
                                        <RiDeleteBin6Line onClick={deleteComment}/>
                                    </div>:""
                            }
                        </div>
                    </div>

                </div>
            </div>:''}
        </>
  )
}

Comment.propTypes = {
    comment:PropTypes.object,
    userId:PropTypes.string,
    role:PropTypes.string,
    isBanned:PropTypes.bool,

};

export default Comment